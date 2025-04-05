import { useShowToast } from "../toast/useShowToast";
import { useRouter } from "next/router";
import { useHydratedStoreState } from "../state/hydrated";
import { ErrorResponse } from "@/types/error";
import { useAddFavorite, useRemoveFavorite } from "./useFavorite";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useGlobalContext } from "@/context/GlobalContext";

export const useToggleFavorite = (mapProducts: Product[] | Product) => {
	const token = useHydratedStoreState("token");
	const router = useRouter();
	const toast = useShowToast();
	const { mutateAsync: addMutateAsync } = useAddFavorite();
	const { mutateAsync: removeMutateAsync } = useRemoveFavorite();
	const [userId, setUserId] = useState("");

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : null;
		const id = user ? user.id : null;

		setUserId(id);
	}, [userId, token]);

	const isProductChecked = (productId: string) => {
		const productsArray = Array.isArray(mapProducts)
			? mapProducts
			: [mapProducts];
		const isChecked = productsArray?.some(
			(item) => item?._id === productId && item.isFavorite
		);
		return isChecked;
	};

	const toggleProductChecked = async (productId: string) => {
		if (!token) {
			toast({
				status: "error",
				title: "Debes estar logueado para usar esta función.",
			});
			setTimeout(() => {
				router.push("/auth/login");
			}, 1000);
			return;
		}

		const data = {
			userId,
			productId,
		};

		try {
			if (isProductChecked(productId)) {
				await removeMutateAsync(data);
			} else {
				await addMutateAsync(data);
			}
		} catch (error) {
			const responseData = (error as ErrorResponse).response?.data;
			toast({
				status: "error",
				title: responseData?.error,
			});
		}
	};

	return {
		toggleProductChecked,
		isProductChecked,
	};
};
