export type SizeOptions = {
	[key: string]: { size: number; quantity: number }[];
};

export type Product = {
	name: string;
	slug: string;
	images: string[];
	price: number;
	sizeOptions: SizeOptions;
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
