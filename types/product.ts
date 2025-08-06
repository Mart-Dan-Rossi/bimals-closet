import {
	Brand,
	ClothSizesOptions,
	ColorOptions,
	ProductType,
} from "@/utils/productCaracteristics";

export type ReserveProductData = {
	reservedData: ReservedData;
	id?: string;
	userId?: string;
};

export type SizeOption = {
	usSize: number | ClothSizesOptions;
	color: ColorOptions;
	quantity: number;
	arg?: number;
	cm?: number;
	eu?: number;
};

export type SizeOptions = SizeOption[];

export type CancelReservationData = {
	slug: string;
	usSize: number | ClothSizesOptions;
	color: string;
};

export type AdminCancelReservationData = {
	slug: string;
	userId: string;
	usSize: number | ClothSizesOptions;
	color: string;
};

export type ReservedData = {
	usSize: number | ClothSizesOptions;
	color: ColorOptions;
	quantity: number;
	timestamp: number;
	userId?: string | undefined;
	hide?: boolean;
};

export type ImageData = {
	negro: string[];
	blanco: string[];
	gris: string[];
	azul: string[];
	rojo: string[];
	amarillo: string[];
	verde: string[];
	violeta: string[];
	naranja: string[];
	rosa: string[];
	celeste: string[];
};

export type Product = {
	productType: ProductType;
	name: string;
	slug: string;
	images: ImageData;
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

export type ManualOrderDataFormat = {
	userId: string;
	products: Product[];
};
