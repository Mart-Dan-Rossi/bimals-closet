export type Product = {
	_id: string;
	name: string;
	slug: string;
	image: string;
	price: number;
	isFavorite: boolean;
	desc?: string;
	sizeOptions: { us?: number[]; eu?: number[] };
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
