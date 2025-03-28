import { CartItemMPFormat } from "./order";

export type TStoreState = {
	user: Record<string, unknown>;
	token: string | null;
	setToken: (token: string | null) => void;
	removeToken: () => void;
};

export type TCartState = {
	cartCount: number;
	cart: CartItemMPFormat[];
	addToCart: (payload: CartItemMPFormat) => void;
	quantityCount: (id: string, type: "increament" | "decreament") => void;
	removeFromCart: (
		id: string | string[],
		name: string,
		isMultiple?: boolean
	) => void;
	emptyCart: () => void;
};
