import {
	Brand,
	ColorOptions,
	ProductType,
} from "@/utils/productCaracteristics";

export type ReserveProductData = {
	id: string;
	userId: string | undefined;
	reservedData: ReservedData;
};

export type SizeOption = {
	usSize: number;
	color: ColorOptions;
	quantity: number;
	arg?: number;
	cm?: number;
	eu?: number;
};

export type SizeOptions = SizeOption[];

export type ReservedData = {
	usSize: number;
	color: ColorOptions;
	userId: string | undefined;
	quantity: number;
	hide?: boolean;
};

export type Product = {
	productType: ProductType;
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
	createdAt?: string;
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
