/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({
	isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useState(() => {
		if (localStorage.getItem("access_token")) {
			setIsAuthenticated(true);
		}
	}, []);

	const handleLogin = (access_token, refresh_token) => {
		localStorage.setItem("access_token", access_token);
		localStorage.setItem("refresh_token", refresh_token);
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setIsAuthenticated(false);
	};

	const getToken = () => {
		return localStorage.getItem("access_token");
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, handleLogin, handleLogout, getToken }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
