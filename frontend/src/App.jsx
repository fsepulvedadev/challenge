import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import Register from "./pages/Register";

function App() {
	return (
		<div>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						<Route path="/dashboard">
							<Route path="/dashboard/home" element={<Dashboard />} />
							<Route path="/dashboard/add-payment" element={<Dashboard />} />
							<Route path="/dashboard/view-payments" element={<Dashboard />} />
						</Route>
						<Route path="*" element={<h1>Not Found</h1>} />
						<Route path="/" element={<ProtectedRoutes />} />
					</Routes>
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
