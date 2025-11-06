import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userName } = useAuth();

    if (!userName) {
        alert("⚠️ É necessário fazer login para acessar esta página!");
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
