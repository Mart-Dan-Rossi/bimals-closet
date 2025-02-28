import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getParticularProduct,
	updateProduct,
} from "@/queries/product";
import { Product } from "@/types/product";
import { onError } from "@/utils/error";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useShowToast } from "../toast/useShowToast";

export const useGetAllProducts = () => {
	return useQuery<Product[]>({
		queryKey: ["getAllProducts"],
		queryFn: () => getAllProducts(),
		retry: 2,
	});
};

export const useParticularProduct = (slug: string) => {
	return useQuery<Product>({
		queryKey: ["getParticularProduct", slug],
		queryFn: () => getParticularProduct(slug),
		retry: 2,
		enabled: !!slug,
	});
};

export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();
	return useMutation({
		mutationFn: (payload: Product) => {
			return createProduct(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Producto creado exitosamente.",
			});
		},
		onError,
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();
	return useMutation({
		mutationFn: (payload: Product) => {
			return updateProduct(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Producto modificado exitosamente.",
			});
		},
		onError,
	});
};

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (payload: Product) => deleteProduct(payload),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Producto borrado exitosamente.",
			});
		},
		onError,
	});
};
