import { CartItem } from "@/hooks/state/storage";

export type TStoreState = {
	user: Record<string, unknown>;
	token: string | null;
	setToken: (token: string | null) => void;
	removeToken: () => void;
};

export type TCartState = {
	cartCount: number;
	cart: CartItem[];
	addToCart: (payload: CartItem) => void;
	quantityCount: (id: string, type: "increament" | "decreament") => void;
	removeFromCart: (id: string | string[], isMultiple?: boolean) => void;
	emptyCart: () => void;
};
