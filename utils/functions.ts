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
				product.sizeOptions[option]?.length > 0
			) {
				displayableSizeName = option;
			}
		});
		return displayableSizeName.toUpperCase();
	}
}
