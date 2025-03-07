export type SizeOptions = {
	usSize: number;
	color: string;
	quantity: number;
	arg?: number;
	cm?: number;
	eu?: number;
}[];

export type Product = {
	name: string;
	slug: string;
	images: string[];
	price: number;
	sizeOptions: SizeOptions;
	brand: "puma" | "nike" | "adidas" | "underArmour" | "other"; // If the brand is "other" make SizeOptions mandatory to upload
	_id?: string;
	desc?: string;
	tags?: string[];
	isFavorite?: boolean;
};

export type ProductListProps = {
	productData: {
		data: {
			products: Product[];
		};
	};
};

export type CheckedProducts = {
	[productId: string]: boolean;
};
