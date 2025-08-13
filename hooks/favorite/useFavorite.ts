import { addFavorite, myFavorites, removeFavorite } from "@/queries/favorite";
import { Product } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useShowToast } from "../toast/useShowToast";

export const useAddFavorite = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();
	return useMutation({
		mutationFn: (variables: {
			payload: { productId: string };
			token: string;
		}) => {
			return addFavorite(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Producto agregado a favoritos exitosamente.",
			});
		},
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al agregar a favoritos",
				description: response.data.message,
			});
		},
	});
};

export const useRemoveFavorite = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (variables: {
			payload: { productId: string };
			token: string;
		}) => removeFavorite(variables.payload, variables.token),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Se ha quitado el producto de favoritos.",
			});
		},
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al eliminar de favoritos",
				description: response.data.message,
			});
		},
	});
};

export const useGetMyFavorites = () => {
	return useQuery<Product[]>({
		queryKey: ["getMyFavorites"],
		queryFn: () => myFavorites(),
		retry: 2,
	});
};
