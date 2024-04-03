import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
	return (
		<div className="container flex items-center justify-center w-full h-screen">
			<div className="bg-white w-11/12 shadow-lg rounded-xl h-[95vh] overflow-hidden flex flex-col">
				<Navbar />
				<div className="flex justify-between">
					<Sidebar />
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
