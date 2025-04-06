import { Brand } from "@/utils/sizesEquivalencies";
import { Box, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
	brand: Brand | "other";
	setBrand: Dispatch<SetStateAction<Brand | "other">>;
}

export const BrandSelector = ({ brand, setBrand }: Props) => {
	return (
		<Box>
			<Text fontSize="1.7rem" fontWeight="600" color={"brand.secondaryColor1"}>
				Marca:
			</Text>
			<RadioGroup
				mb={"2rem"}
				value={brand}
				onChange={(value: Brand) => setBrand(value)}
			>
				<HStack gap="6">
					<Radio size="lg" value="other">
						<Text fontSize={"larger"}>Other</Text>
					</Radio>
					<Radio size="lg" value="adidas">
						<Text fontSize={"larger"}>Adidas</Text>
					</Radio>
					<Radio size="lg" value="nike">
						<Text fontSize={"larger"}>Nike</Text>
					</Radio>
					<Radio size="lg" value="puma">
						<Text fontSize={"larger"}>Puma</Text>
					</Radio>
					<Radio size="lg" value="underarmour">
						<Text fontSize={"larger"}>Under armour</Text>
					</Radio>
				</HStack>
			</RadioGroup>
		</Box>
	);
};
