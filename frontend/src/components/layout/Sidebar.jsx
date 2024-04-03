import {
	HomeIcon,
	DocumentPlusIcon,
	TableCellsIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();

	return (
		<aside className="bg-green-900 text-white w-2/12 h-[90vh] p-4 rounded-bl-xl">
			<nav>
				<ul className="space-y-4">
					<li className="cursor-pointer">
						<div
							onClick={() => navigate("/dashboard/home")}
							className="flex items-center justify-between p-2 hover:bg-green-700 rounded"
						>
							<div className="flex items-center">
								<HomeIcon className="h-6 w-6 mr-2" />
								<span>Home</span>
							</div>
						</div>
					</li>
					<li className="cursor-pointer">
						<div
							onClick={() => navigate("/dashboard/add-payment")}
							className="flex items-center justify-between p-2 hover:bg-green-700 rounded"
						>
							<div className="flex items-center">
								<DocumentPlusIcon className="h-6 w-6 mr-2" />
								<span>Add payment</span>
							</div>
						</div>
					</li>
					<li className="cursor-pointer">
						<div
							onClick={() => navigate("/dashboard/view-payments")}
							className="flex items-center justify-between p-2 hover:bg-green-700 rounded"
						>
							<div className="flex items-center">
								<TableCellsIcon className="h-6 w-6 mr-2" />
								<span>Payment list</span>
							</div>
						</div>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
