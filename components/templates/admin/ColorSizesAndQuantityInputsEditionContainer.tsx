import { SizeOptions } from "@/types/product";
import { capitalize } from "@/utils/functions";
import {
	Brand,
	colorOptionDataArray,
	ColorOptions,
} from "@/utils/productCaracteristics";
import {
	Box,
	Button,
	CloseButton,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

interface Props {
	brand: Brand | "other";
	sizeOptions: SizeOptions;
	index1: number;
	setSizeOptions: Dispatch<SetStateAction<SizeOptions>>;
	showFormErrors: boolean;
	isValidsizeOptionsData: boolean;
	handleDeleteSizeOptionsInputsLine: (index: number) => void;
	inputStyles?: {
		border: string;
		borderRadius: string;
		py: string;
		fontSize: string;
		_placeholder: { fontWeight: number; fontSize: string; color: string };
		_focus: { borderColor: string; boxShadow: string };
	};
}

export const ColorSizesAndQuantityInputsEditionContainer = ({
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
				idx === index
					? { ...sizeOption, color: newColor as ColorOptions }
					: sizeOption
			);
		});
	};

	const handleSizeChange = (
		index: number,
		size: string,
		sizeType?: "arg" | "eu" | "cm"
	) => {
		setSizeOptions((prevSizeOptions) => {
			const newSize = size ? Number(size) : 0;
			return prevSizeOptions.map((sizeOption, idx) => {
				return idx === index
					? {
							...sizeOption,
							[sizeType ?? "usSize"]:
								sizeOption[sizeType ?? "usSize"] === 0 ||
								sizeOption[sizeType ?? "usSize"] === undefined
									? sizeType
										? 40
										: 8
									: newSize,
					  }
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
			<Box maxW={"33%"}>
				<Text>Color:</Text>
				<Menu>
					<MenuButton as={Button} rightIcon={<AiOutlineCaretDown />}>
						{capitalize(sizeOptions[index1].color || "Negro")}
					</MenuButton>
					<MenuList>
						{colorOptionDataArray.map((colorData, index) => (
							<MenuItem
								key={`color-${index}`}
								onClick={() => handleColorChange(index1, colorData.name)}
							>
								<Flex align="center" gap={2}>
									<Box
										w="16px"
										h="16px"
										borderRadius="full"
										bg={colorData.hash}
										border="1px solid #ccc"
									/>
									{capitalize(colorData.name)}
								</Flex>
							</MenuItem>
						))}
					</MenuList>
				</Menu>
			</Box>

			<Box margin={"0 1rem"}>
				<Text>Talle(US):</Text>
				<NumberInput
					id={`productSizeOptionSize${index1}`}
					value={sizeOptions[index1].usSize || ""}
					step={0.5}
					onChange={(e) => handleSizeChange(index1, e)}
					border="1px solid #EAEAEA"
					borderRadius="1rem"
					size={"lg"}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
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
									<NumberInput
										id={`productSizeOptionSize${index2}-${optionalSize}`}
										value={sizeOptions[index1][optionalSize] || ""}
										step={0.5}
										onChange={(e) => handleSizeChange(index1, e, optionalSize)}
										border="1px solid #EAEAEA"
										borderRadius="1rem"
										fontSize="1.6rem"
										size={"lg"}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
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
				<NumberInput
					id={`productSizeOptionQuantity${index1}`}
					value={sizeOptions[index1].quantity || ""}
					step={1}
					onChange={(e) => handleQuantityChange(index1, e)}
					border="1px solid #EAEAEA"
					borderRadius="1rem"
					fontSize="1.6rem"
					size={"lg"}
					min={1}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
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
