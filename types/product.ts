import { Brand } from "@/utils/sizesEquivalencies";

export type ReserveProductData = {
	id: string;
	userId: string | undefined;
	reservedData: ReservedData;
};

export type SizeOption = {
	usSize: number;
	color: string;
	quantity: number;
	arg?: number;
	cm?: number;
	eu?: number;
};

export type SizeOptions = SizeOption[];

export type ReservedData = {
	usSize: number;
	color: string;
	quantity: number;
	userId: string | undefined;
};

export type Product = {
	name: string;
	slug: string;
	images: string[];
	price: number;
	sizeOptions: SizeOptions;
	brand: Brand;
	_id?: string;
	desc?: string;
	tags?: string[];
	isFavorite?: boolean;
	reservedData?: ReservedData[];
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
