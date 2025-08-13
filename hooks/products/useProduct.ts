import {
	adminCancelReservation,
	cancelReservation,
	createProduct,
	deleteProduct,
	getAllProducts,
	getParticularProduct,
	// hideUserReservations,
	manualPurchaseHanlding,
	reserveProducts,
	updateMultipleProducts,
	updateProduct,
} from "@/queries/product";
import {
	AdminCancelReservationData,
	CancelReservationData,
	ManualOrderDataFormat,
	Product,
	ReserveProductData,
} from "@/types/product";
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
		mutationFn: (variables: { payload: Product; token: string }) => {
			return createProduct(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Producto creado exitosamente.",
			});
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Error al crear producto.",
				description: JSON.stringify(error),
			});
		},
	});
};

export const useUpdateProduct = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();
	return useMutation({
		mutationFn: (variables: { payload: Product; token: string }) => {
			return updateProduct(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Producto modificado exitosamente.",
			});
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Error al modificar producto.",
				description: JSON.stringify(error),
			});
		},
	});
};

export const useReserveMultipleProducts = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (variables: {
			payload: ReserveProductData[];
			token: string;
		}) => {
			return reserveProducts(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Error al reservar productos.",
				description: JSON.stringify(error),
			});
		},
	});
};

// export const useHideUserReservations = () => {
// 	const queryClient = useQueryClient();
// 	return useMutation({
// 		mutationFn: (userId: string) => hideUserReservations(userId),
// 		onSuccess: () => {
// 			queryClient.invalidateQueries();
// 		},
// 		onError,
// 	});
// };

export const useUpdateMultipleProducts = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (variables: { products: Product[]; token: string }) =>
			updateMultipleProducts(variables.products, variables.token),
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
		mutationFn: (variables: { payload: Product; token: string }) =>
			deleteProduct(variables.payload, variables.token),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Producto borrado exitosamente.",
			});
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Error al eliminar producto.",
				description: JSON.stringify(error),
			});
		},
	});
};

export const useCancelReservation = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (variables: {
			payload: CancelReservationData;
			token: string;
		}) => {
			return cancelReservation(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Error al cancelar reserva.",
				description: JSON.stringify(error),
			});
		},
	});
};

export const useAdminCancelReservation = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (variables: {
			payload: AdminCancelReservationData;
			token: string;
		}) => {
			return adminCancelReservation(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Error al cancelar reserva.",
				description: JSON.stringify(error),
			});
		},
	});
};

export const useManualPurchaseHanlding = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (variables: {
			payload: ManualOrderDataFormat;
			token: string;
		}) => {
			return manualPurchaseHanlding(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Error al gestionar la venta.",
				description: JSON.stringify(error),
			});
		},
	});
};
