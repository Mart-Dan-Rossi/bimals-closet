type SizeOptions = {
	[key: string]: number[] | undefined; // Permite cualquier clave con valores `number[]` o `undefined`
};

export type Product = {
	_id: string;
	name: string;
	slug: string;
	images: string[];
	price: number;
	sizeOptions: SizeOptions;
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
