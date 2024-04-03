/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Dashboard";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoutes = () => {
	const auth = useAuth();
	console.log(auth);

	return auth.isAuthenticated ? <Dashboard /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
