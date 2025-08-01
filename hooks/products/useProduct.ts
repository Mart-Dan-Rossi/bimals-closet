import {
	cancelReservation,
	createProduct,
	deleteProduct,
	getAllProducts,
	getParticularProduct,
	hideUserReservations,
	manualPurchaseHanlding,
	reserveProducts,
	updateMultipleProducts,
	updateProduct,
} from "@/queries/product";
import {
	CancelReservationData,
	ManualOrderDataFormat,
	Product,
	ReserveProductData,
} from "@/types/product";
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

export const useReserveMultipleProducts = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: ReserveProductData[]) => {
			return reserveProducts(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError,
	});
};

export const useHideUserReservations = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (userId: string) => hideUserReservations(userId),
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError,
	});
};

export const useUpdateMultipleProducts = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (products: Product[]) => updateMultipleProducts(products),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Productos modificados exitosamente.",
			});
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Error al actualizar los productos.",
				description: JSON.stringify(error),
			});
		},
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

export const useCancelReservation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: CancelReservationData) => {
			return cancelReservation(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError,
	});
};

export const useManualPurchaseHanlding = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: ManualOrderDataFormat) => {
			return manualPurchaseHanlding(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError,
	});
};
