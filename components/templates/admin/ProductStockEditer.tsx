import { SizeOptions } from "@/types/product";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { ColorSizesAndQuantityInputsEditionContainer } from "./ColorSizesAndQuantityInputsEditionContainer";
import { Brand } from "@/utils/productCaracteristics";
import { Dispatch, SetStateAction } from "react";
import { inputStyles } from "./ProductEditionModal";
import { RiAddCircleLine } from "react-icons/ri";

interface Props {
	sizeOptions: SizeOptions;
	brand: Brand | "other";
	setSizeOptions: Dispatch<SetStateAction<SizeOptions>>;
	handleAddSizeOptionsInput: () => void;
	showFormErrors: boolean;
	isValidsizeOptionsData: boolean;
	handleDeleteSizeOptionsInputsLine: (index: number) => void;
}

export const ProductStockEdited = ({
	sizeOptions,
	brand,
	setSizeOptions,
	handleAddSizeOptionsInput,
	showFormErrors,
	isValidsizeOptionsData,
	handleDeleteSizeOptionsInputsLine,
}: Props) => {
	return (
		<Box
			my="2rem"
			padding={"1rem"}
			borderRadius={"10px"}
			border={"1px solid black"}
		>
			{Object.keys(sizeOptions).map((__, index1) => {
				return (
					<Flex
						key={`edition-sizeOptions-container-${index1}`}
						alignItems={"flex-start"}
						marginTop={"2rem"}
					>
						<ColorSizesAndQuantityInputsEditionContainer
							brand={brand}
							sizeOptions={sizeOptions}
							index1={index1}
							setSizeOptions={setSizeOptions}
							inputStyles={inputStyles}
							showFormErrors={showFormErrors}
							isValidsizeOptionsData={isValidsizeOptionsData}
							handleDeleteSizeOptionsInputsLine={
								handleDeleteSizeOptionsInputsLine
							}
						/>
					</Flex>
				);
			})}
			<Button
				colorScheme="blue"
				margin={"1rem auto"}
				onClick={handleAddSizeOptionsInput}
			>
				<Icon as={RiAddCircleLine} fontSize="2rem" />
			</Button>
		</Box>
	);
};
