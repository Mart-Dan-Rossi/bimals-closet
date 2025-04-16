import { ColorOptions } from "@/utils/productCaracteristics";

export interface ProductsFilter {
	sizeOptions?: {
		usSize?: { min: number; max: number };
		color?: ColorOptions;
	};
	tags?: string[];
	brand?: string;
}
