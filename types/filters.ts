export interface SizeFilter {
	sizeOptions?: {
		[key: string]: { min: number; max: number };
	};
}
