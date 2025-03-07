import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth/AuthContext';

const ErrorToast = ({ duration = 5000, onClose }) => {
  const { error, clearError } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  // Handle initial display and reset when error changes
  useEffect(() => {
    if (!error) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setTimeRemaining(duration);
  }, [error, duration]);

  // Handle countdown timer
  useEffect(() => {
    if (!error || !visible || isPaused || timeRemaining <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      if (timeRemaining <= 100) {
        setVisible(false);
        if (onClose) onClose();
        if (clearError) clearError();
      } else {
        setTimeRemaining(prev => Math.max(0, prev - 100));
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [error, visible, isPaused, timeRemaining, onClose, clearError]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
    if (clearError) clearError();
  };

  if (!visible || !error) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 bg-red-600 text-white rounded-lg shadow-lg max-w-md z-50 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
    >
      <div className="flex items-center p-4">
        <div className="mr-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <div className="flex-grow">
          <p className="font-medium">{error}</p>
        </div>
        <button 
          onClick={handleClose}
          className="ml-4 text-white hover:text-gray-200"
          aria-label="Close"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
      <div 
        className="h-1 bg-red-400 transition-all duration-100"
        style={{ width: `${(timeRemaining / duration) * 100}%` }}
      />
    </div>
  );
};

export default ErrorToast;