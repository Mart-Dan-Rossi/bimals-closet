import { Product } from "@/types/product";
import { colorOptionDataArray } from "@/utils/productCaracteristics";
import { Flex, Tag } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useMemo } from "react";

interface Props {
	product: Product;
	select: Dispatch<SetStateAction<string | undefined>>;
	resetSelectedSize?: () => void;
	selectedColor?: string;
}

export const ColorOptions = ({
	product,
	select,
	selectedColor,
	resetSelectedSize,
}: Props) => {
	const finalProductColors = useMemo(
		() =>
			Array.from(
				new Set(product?.sizeOptions.map((sizeData) => sizeData.color) || [])
			),
		[product?.sizeOptions, selectedColor]
	);

	function handleSelectColor(color: string) {
		select(color);

		if (resetSelectedSize) {
			resetSelectedSize();
		}
	}

	return (
		<Flex gap={4} mt="1rem" maxW={"100%"}>
			{finalProductColors?.map((color) => (
				<Tag
					userSelect={"none"}
					onClick={() => handleSelectColor(color)}
					cursor="pointer"
					key={`color-picker-${product._id}-${color}`}
					p={[".6rem", ".6rem 1rem"]}
					fontSize={["1.5rem", "1.5rem", "1.2rem", "1.5rem"]}
					fontWeight="500"
					bg={
						colorOptionDataArray.find((colorData) => colorData.name === color)
							?.hash
					}
					border={
						selectedColor === color ? "1px solid gold" : "1px solid black"
					}
					borderRadius=".5rem"
					_hover={{ borderColor: "gold" }}
				></Tag>
			))}
		</Flex>
	);
};
