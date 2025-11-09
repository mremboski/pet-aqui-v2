import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { usuario, loading } = useAuth();
    const location = useLocation();

    if (loading) return <p className="text-white p-6">Carregando...</p>;

    if (!usuario) {
        alert("⚠️ É necessário fazer login para acessar esta página!");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
