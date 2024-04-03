import { usePayment } from "../../context/PaymentProvider";
import { useEffect, useState } from "react";
import moment from "moment";
import FiltersModal from "./FiltersModal";
import { FunnelIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import { CSVLink } from "react-csv";
import SearchBar from "./SearchBar";

const PaymentList = () => {
	const [payments, setPayments] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const paymentContext = usePayment();

	useEffect(() => {
		document.title = "View Payments";
		setPayments(paymentContext.payments);
	}, [paymentContext.payments]);

	const [currentPage, setCurrentPage] = useState(1);
	const paymentsPerPage = 5;
	const indexOfLastPayment = currentPage * paymentsPerPage;
	const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
	const currentPayments = payments.slice(
		indexOfFirstPayment,
		indexOfLastPayment,
	);
	const nPage = Math.ceil(payments.length / paymentsPerPage);

	const numbers = [...Array(nPage + 1).keys()].slice(1);

	const prePage = () => {
		if (currentPage !== indexOfFirstPayment && currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const nextPage = () => {
		if (currentPage + 1 > Math.max(...numbers)) {
			return;
		}
		setCurrentPage(currentPage + 1);
	};

	const changePage = (page) => {
		setCurrentPage(page);
	};

	const resetFilters = () => {
		setPayments(paymentContext.payments);
	};

	const handleFilter = (filters) => {
		const allFiltersEmpty = Object.values(filters).every(
			(value) => value === "",
		);

		if (allFiltersEmpty) {
			setShowModal(false);

			return payments;
		}

		const filteredPayments = payments.filter((payment) => {
			return Object.keys(filters).every((key) => {
				if (filters[key] === "") return true;

				if (key === "date") {
					const filterDate = moment(filters[key]);
					console.log("filterDate", filterDate);
					const paymentDate = moment(payment[key]);
					console.log("paymentDate", paymentDate);
					console.log("comparacion", paymentDate.isSame(filterDate, "day"));
					return paymentDate.isSame(filterDate, "day");
				}
				if (key === "id") {
					return payment[key] === parseInt(filters[key]);
				}
				if (key === "paymentType") {
					return payment[key]
						.toLowerCase()
						.includes(filters[key].toLowerCase());
				}
				if (key === "paidTo") {
					return payment[key]
						.toLowerCase()
						.includes(filters[key].toLowerCase());
				}

				return payment[key].toLowerCase().includes(filters[key].toLowerCase());
			});
		});
		setPayments(filteredPayments);
		setShowModal(false);
	};

	const handleSearch = (category, search) => {
		setPayments(paymentContext.payments);
		if (category === "paidTo" && search.length > 2) {
			const filteredPayments = paymentContext.payments.filter((payment) =>
				payment.paidTo.toLowerCase().includes(search.toLowerCase()),
			);
			setPayments(filteredPayments);
			return;
		}
	};

	return (
		<div className="container px-4 mx-auto sm:px-8">
			{showModal && (
				<FiltersModal
					handleFilter={handleFilter}
					resetFilters={resetFilters}
					setShowModal={setShowModal}
				/>
			)}
			<div className="py-8">
				<div className="flex items-center justify-between">
					<SearchBar handleSearch={handleSearch} />
					<div className="flex items-center justify-center gap-2">
						<button
							title="Open filter options"
							onClick={() => setShowModal(!showModal)}
							className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-green-700 rounded-lg shadow-md hover:bg-green-600"
						>
							<FunnelIcon className="w-5 h-5" />
						</button>
						<CSVLink
							title="Export to CSV Format"
							data={payments}
							className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-green-700 rounded-lg shadow-md hover:bg-green-600"
						>
							<TableCellsIcon className="w-5 h-5" />
						</CSVLink>
					</div>
				</div>

				<div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
					<div className="inline-block h-full min-w-full overflow-hidden border border-green-500 rounded-lg shadow ">
						<table className="min-w-full min-h-full leading-normal ">
							<thead className="">
								<tr>
									<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase bg-green-700 ">
										Id
									</th>
									<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase bg-green-700 ">
										Date
									</th>
									<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase bg-green-700 ">
										Paid to
									</th>
									<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase bg-green-700 ">
										Payment Type
									</th>
									<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-white uppercase bg-green-700 ">
										Amount
									</th>
								</tr>
							</thead>
							<tbody>
								{currentPayments?.map((payment, i) => (
									<tr key={i}>
										<td className="px-5 py-5 text-sm bg-white border-b border-green-500">
											<div className="flex items-center">
												<div className="ml-3">
													<p className="text-gray-900 whitespace-no-wrap">
														{payment.id}
													</p>
												</div>
											</div>
										</td>
										<td className="px-5 py-5 text-sm bg-white border-b border-green-500">
											<p className="text-gray-900 whitespace-no-wrap">
												{moment(payment.date).format("DD/MM/YYYY")}
											</p>
										</td>
										<td className="px-5 py-5 text-sm bg-white border-b border-green-500">
											<p className="text-gray-900 whitespace-no-wrap">
												{payment.paidTo}
											</p>
										</td>
										<td className="px-5 py-5 text-sm bg-white border-b border-green-500">
											<p className="text-gray-900 whitespace-no-wrap">
												{payment.paymentType}
											</p>
										</td>
										<td className="px-5 py-5 text-sm bg-white border-b border-green-500">
											<p className="text-gray-900 whitespace-no-wrap">
												$ {payment.amount}
											</p>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between ">
							<div className="inline-flex mt-2 xs:mt-0">
								<button
									onClick={prePage}
									className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400"
								>
									Prev
								</button>
								{numbers.map((number) => (
									<button
										key={number}
										onClick={() => changePage(number)}
										className={`px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400 ${
											currentPage === number ? "bg-gray-400" : ""
										}`}
									>
										{number}
									</button>
								))}
								<button
									onClick={nextPage}
									className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400"
								>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentList;
