/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const FiltersModal = ({ handleFilter, setShowModal, resetFilters }) => {
	const [filters, setFilters] = useState({
		paidTo: "",
		id: "",
		date: "",
		paymentType: "",
	});

	const handleReset = () => {
		setFilters({
			paidTo: "",
			paymentId: "",
			date: "",
			paymentType: "",
		});
		resetFilters();
		setShowModal(false);
	};

	return (
		<div className="absolute z-10 max-w-screen-md m-2 rounded top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
			<XMarkIcon
				className="absolute w-6 h-6 text-gray-600 cursor-pointer top-2 right-2"
				onClick={() => setShowModal(false)}
			/>

			<div className="p-6 bg-white border border-gray-200 shadow-2xl rounded-xl">
				<h2 className="text-xl font-bold text-stone-700">Apply filters</h2>
				<p className="mt-1 text-sm">
					Use filters to further refine search. You can leave some field empty
				</p>
				<div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<div className="flex flex-col">
						<label
							htmlFor="paidto"
							className="text-sm font-medium text-stone-600"
						>
							Paid to
						</label>
						<input
							type="text"
							id="paidto"
							placeholder="Someone"
							value={filters.paidTo}
							onChange={(e) =>
								setFilters({ ...filters, paidTo: e.target.value })
							}
							className="block w-full px-2 py-2 mt-2 border rounded border-slate-200 hover:border-green-500 focus:outline-none focus:ring focus:ring-green-500/40 active:ring active:ring-green-500/40"
						/>
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="manufacturer"
							className="text-sm font-medium text-stone-600"
						>
							Payment Id
						</label>
						<input
							value={filters.id}
							onChange={(e) => setFilters({ ...filters, id: e.target.value })}
							type="number"
							id="paymentid"
							placeholder="1"
							className="block w-full px-2 py-2 mt-2 border rounded border-slate-200 hover:border-green-500 focus:outline-none focus:ring focus:ring-green-500/40 active:ring active:ring-green-500/40"
						/>
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="date"
							className="text-sm font-medium text-stone-600"
						>
							Date of Payment
						</label>
						<input
							value={filters.date}
							onChange={(e) => setFilters({ ...filters, date: e.target.value })}
							type="date"
							id="date"
							className="block w-full px-2 py-2 mt-2 border rounded border-slate-200 hover:border-green-500 focus:outline-none focus:ring focus:ring-green-500/40 active:ring active:ring-green-500/40"
						/>
					</div>

					<div className="flex flex-col">
						<label
							htmlFor="status"
							className="text-sm font-medium text-stone-600"
						>
							Type of Payment
						</label>

						<select
							id="paymentType"
							value={filters.paymentType}
							onChange={(e) =>
								setFilters({ ...filters, paymentType: e.target.value })
							}
							className="block w-full px-2 py-2 mt-2 border rounded border-slate-200 hover:border-green-500 focus:outline-none focus:ring focus:ring-green-500/40 active:ring active:ring-green-500/40"
						>
							<option value="">Select payment type</option>
							<option value={"cash"}>Cash</option>
							<option value={"credit card"}>Credit Card</option>
							<option value={"debit card"}>Debit Card</option>
						</select>
					</div>
				</div>

				<div className="grid justify-end w-full grid-cols-2 mt-6 space-x-4 md:flex">
					<button
						onClick={handleReset}
						className="px-8 py-2 font-medium text-gray-600 bg-gray-200 rounded-lg outline-none active:scale-95 focus:ring hover:opacity-90"
					>
						Reset
					</button>
					<button
						onClick={() => handleFilter(filters)}
						className="px-8 py-2 font-medium text-white bg-green-600 rounded-lg outline-none active:scale-95 focus:ring hover:opacity-90"
					>
						Filter
					</button>
				</div>
			</div>
		</div>
	);
};

export default FiltersModal;
