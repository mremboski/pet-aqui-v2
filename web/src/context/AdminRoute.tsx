import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { usuario, loading } = useAuth();

    if (loading) return <p className="text-white p-6">Carregando...</p>;

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (usuario.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
