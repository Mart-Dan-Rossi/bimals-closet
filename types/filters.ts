import { ClothSizesOptions, ColorOptions } from "@/utils/productCaracteristics";

export interface ProductsFilter {
	sizeOptions?: {
		usSize?: {
			min: number;
			max: number;
		};
		usSizeSelection?: ClothSizesOptions[];
		color?: ColorOptions;
	};
	tags?: string[];
	brand?: string;
	productType?: string;
}
