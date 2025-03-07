import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ExpenseManager from "./components/ExpenseManager";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home";
import { DataContextProvider } from "./contexts/DataContext";

function App() {
  return (
    <DataContextProvider>
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full mx-auto shadow-2xl overflow-hidden border-gray-200 h-full sm:w-2/3 md:w-1/2 bg-base-100 relative scrollbar-hide">
            <Navigation />

            <Routes>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<ExpenseManager />} />
              </Route>

              {/* Redirect root to dashboard or login based on auth status */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </AuthProvider>
    </DataContextProvider>
  );
}

export default App;
