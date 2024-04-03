import {
	CurrencyDollarIcon,
	ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
	const auth = useAuth();

	return (
		<nav className="bg-gradient-to-r from-green-900 to-green-500 p-4 flex items-center justify-between rounded-t-xl">
			<div className="flex items-center">
				<CurrencyDollarIcon className="h-8 w-8 mr-1 text-white" />
				<h1 className="text-white text-lg font-semibold">Payment Manager</h1>
			</div>
			<div
				onClick={() => auth.handleLogout()}
				className="flex items-center cursor-pointer p-2 hover:bg-green-700 rounded"
			>
				<span className="text-white">Logout</span>
				<ArrowRightStartOnRectangleIcon className="ml-1 h-6 w-6 text-white" />
			</div>
		</nav>
	);
};

export default Navbar;
