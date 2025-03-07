import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../../../config/api";
import { setToken } from "../../../config/setToken";

export const AuthContext = createContext();

const TOKEN_KEY = "token";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  });


  const updateAuthState = useCallback((updates) => {
    setAuthState((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleError = useCallback(
    (error) => {
      const errorMessage = error.response?.data?.message || "An error occurred";
      updateAuthState({ error: errorMessage, user: null });
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
    },
    [updateAuthState]
  );

  const getUser = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      updateAuthState({ loading: false });
      return;
    }

    try {
      updateAuthState({ loading: true });
      const { data } = await api.get("/user/profile");

      if (data?.user) {
        updateAuthState({
          user: data.user,
          error: null,
          isAuthenticated: true,
        });
      } else {
        throw new Error("Invalid user data received");
      }
    } catch (error) {
      handleError(error);
    } finally {
      updateAuthState({ loading: false });
    }
  }, [updateAuthState, handleError]);

  const handleAuth = useCallback(
    async (endpoint, credentials) => {
      try {
        updateAuthState({ loading: true, error: null });
        const { data } = await api.post(`/user/${endpoint}`, credentials);

        if (data?.token) {
          localStorage.setItem(TOKEN_KEY, data.token);
          setToken(data.token);
          updateAuthState({
            user: data.user,
            isAuthenticated: true,
          });
          return { success: true, user: data.user };
        }
        throw new Error("No token received");
      } catch (error) {
        handleError(error);
        return { success: false, error: error.message };
      } finally {
        updateAuthState({ loading: false });
      }
    },
    [updateAuthState, handleError]
  );

  const login = useCallback(
    (credentials) => handleAuth("login", credentials),
    [handleAuth]
  );

  const register = useCallback(
    (credentials) => handleAuth("register", credentials),
    [handleAuth]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    updateAuthState({
      user: null,
      error: null,
      isAuthenticated: false,
    });
  }, [updateAuthState]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      setToken(token);
      getUser();
    } else {
      updateAuthState({ loading: false });
    }
  }, [getUser, updateAuthState]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
