import { ValidSizeOptions } from "@/context/GlobalContext";
import { Product } from "@/types/product";

export function getSizeName(
	product: Product,
	currentSizeType: "any" | "us" | "eu"
) {
	if (currentSizeType !== "any") {
		return currentSizeType.toUpperCase();
	} else {
		let displayableSizeName = "";
		Object.keys(product.sizeOptions).forEach((sizeOption) => {
			const option = sizeOption as keyof ValidSizeOptions;
			if (
				product.sizeOptions[option] &&
				(product?.sizeOptions[option]?.length ?? 0) > 0
			) {
				displayableSizeName = option;
			}
		});
		return displayableSizeName.toUpperCase();
	}
}

export function getPropperSizeType(
	currentSizeType: "any" | "us" | "eu",
	sizeTypes: ("any" | "us" | "eu")[],
	lowerCase?: boolean
) {
	const sizeType = currentSizeType === "any" ? sizeTypes[1] : currentSizeType;

	if (lowerCase) return sizeType.toLocaleLowerCase();

	return sizeType.toUpperCase();
}
