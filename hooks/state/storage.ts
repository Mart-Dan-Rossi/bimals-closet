import { CartItemMPFormat } from "@/types/order";
import { TCartState, TStoreState } from "@/types/storeState";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export const useStoreState = create<TStoreState>()(
	devtools(
		persist(
			(set) => ({
				user: {},
				token: null,
				setToken: (token) => set({ token }),
				removeToken: () => set({ token: null }),
			}),
			{
				name: "__mateo_shoes_store_data__",
			}
		)
	)
);

export const useCartState = create<TCartState>()(
	devtools(
		persist(
			subscribeWithSelector((set, get) => ({
				cart: [],
				cartCount: 0,
				addToCart: (payload: CartItemMPFormat) => {
					const cartClone = [...get().cart];
					const isInCartIdx = cartClone.findIndex(
						(item) => item.id === payload.id
					);

					if (
						isInCartIdx === -1 ||
						cartClone[isInCartIdx].name !== payload.name
					) {
						payload.quantity = 1;
						const cartItems = [...cartClone, payload];
						return set({ cart: cartItems, cartCount: cartItems.length });
					}

					cartClone[isInCartIdx].quantity += 1;
					return set({ cart: cartClone, cartCount: cartClone.length });
				},

				quantityCount: (id: string, type: string) => {
					const cartClone = [...get().cart];
					const item = cartClone.find((item) => item.id === id);

					if (item) {
						if (type === "increament") {
							item.quantity += 1;
						} else if (type === "decreament" && item.quantity > 1) {
							item.quantity -= 1;
						}

						return set({ cart: cartClone });
					}
				},

				removeFromCart: (
					id: string,
					color: string,
					size: string,
					name: string
				) => {
					console.log("removing");
					const spacelessColor = color.replace(/\s+/g, "");

					const cartClone = [...get().cart];
					const updatedCart = cartClone.filter((item) => {
						const nameWithoutSpaces = name.replace(/\s+/g, "");

						const nameColorAndSizeArray = item.name
							.replace(/\s+/g, "")
							.split("-");

						const actualProductName = nameColorAndSizeArray[0];
						const productColor = nameColorAndSizeArray[1];
						const productSize = nameColorAndSizeArray[2].replace("US", "");

						return !(
							(item.id === id || actualProductName === nameWithoutSpaces) &&
							productColor === spacelessColor &&
							productSize === size
						);
					});

					return set({
						cart: updatedCart,
						cartCount: updatedCart.length,
					});
				},

				emptyCart: () => set({ cart: [], cartCount: 0 }),
			})),
			{
				name: "__mateo_shoes_cart__",
			}
		)
	)
);
