import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
	const [category, setCategory] = useState("paidTo");
	const [search, setSearch] = useState("");

	return (
		<div className="flex flex-col my-2 sm:flex-row">
			<div className="flex flex-row mb-1 sm:mb-0">
				<div className="relative">
					<select
						onChange={(e) => setCategory(e.target.value)}
						className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-t border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
					>
						<option value={"paidTo"}>Paid To</option>
					</select>
					<div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
						<svg
							className="w-4 h-4 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					</div>
				</div>
			</div>
			<div className="relative block">
				<span className="absolute inset-y-0 left-0 flex items-center h-full pl-2">
					<svg
						viewBox="0 0 24 24"
						className="w-4 h-4 text-gray-500 fill-current"
					>
						<path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
					</svg>
				</span>
				<input
					onChange={(e) => {
						setSearch(e.target.value);

						handleSearch(category, search);
					}}
					type="text"
					value={search}
					placeholder="Search"
					className="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
				/>
			</div>
		</div>
	);
};

export default SearchBar;
