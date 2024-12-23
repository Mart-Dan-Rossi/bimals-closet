import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { getSizeName } from "@/utils/functions";
import { Box, Flex, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
	product: Product;
	select?: Dispatch<SetStateAction<string>>;
	selectedSize?: string;
}

export const SizeOptions = ({ product, select, selectedSize }: Props) => {
	const { currentSizeType, sizeTypes } = useGlobalContext();

	function getAnySizeData() {
		const sizeTypesCopy = [...sizeTypes];
		sizeTypesCopy.shift();

		let firstSizeTypeDataFound: number[] = [0];

		sizeTypesCopy.forEach((sizeType) => {
			if (
				sizeType !== "any" &&
				Object.keys(product.sizeOptions).includes(sizeType)
			) {
				if (product.sizeOptions[sizeType]) {
					firstSizeTypeDataFound = product.sizeOptions[sizeType] ?? [0];
				}
			}
		});

		return firstSizeTypeDataFound;
	}

	const finalProductSizes =
		currentSizeType !== "any"
			? product?.sizeOptions[currentSizeType]
			: getAnySizeData();

	if (select && typeof selectedSize === "string") {
		return (
			<HStack spacing={4} mt="1rem">
				{finalProductSizes?.map((size) => (
					<Tag
						onClick={() => select(size.toString())}
						cursor="pointer"
						size="lg"
						key={size}
						p={[".8rem", ".8rem 1.5rem"]}
						fontSize={["1.5rem", "1.5rem", "1.2rem", "1.5rem"]}
						fontWeight="500"
						bg="transparent"
						border={
							selectedSize === size.toString() ? "3px solid" : "1px solid"
						}
						borderColor={
							selectedSize === size.toString()
								? "brand.secondaryColor1"
								: "brand.white500"
						}
						borderRadius=".5rem"
						_hover={{
							borderColor: "brand.secondaryColor1",
						}}
					>
						{size}
					</Tag>
				))}
			</HStack>
		);
	}

	return (
		<VStack align={"start"}>
			<Text margin={"0"} fontWeight={"bold"}>
				Talles ({getSizeName(product, currentSizeType)}):{" "}
			</Text>
			<Flex
				border={"1px solid black"}
				gap={2}
				padding={"0 1rem 0 1rem"}
				borderRadius={"20px"}
			>
				{finalProductSizes?.map((sizeOption, index) => {
					return (
						<Flex
							key={`size-options-${product._id}-${sizeOption}-${index}`}
							justify={"space-between"}
							gap={2}
						>
							<Text>{sizeOption}</Text>
							{finalProductSizes?.length !== index + 1 && (
								<Box
									height="auto"
									mx={1}
									borderLeft="1px solid"
									borderColor="gray.300"
								/>
							)}
						</Flex>
					);
				})}
			</Flex>
		</VStack>
	);
};
