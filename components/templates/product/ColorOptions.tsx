import { Product } from "@/types/product";
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
					size="lg"
					key={`color-picker-${product._id}-${color}`}
					p={[".8rem", ".8rem 1.5rem"]}
					fontSize={["1.5rem", "1.5rem", "1.2rem", "1.5rem"]}
					fontWeight="500"
					bg={selectedColor === color ? "brand.secondaryColor4" : "transparent"}
					border={selectedColor === color ? "1px solid" : "1px solid"}
					borderColor={
						selectedColor === color ? "brand.secondaryColor1" : "brand.dark100"
					}
					borderRadius=".5rem"
					_hover={{ borderColor: "brand.secondaryColor1" }}
				>
					{color}
				</Tag>
			))}
		</Flex>
	);
};
