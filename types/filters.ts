import { ClothSizesOptions, ColorOptions } from "@/utils/productCaracteristics";

export interface ProductsFilter {
	sizeOptions?: {
		usSize?: {
			min: number | ClothSizesOptions;
			max: number | ClothSizesOptions;
		};
		usSizeSelection?: ClothSizesOptions[];
		color?: ColorOptions;
	};
	tags?: string[];
	brand?: string;
}
