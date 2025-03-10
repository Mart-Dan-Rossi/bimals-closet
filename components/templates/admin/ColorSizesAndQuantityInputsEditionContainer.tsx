import { SizeOptions } from "@/types/product";
import { Box, CloseButton, Input, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
	inputStyles: {
		border: string;
		borderRadius: string;
		py: string;
		fontSize: string;
		_placeholder: {
			fontWeight: number;
			fontSize: string;
			color: string;
		};
		_focus: {
			borderColor: string;
			boxShadow: string;
		};
	};
	brand: "puma" | "nike" | "adidas" | "underArmour" | "other";
	sizeOptions: SizeOptions;
	index1: number;
	setSizeOptions: Dispatch<SetStateAction<SizeOptions>>;
	showFormErrors: boolean;
	isValidsizeOptionsData: boolean;
	handleDeleteSizeOptionsInputsLine: (index: number) => void;
}

export const ColorSizesAndQuantityInputsEditionContainer = ({
	inputStyles,
	brand,
	sizeOptions,
	index1,
	setSizeOptions,
	showFormErrors,
	isValidsizeOptionsData,
	handleDeleteSizeOptionsInputsLine,
}: Props) => {
	const optionalSizes = ["arg", "eu", "cm"] as const;

	const handleColorChange = (index: number, newColor: string) => {
		setSizeOptions((prevSizeOptions) => {
			return prevSizeOptions.map((sizeOption, idx) =>
				idx === index ? { ...sizeOption, color: newColor } : sizeOption
			);
		});
	};

	const handleSizeChange = (
		index: number,
		size: string,
		sizeType?: "arg" | "eu" | "cm"
	) => {
		setSizeOptions((prevSizeOptions) => {
			const newSize = size ? parseInt(size) : 0;
			return prevSizeOptions.map((sizeOption, idx) => {
				return idx === index
					? { ...sizeOption, [sizeType ?? "usSize"]: newSize }
					: sizeOption;
			});
		});
	};

	const handleQuantityChange = (index: number, quantity: string) => {
		setSizeOptions((prevSizeOptions) => {
			const newQuantity = quantity ? Number(quantity) : 0;
			return prevSizeOptions.map((sizeOption, idx) =>
				idx === index ? { ...sizeOption, quantity: newQuantity } : sizeOption
			);
		});
	};

	return (
		<>
			<Box>
				<Text>Color:</Text>
				<Input
					id={`productSizeOptionColor${index1}`}
					value={sizeOptions[index1].color || ""}
					onChange={(e) => handleColorChange(index1, e.target.value)}
					placeholder={"Color"}
					type="text"
					{...inputStyles}
				/>
				{showFormErrors &&
					!isValidsizeOptionsData &&
					sizeOptions[index1].color === "" && (
						<Text color="red" fontSize={"sm"}>
							Este campo es requerido!
						</Text>
					)}
			</Box>

			<Box margin={"0 1rem"}>
				<Text>Talle(US):</Text>
				<Input
					id={`productSizeOptionSize${index1}`}
					value={sizeOptions[index1].usSize || ""}
					onChange={(e) => handleSizeChange(index1, e.target.value)}
					placeholder={"Talle en US"}
					type="number"
					{...inputStyles}
				/>
				{showFormErrors &&
					!isValidsizeOptionsData &&
					sizeOptions[index1].usSize === 0 && (
						<Text color="red" fontSize={"sm"}>
							Este campo es requerido!
						</Text>
					)}
				{brand === "other" && (
					<>
						{optionalSizes.map((optionalSize: "arg" | "eu" | "cm", index2) => {
							return (
								<Box
									key={`edition-optionalSizes-add-${optionalSize}-${index1}`}
								>
									<Text>Talle({optionalSize.toUpperCase()}):</Text>
									<Input
										id={`productSizeOptionSize${index2}-${optionalSize}`}
										value={sizeOptions[index1][optionalSize] || ""}
										placeholder={`Talle en ${optionalSize.toUpperCase()}`}
										onChange={(e) =>
											handleSizeChange(index1, e.target.value, optionalSize)
										}
										type="number"
										{...inputStyles}
									/>
									{showFormErrors &&
										!isValidsizeOptionsData &&
										sizeOptions[index1][optionalSize] === 0 && (
											<Text color="red" fontSize={"sm"}>
												Este campo es requerido!
											</Text>
										)}
								</Box>
							);
						})}
					</>
				)}
			</Box>

			<Box>
				<Text>Cantidad:</Text>
				<Input
					id={`productSizeOptionQuantity${index1}`}
					value={sizeOptions[index1].quantity || ""}
					placeholder={"Cantidad"}
					onChange={(e) => handleQuantityChange(index1, e.target.value)}
					type="number"
					{...inputStyles}
				/>
				{showFormErrors &&
					!isValidsizeOptionsData &&
					sizeOptions[index1].quantity === 0 && (
						<Text color="red" fontSize={"sm"}>
							Este campo es requerido!
						</Text>
					)}
			</Box>
			<CloseButton onClick={() => handleDeleteSizeOptionsInputsLine(index1)} />
		</>
	);
};
