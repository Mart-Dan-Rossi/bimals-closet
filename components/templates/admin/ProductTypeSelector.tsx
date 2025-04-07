import { ProductType } from "@/utils/productCaracteristics";
import { Box, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
	productType: ProductType;
	setProductType: Dispatch<SetStateAction<ProductType>>;
}

const ProductTypeSelector = ({ productType, setProductType }: Props) => {
	return (
		<Box>
			<Text fontSize="1.7rem" fontWeight="600" color={"brand.black"}>
				Tipo de producto:
			</Text>
			<RadioGroup
				mb={"2rem"}
				value={productType}
				onChange={(value: ProductType) => setProductType(value)}
			>
				<HStack gap="6">
					<Radio size="lg" value="calzado">
						<Text fontSize={"larger"}>Calzado</Text>
					</Radio>
					<Radio size="lg" value="indumentaria">
						<Text fontSize={"larger"}>Indumentaria</Text>
					</Radio>
				</HStack>
			</RadioGroup>
		</Box>
	);
};

export default ProductTypeSelector;
