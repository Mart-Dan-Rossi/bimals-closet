import { SizeOptions } from "@/types/product";
import { Brand, ProductType } from "@/utils/productCaracteristics";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { ColorSizesAndQuantityInputsEditionContainer } from "./ColorSizesAndQuantityInputsEditionContainer";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	productType: ProductType;
	sizeOptions: SizeOptions;
	brand: Brand | "other";
	setSizeOptions: Dispatch<SetStateAction<SizeOptions>>;
	handleAddSizeOptionsInput: () => void;
	showFormErrors: boolean;
	isValidsizeOptionsData: boolean;
	handleDeleteSizeOptionsInputsLine: (index: number) => void;
}

export const ProductStockEdited = ({
	productType,
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
							productType={productType}
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
