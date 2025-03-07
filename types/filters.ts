export interface ProductsFilter {
	sizeOptions?: {
		usSize: { min: number; max: number };
	};
	tags?: string[];
}
