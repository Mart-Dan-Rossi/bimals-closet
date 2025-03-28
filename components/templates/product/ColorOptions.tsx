import { useGlobalContext } from "@/context/GlobalContext";
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
	const { isDarkMode } = useGlobalContext();

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
					onClick={() => handleSelectColor(color)}
					cursor="pointer"
					size="lg"
					key={`color-picker-${product._id}-${color}`}
					p={[".8rem", ".8rem 1.5rem"]}
					fontSize={["1.5rem", "1.5rem", "1.2rem", "1.5rem"]}
					fontWeight="500"
					bg={
						selectedColor === color
							? isDarkMode
								? "darkBrand.secondaryColor4"
								: "brand.secondaryColor4"
							: "transparent"
					}
					border={selectedColor === color ? "1px solid" : "1px solid"}
					borderColor={
						selectedColor === color
							? isDarkMode
								? "darkBrand.white100"
								: "brand.secondaryColor1"
							: isDarkMode
							? "darkBrand.dark100"
							: "brand.dark100"
					}
					borderRadius=".5rem"
					_hover={{
						borderColor: isDarkMode
							? "darkBrand.secondaryColor4"
							: "brand.secondaryColor1",
					}}
					color={isDarkMode ? "darkBrand.white100" : ""}
				>
					{color}
				</Tag>
			))}
		</Flex>
	);
};
