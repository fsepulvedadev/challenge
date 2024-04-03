// biome-ignore format: "jsx"
import {
	DocumentPlusIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFormik } from "formik";
import Datepicker from "react-tailwindcss-datepicker";
import CustomSelect from "./CustomSelect";

const AddPayment = () => {
	const [paymentDate, setPaymentDate] = useState({
		startDate: null,
		endDate: null,
	});
	const [paymentDateError, setPaymentDateError] = useState("");
	const [successMsg, setSuccessMsg] = useState(null);
	const paymentOptions = [
		{ value: "cash", label: "Cash" },
		{ value: "credit card", label: "Credit Card" },
		{ value: "debit card", label: "Debit Card" },
	];

	const formik = useFormik({
		initialValues: {
			amount: 0,
			paidTo: "",
			paymentOptions: "cash",
		},
		validate: (values) => {
			const errors = {};
			if (!values.amount) {
				errors.amount = "Amount is required";
			} else if (values.amount <= 0) {
				errors.amount = "Amount must be greater than 0";
			}
			if (!values.paidTo) {
				errors.paidTo = "Paid to is required";
			}1
			if (!values.paymentOptions) {
				errors.paymentOptions = "Payment type is required";
			}

			return errors;
		},
		onSubmit: (values) => {
			if (!paymentDate.startDate) {
				setPaymentDateError("Payment date is required");
				return;
			}

			setPaymentDateError("");

			const payment = {
				amount: values.amount,
				paidTo: values.paidTo,
				paymentType: values.paymentOptions,
				date: paymentDate.startDate,
			};

			fetch("http://localhost:3000/api/payment/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
				},
				body: JSON.stringify(payment),
			})
				.then((res) => res.json())
				.then(() => {
					setSuccessMsg("Payment added successfully");
					setTimeout(() => {
						setSuccessMsg(null);
					}, 3000);
				})
				.catch((err) => {
					console.log(err);
				});

			formik.resetForm();

			setPaymentDate({
				startDate: null,
				endDate: null,
			});
		},
	});

	return (
		<div className="flex items-start justify-center w-full">
			<form
				onSubmit={formik.handleSubmit}
				className="w-6/12 p-6 mx-auto mt-20 bg-white border-2 border-green-600 shadow-2xl rounded-xl shadow-white/40"
			>
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="flex flex-col">
						<label htmlFor="text" className="mb-2 font-semibold">
							Amount
						</label>
						<div className="relative">
							<CurrencyDollarIcon className="absolute w-5 h-5 left-2 top-2 text-slate-400" />
							<input
								type="number"
								id="amount"
								name="amount"
								value={formik.values.amount}
								onChange={formik.handleChange}
								className="w-full px-2 py-1 pl-8 border rounded-lg border-slate-200 hover:border-green-500 focus:outline-none focus:ring focus:ring-green-500/40 active:ring active:ring-green-500/40"
							/>
						</div>
						<label htmlFor="amount" className="text-red-500">
							{formik.errors.amount}
						</label>
					</div>
					<div className="flex flex-col">
						<label htmlFor="text2" className="mb-2 font-semibold">
							Paid to
						</label>
						<div className="relative">
							<UserCircleIcon className="absolute w-5 h-5 left-2 top-2 text-slate-400" />
							<input
								type="text"
								id="paidTo"
								name="paidTo"
								value={formik.values.paidTo}
								onChange={formik.handleChange}
								className="w-full px-2 py-1 pl-8 border rounded-lg border-slate-200 hover:border-green-500 focus:outline-none focus:ring focus:ring-green-500/40 active:ring active:ring-green-500/40"
							/>
						</div>
						<label htmlFor="paidTo" className="text-red-500">
							{formik.errors.paidTo}
						</label>
					</div>
				</div>

				<div className="flex flex-col">
					<label htmlFor="type" className="mb-2 font-semibold">
						Payment type
					</label>

					<CustomSelect
						options={paymentOptions}
						value={formik.values.paymentOptions}
						onChange={(value) =>
							formik.setFieldValue("paymentOptions", value.value)
						}
					/>

					{formik.errors.paymentOptions && (
						<label htmlFor="paymentOptions" className="text-red-500">
							{formik.errors.paymentOptions}
						</label>
					)}

					
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="age" className="mb-2 font-semibold">
						Payment date
					</label>

					<Datepicker
						inputClassName={
							"w-full rounded-lg border border-slate-200 px-2 py-1  hover:border-green-500 focus:outline-none focus:ring focus:ring-green-500/40 active:ring active:ring-green-500/40"
						}
						asSingle={true}
						useRange={false}
						value={paymentDate}
						onChange={setPaymentDate}
						primaryColor="green"
						displayFormat="DD/MM/YYYY"
					/>

					<label htmlFor="date" className="text-red-500">
						{paymentDateError}
					</label>
				</div>

				<button
					type="submit"
					className="flex items-center justify-center w-full p-4 mt-10 text-white bg-green-800 rounded-md hover:bg-green-700"
				>
					Add payment
					<DocumentPlusIcon className="w-6 h-6 ml-2" />
				</button>
			</form>

			{successMsg && (
				<div className="absolute flex items-center p-2 text-white bg-green-800 rounded-md bottom-10 right-20 min-w-20 w-fit animate-bounce">
					<CheckCircleIcon className="w-5 h-5 mr-1" />
					{successMsg}
				</div>
			)}
		</div>
	);
};

export default AddPayment;
