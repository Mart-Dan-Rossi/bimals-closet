import { ClothSizesOptions } from "@/utils/productCaracteristics";
import { StoredUserData } from "./auth";
import { Product, SizeOption } from "./product";

export type CartItemMPFormat = {
	id: string;
	name: string;
	unit_price: number;
	quantity: number;
	slug: string;
	image?: string;
	size?: number | ClothSizesOptions;
};

export type OrderDataMPFormat = {
	cartItems: CartItemMPFormat[];
	metadata: {
		userId: string | undefined;
		products: Product[];
	};
};

export type CartItemBEFormat = {
	id: string;
	name: string;
	price: number;
	sizeOption: SizeOption;
};

export type StoredOrdersDataFormat = {
	name: string;
	price: string | number;
	sizeOptions: SizeOption[];
	id?: string;
	_id?: string;
};

export type OrderDataBEFormat = {
	MPUserName: string;
	MPmail: string;
	createdAt: string;
	phoneMS: string;
	products: StoredOrdersDataFormat[];
	status: string;
	statusDetail: string;
	updatedAt: string;
	user: StoredUserData;
	_id: string;
	isDelivered?: boolean;
};
