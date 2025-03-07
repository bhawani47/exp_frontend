import React, { Suspense, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import { useAuth } from "./hooks/useAuth"; // Move this to a separate hook file
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ExpenseManager from "./components/ExpenseManager";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home";
import { DataContextProvider } from "./contexts/DataContext";

// Loading component with better UX
const LoadingScreen = () => (
  <div className="w-full h-screen flex items-center justify-center bg-base-100">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
      <p className="text-lg font-medium">Loading your dashboard...</p>
    </div>
  </div>
);

// App Routes with auth check
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show a loading screen while authentication state is being determined
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full mx-auto shadow-2xl overflow-hidden border-gray-200 h-full sm:w-2/3 md:w-1/2 bg-base-100 relative">
      <Navigation />

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<ExpenseManager />} />
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Redirect root to dashboard if authenticated, otherwise to login */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />

        {/* Catch all route */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Give the browser a moment to initialize everything
    const timer = setTimeout(() => {
      setInitializing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner during initialization
  if (initializing) {
    return <LoadingScreen />;
  }

  return (
    <DataContextProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <AppRoutes />
          </Suspense>
        </Router>
      </AuthProvider>
    </DataContextProvider>
  );
}

export default App;
