import { SizeDisplayer } from "@/components/ui/modals/SizeDisplayer";
import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { getSizeName } from "@/utils/functions";
import { Flex, Tag, Text, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
	product: Product;
	select?: Dispatch<SetStateAction<string>>;
	selectedSize?: string;
}

export const SizeOptions = ({ product, select, selectedSize }: Props) => {
	const { currentSizeType, sizeTypes } = useGlobalContext();

	function getPropperSize() {
		return currentSizeType !== "any"
			? product?.sizeOptions[currentSizeType].map((sizeData) => sizeData.size)
			: getAnySizeData();
	}

	useEffect(() => {
		setFinalProductSizes(getPropperSize());
	}, [currentSizeType]);

	const [finalProductSizes, setFinalProductSizes] = useState(getPropperSize());

	function getAnySizeData() {
		const sizeTypesCopy = [...sizeTypes];
		sizeTypesCopy.shift();

		let firstSizeTypeDataFound: number[] = [0];

		sizeTypesCopy.forEach((sizeType) => {
			if (
				sizeType !== "any" &&
				Object.keys(product.sizeOptions).includes(sizeType)
			) {
				if (
					product.sizeOptions[sizeType].map((sizeoption) => sizeoption.size)
				) {
					firstSizeTypeDataFound = product.sizeOptions[sizeType].map(
						(sizeOption) => sizeOption.size
					) ?? [0];
				}
			}
		});

		return firstSizeTypeDataFound;
	}

	return (
		<>
			{select && typeof selectedSize === "string" ? (
				<Flex gap={4} mt="1rem" maxW={"100%"}>
					{currentSizeType !== "any" &&
						!product?.sizeOptions[currentSizeType].map(
							(sizeOption) => sizeOption.size
						) && (
							<Text>No se pueden mostrar talles en este formato de talle</Text>
						)}
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
				</Flex>
			) : (
				<VStack align={"start"}>
					<Text margin={"0"} fontWeight={"bold"}>
						Talles ({getSizeName(product, currentSizeType)}):{" "}
					</Text>
					<SizeDisplayer
						keyHelper={product._id || "undefined"}
						allSizes={finalProductSizes}
					/>
				</VStack>
			)}
		</>
	);
};
