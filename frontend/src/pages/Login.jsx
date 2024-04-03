import {
	CurrencyDollarIcon,
	ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { useAuth } from "../context/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
	const auth = useAuth();

	const [errorMessage, setErrorMessage] = useState("");

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate: (values) => {
			const errors = {};

			if (!values.email) {
				errors.email = "Email is required";
			} else if (
				!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(values.email)
			) {
				errors.email = "Invalid email address";
			}

			if (!values.password) {
				errors.password = "Password is required";
			}

			return errors;
		},
		onSubmit: (values) => {
			const userData = {
				email: values.email,
				password: values.password,
			};

			fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.error) {
						setErrorMessage(data.error);
						setTimeout(() => {
							setErrorMessage("");
						}, 3000);
						return;
					}
					auth.handleLogin(data.accessToken, data.refreshToken);
				});
		},
	});

	if (auth.isAuthenticated) {
		return <Navigate to="/dashboard/home" />;
	}

	return (
		<div className="">
			<div className="flex flex-col justify-center min-h-screen shadow-xl sm:py-12">
				<div className="relative w-full py-3 sm:max-w-xl sm:mx-auto min-">
					<div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-green-800 to-green-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
					<div className="relative h-full px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
						<div className="max-w-md mx-auto">
							<div className="flex items-center justify-center">
								<CurrencyDollarIcon className="w-8 h-8 mr-1 text-green-800" />
								<h1 className="text-2xl font-semibold text-center">
									Payment Manager
								</h1>
							</div>
							<div className="divide-y divide-gray-200">
								<form
									onSubmit={formik.handleSubmit}
									className="flex flex-col items-center justify-center py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
								>
									<div className="relative w-72">
										<input
											autoComplete="off"
											id="email"
											name="email"
											type="text"
											value={formik.values.email}
											onChange={formik.handleChange}
											className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
											placeholder="Email address"
										/>
										<label
											htmlFor="email"
											className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
										>
											Email Address
										</label>
										<label className="text-sm text-red-500 w-fit">
											{formik.errors.email}
										</label>
									</div>
									<div className="relative w-72">
										<input
											autoComplete="off"
											id="password"
											name="password"
											type="password"
											value={formik.values.password}
											onChange={formik.handleChange}
											className="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600"
											placeholder="Password"
										/>
										<label
											htmlFor="password"
											className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
										>
											Password
										</label>
										<label className="text-sm text-red-500">
											{formik.errors.password}
										</label>
									</div>
									<div className="relative w-72">
										<button
											type="submit"
											className="w-full px-4 py-1 text-white bg-green-800 rounded-md hover:bg-green-700"
										>
											Login
										</button>
									</div>
									<div className="relative w-72">
										Don't have an account?{" "}
										<Link
											to={"/register"}
											className="text-center text-green-800 hover:text-green-700"
										>
											Register
										</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				{errorMessage && (
					<div className="absolute flex items-center p-2 text-white bg-red-800 rounded-md bottom-10 right-20 min-w-20 w-fit animate-bounce">
						<ExclamationCircleIcon className="w-5 h-5 mr-1" />
						{errorMessage}
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
