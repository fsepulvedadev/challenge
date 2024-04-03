import { useEffect, useState } from "react";
import Home from "../components/Home";
import AddPayment from "../components/payments/AddPayment";
import PaymentList from "../components/payments/PaymentList";

import Layout from "../components/layout/Layout";

import { useAuth } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { PaymentProvider } from "../context/PaymentProvider";

const Dashboard = () => {
	const auth = useAuth();
	const location = useLocation();

	const [activeTab, setActiveTab] = useState(
		location.pathname.split("/dashboard")[1],
	);

	useEffect(() => {
		setActiveTab(location.pathname.split("/dashboard")[1]);
	}, [location.pathname]);

	if (!auth.isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return (
		<PaymentProvider>
			<div className="container flex items-center justify-center w-full h-screen">
				<Layout>
					{activeTab === "/home" && <Home />}
					{activeTab === "/add-payment" && <AddPayment />}
					{activeTab === "/view-payments" && <PaymentList />}
				</Layout>
			</div>
		</PaymentProvider>
	);
};

export default Dashboard;
