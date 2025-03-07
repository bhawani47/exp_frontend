import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import api from "../../config/api";

// Configure axios timeout settings
api.defaults.timeout = 30000; // Increase timeout to 30 seconds

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pendingUpdates, setPendingUpdates] = useState([]);

  // Get token once
  const token = localStorage.getItem("token");
  
  // Memoized function to fetch data with retry logic
  const getData = useCallback(async (retryCount = 0) => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get("/data/get");
      setData(response.status === 404 ? [] : response.data.data);
      return true;
    } catch (error) {
      // Retry logic for network issues
      if (retryCount < 3 && (error.code === 'ECONNABORTED' || error.message.includes('timeout'))) {
        console.log(`Retry attempt ${retryCount + 1} for getData...`);
        return getData(retryCount + 1);
      }
      
      setError("Failed to fetch data: " + (error.message || "Unknown error"));
      console.error("Error fetching data:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Calculate financial totals with useMemo for better performance
  const totalValues = useMemo(() => {
    const income = data.reduce(
      (acc, item) => (item.type === "income" ? acc + item.amount : acc),
      0
    );
    const expense = data.reduce(
      (acc, item) => (item.type === "expense" ? acc + item.amount : acc),
      0
    );
    return { income, expense, balance: income - expense };
  }, [data]);

  // Format date consistently
  const formatDateTime = (date) => {
    if (!date) return new Date().toISOString();
    
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    
    return `${date} ${formattedTime}`;
  };

  // Function to create new data with retry logic
  const createData = useCallback(async (type, transactionData, retryCount = 0) => {
    if (!token) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { amount, date, description } = transactionData;
      
      const newData = {
        amount: Number(amount),
        date: formatDateTime(date),
        type,
        description
      };
      
      // Add to pending updates optimistically
      const tempId = Date.now().toString();
      setPendingUpdates(prev => [...prev, { id: tempId, type: 'create', data: newData }]);
      
      const response = await api.post("/data/create", newData);
      
      // Remove from pending updates
      setPendingUpdates(prev => prev.filter(item => item.id !== tempId));
      
      await getData();
      return true;
    } catch (error) {
      // Retry logic for timeouts
      if (retryCount < 2 && (error.code === 'ECONNABORTED' || error.message.includes('timeout'))) {
        console.log(`Retry attempt ${retryCount + 1} for createData...`);
        return createData(type, transactionData, retryCount + 1);
      }
      
      setError("Failed to create data: " + (error.message || "Unknown error"));
      console.error("Error creating data:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getData, token]);

  // Function to delete an item with retry logic
  const deleteItem = useCallback(async (id, retryCount = 0) => {
    if (!id || !token) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Optimistic update
      setData(prev => prev.filter(item => item._id !== id));
      
      // Track pending delete
      const tempId = Date.now().toString();
      setPendingUpdates(prev => [...prev, { id: tempId, type: 'delete', itemId: id }]);
      
      await api.delete(`/data/delete/${id}`);
      
      // Remove from pending updates
      setPendingUpdates(prev => prev.filter(item => item.id !== tempId));
      
      return true;
    } catch (error) {
      // Retry logic for timeouts
      if (retryCount < 2 && (error.code === 'ECONNABORTED' || error.message.includes('timeout'))) {
        console.log(`Retry attempt ${retryCount + 1} for deleteItem...`);
        return deleteItem(id, retryCount + 1);
      }
      
      // Revert optimistic update on error
      getData();
      
      setError("Failed to delete item: " + (error.message || "Unknown error"));
      console.error("Error deleting item:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getData, token]);

  // Completely revised editData function with timeout handling and optimistic updates
  const editData = useCallback(async (id, updatedData, retryCount = 0) => {
    if (!id || !token) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formattedData = {
        ...updatedData,
        amount: Number(updatedData.amount),
        date: formatDateTime(updatedData.date)
      };
      
      // Apply optimistic update to UI
      setData(prevData => 
        prevData.map(item => 
          item._id === id ? { ...item, ...formattedData } : item
        )
      );
      
      // Track this update as pending
      const tempId = Date.now().toString();
      setPendingUpdates(prev => [...prev, { id: tempId, type: 'edit', itemId: id, data: formattedData }]);
      
      // Attempt the update with increased timeout
      const customApi = { ...api };
      customApi.defaults = { ...api.defaults, timeout: 40000 }; // 40 seconds for this specific request
      
      await customApi.patch(`/data/update/${id}`, formattedData);
      
      // Remove from pending updates
      setPendingUpdates(prev => prev.filter(item => item.id !== tempId));
      
      return true;
    } catch (error) {
      // Implement retry logic for timeouts
      if (retryCount < 2 && (error.code === 'ECONNABORTED' || error.message.includes('timeout'))) {
        console.log(`Retry attempt ${retryCount + 1} for editData...`);
        return editData(id, updatedData, retryCount + 1);
      }
      
      // Revert optimistic update on final error
      getData();
      
      setError("Failed to update data: " + (error.message || "Unknown error"));
      console.error("Error updating data:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getData, token]);

  // Reset error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Process any pending updates that might have failed
  useEffect(() => {
    const processPendingUpdates = async () => {
      if (pendingUpdates.length > 0 && !isLoading) {
        // Process just one pending update at a time
        const update = pendingUpdates[0];
        
        try {
          if (update.type === 'edit') {
            await api.patch(`/data/update/${update.itemId}`, update.data);
          } else if (update.type === 'delete') {
            await api.delete(`/data/delete/${update.itemId}`);
          } else if (update.type === 'create') {
            await api.post("/data/create", update.data);
          }
          
          // Remove processed update
          setPendingUpdates(prev => prev.filter(item => item.id !== update.id));
        } catch (error) {
          console.error("Failed to process pending update:", error);
          // Keep the update in the queue, it will be retried
        }
      }
    };
    
    // Process pending updates when online
    if (navigator.onLine) {
      processPendingUpdates();
    }
    
    // Set up online/offline listeners
    const handleOnline = () => {
      console.log("App is online, processing pending updates...");
      processPendingUpdates();
    };
    
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [pendingUpdates, isLoading]);

  // Fetch data when the component mounts
  useEffect(() => {
    getData();
  }, [getData]);

  const contextValue = useMemo(() => ({
    data,
    isLoading,
    error,
    clearError,
    getData,
    deleteItem,
    totalValues,
    createData,
    editData,
    hasPendingUpdates: pendingUpdates.length > 0,
  }), [
    data, isLoading, error, clearError, 
    getData, deleteItem, totalValues, 
    createData, editData, pendingUpdates.length
  ]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};