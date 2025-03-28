import { SizeDisplayer } from "@/components/ui/modals/SizeDisplayer";
import { useGlobalContext } from "@/context/GlobalContext";
import { useHydratedCartState } from "@/hooks/state/hydrated";
import { CartItemMPFormat } from "@/types/order";
import { Product } from "@/types/product";
import { getAvailableQuantitiesBySizeAndColor } from "@/utils/functions";
import { getProperSizeEquivalencies } from "@/utils/sizesEquivalencies";
import { Flex, Tag, Text, Tooltip, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
	product: Product;
	selectedColor?: string;
	select?: Dispatch<SetStateAction<string>>;
	selectedSize?: string;
}

export const SizeOptions = ({
	selectedColor,
	product,
	select,
	selectedSize,
}: Props) => {
	const cart = useHydratedCartState("cart");
	const { isDarkMode } = useGlobalContext();

	const [finalProductSizes, setFinalProductSizes] = useState<number[]>([]);

	function adjustAvailableQuantities(
		availableSizes: Record<number, number>,
		cartItems: CartItemMPFormat[],
		color: string
	): Record<number, number> {
		const updatedSizes = { ...availableSizes };

		cartItems.forEach((cartItem) => {
			const nameParts = cartItem.name
				.split("-")
				.map((s) => s.replace(/\s+/g, ""));

			if (nameParts.length < 3) return;

			const productColor = nameParts[1].toLowerCase();
			const usSize = Number(nameParts[2].replace("US", ""));

			if (
				productColor === color.toLowerCase() &&
				updatedSizes[usSize] !== undefined
			) {
				updatedSizes[usSize] = Math.max(
					0,
					updatedSizes[usSize] - cartItem.quantity
				);
			}
		});

		return Object.fromEntries(
			Object.entries(updatedSizes).filter(([, value]) => value > 0)
		);
	}

	useEffect(() => {
		if (selectedColor) {
			const availableProductSizes = getAvailableQuantitiesBySizeAndColor(
				product,
				selectedColor
			);

			const thisProductInCartBySizes = cart?.filter((cartItem) => {
				const splitedName = cartItem.name
					.split("-")
					.map((string) => string.replace(/\s+/g, ""));

				const color = splitedName[1];
				const name = splitedName[0];

				return (
					color === selectedColor && product.name.replace(/\s+/g, "") === name
				);
			});

			if (thisProductInCartBySizes) {
				setFinalProductSizes(
					Object.keys(
						adjustAvailableQuantities(
							availableProductSizes,
							thisProductInCartBySizes,
							selectedColor
						)
					).map(Number)
				);
			} else {
				setFinalProductSizes(Object.keys(availableProductSizes).map(Number));
			}
		}
	}, [selectedColor, cart]);

	return (
		<>
			{select && typeof selectedSize === "string" ? (
				<Flex gap={4} mt="1rem" maxW={"100%"}>
					{finalProductSizes?.map((size, index) => (
						<Tooltip
							key={`product-size-options-tooltip-tag-${index}`}
							fontSize={"small"}
							hasArrow
							placement="top-start"
							label={getProperSizeEquivalencies(
								product.brand,
								product.sizeOptions[index]
							)}
						>
							<Tag
								onClick={() => select(size.toString())}
								cursor="pointer"
								size="lg"
								key={`product-size-options-tooltip-tag-${index}-${size}`}
								p={[".8rem", ".8rem 1.5rem"]}
								fontSize={["1.5rem", "1.5rem", "1.2rem", "1.5rem"]}
								fontWeight="500"
								bg={
									selectedSize === size.toString()
										? isDarkMode
											? "darkBrand.secondaryColor4"
											: "brand.secondaryColor4"
										: "transparent"
								}
								border={
									selectedSize === size.toString() ? "1px solid" : "1px solid"
								}
								borderColor={
									selectedSize === size.toString()
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
								{size.toString()}
							</Tag>
						</Tooltip>
					))}
				</Flex>
			) : (
				<VStack align={"start"}>
					<Text
						margin={"0"}
						fontWeight={"bold"}
						color={
							isDarkMode ? "darkBrand.secondaryColor1" : "brand.secondaryColor1"
						}
					>
						Talles (US):
					</Text>
					<SizeDisplayer
						keyHelper={product._id || "undefined"}
						allSizes={finalProductSizes}
						product={product}
					/>
				</VStack>
			)}
		</>
	);
};
