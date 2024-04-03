import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import mainImg from "../assets/home-dashboard.svg";

const Home = () => {
	return (
		<div className="w-full">
			<h1 className="mt-10 text-3xl font-semibold text-center">
				{" "}
				<RoughNotation
					show={true}
					animate={true}
					type="box"
					color="#059669"
					padding={8}
					strokeWidth={3}
				>
					Welcome to your Payment Manager
				</RoughNotation>
			</h1>

			<div className="flex items-center justify-center mt-20">
				<img src={mainImg} alt="Main dashboard" className="w-4/12" />
				<p className="text-xl font-semibold leading-loose text-center">
					Manage your{" "}
					<RoughNotation
						show={true}
						animate={true}
						type="circle"
						color="#059669"
						padding={6}
						strokeWidth={1}
					>
						payments
					</RoughNotation>{" "}
					with ease. <br />
					Stay organized and keep track of your{" "}
					<RoughNotation
						show={true}
						animate={true}
						type="underline"
						color="#059669"
						padding={8}
						strokeWidth={1}
					>
						money.
					</RoughNotation>
				</p>
			</div>
		</div>
	);
};

export default Home;
