/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

export const PaymentContext = createContext({});

export const PaymentProvider = ({ children }) => {
	const [payments, setPayments] = useState([]);

	const handleAddPayment = (payment) => {
		setPayments([...payments, payment]);
	};

	const getPayments = () => {
		fetch("http://localhost:3000/api/payment", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.getItem("access_token"),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setPayments(data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		getPayments();
	}, []);

	return (
		<PaymentContext.Provider value={{ handleAddPayment, payments }}>
			{children}
		</PaymentContext.Provider>
	);
};

export const usePayment = () => useContext(PaymentContext);
