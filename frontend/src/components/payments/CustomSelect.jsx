import Select from "react-select";

const CustomSelect = ({ onChange, options, value, className }) => {
	const defaultValue = (options, value) => {
		return options ? options.find((option) => option.value === value) : "";
	};

	return (
		<div>
			<Select
				className={className}
				value={defaultValue(options, value)}
				onChange={(value) => onChange(value)}
				options={options}
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						borderColor: state.isFocused ? "#22c55e" : "#f1f5f9",
						boxShadow: state.isFocused ? null : null,

						"&:hover": {
							borderColor: state.isFocused ? "#22c55e" : "#22c55e",
						},
					}),

					option: (baseStyles, state) => ({
						...baseStyles,
						backgroundColor: state.isSelected ? "#22c55e" : "#fff",
						color: state.isSelected ? "#fff" : "#333",
						"&:hover": {
							backgroundColor: "#22c55e",
							color: "#fff",
						},
					}),
				}}
			/>
		</div>
	);
};

export default CustomSelect;
