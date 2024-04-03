import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

/* const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/",
		element: <ProtectedRoutes />,
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
	},
]); */

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
