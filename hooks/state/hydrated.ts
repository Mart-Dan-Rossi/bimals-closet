import { useEffect, useState } from "react";
import { useCartState, useStoreState } from "./storage";
import { TCartState, TStoreState } from "@/types/storeState";

type TOmitFunctionKeys<T> = Omit<
	T,
	{
		[K in keyof T]: T[K] extends (...args: unknown[]) => void ? K : never;
	}[keyof T]
>;

export const useHydratedStoreState = <
	T extends keyof TOmitFunctionKeys<TStoreState>,
>(
	key: T
): TOmitFunctionKeys<TStoreState>[T] | undefined => {
	const [store, setStore] = useState<TOmitFunctionKeys<TStoreState>[T]>();
	const storeState = useStoreState((state) => state[key]);

	useEffect(() => {
		setStore(storeState);
	}, [storeState]);
	return store;
};
export const useHydratedCartState = <
	T extends keyof TOmitFunctionKeys<TCartState>,
>(
	key: T
): TOmitFunctionKeys<TCartState>[T] | undefined => {
	const [cart, setCart] = useState<
		TOmitFunctionKeys<TCartState>[T] | undefined
	>();
	const cartState = useCartState((state) => state[key]);

	useEffect(() => {
		setCart(cartState);
	}, [cartState]);
	return cart;
};
