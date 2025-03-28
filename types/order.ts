import { SizeOption } from "./product";

export type CartItemMPFormat = {
	id: string;
	name: string;
	unit_price: number;
	quantity: number;
	image?: string;
	size?: number | string;
};

export type OrderDataMPFormat = {
	cartItems: CartItemMPFormat[];
	metadata: {
		userId: string | undefined;
	};
};

export type CartItemBEFormat = {
	id: string;
	name: string;
	price: number;
	sizeOption: SizeOption;
};

export type OrderDataBEFormat = {
	user: { accName: string };
	name: string;
	phone: string;
	mail: string;
	products: CartItemBEFormat[];
	_id?: string;
	isDelivered?: boolean;
};
