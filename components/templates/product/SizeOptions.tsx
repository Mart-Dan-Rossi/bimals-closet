import { useHydratedCartState } from "@/hooks/state/hydrated";
import { CartItemMPFormat } from "@/types/order";
import { Product } from "@/types/product";
import { getAvailableQuantitiesBySizeAndColor } from "@/utils/functions";
import {
	getProperSizeEquivalencies,
	sizeEquivalencies,
	validBrands,
} from "@/utils/productCaracteristics";
import { Button, ButtonGroup, Tooltip } from "@chakra-ui/react";
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

	function sortSizeEquivalencies(sE: string[]) {
		return sE.sort((a, b) => Number(a) - Number(b));
	}

	const sizeEquivalenciesOrdered = validBrands.includes(product.brand)
		? sortSizeEquivalencies(Object.keys(sizeEquivalencies[product.brand]))
		: sortSizeEquivalencies(Object.keys(sizeEquivalencies["underarmour"]));

	return (
		<ButtonGroup
			flexWrap="wrap"
			display="flex"
			isAttached
			variant="outline"
			colorScheme="blackAlpha"
			borderRadius={"7px"}
		>
			{sizeEquivalenciesOrdered?.map((size, index) => {
				const currentSizeOption = product.sizeOptions.find((sizeOption) => {
					return sizeOption.usSize === Number(size);
				});
				return (
					<Tooltip
						key={`product-size-options-tooltip-tag-${index}`}
						fontSize={"small"}
						hasArrow
						placement="top-start"
						label={getProperSizeEquivalencies(
							product.brand,
							size,
							currentSizeOption
						)}
					>
						<Button
							marginTop={".5rem"}
							onClick={() =>
								select &&
								typeof selectedSize === "string" &&
								select(size.toString())
							}
							p={[".8rem", ".8rem 1.5rem"]}
							isDisabled={!finalProductSizes.includes(Number(size))}
							color={selectedSize === size ? "white" : "black"}
							bg={selectedSize === size ? "black" : "white"}
						>
							{size.toString()}
						</Button>
					</Tooltip>
				);
			})}
		</ButtonGroup>
	);
};
