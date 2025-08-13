import {
	adminDeleteBEOrder,
	adminUpdateBEOrder,
	// createBEOrder,
	getAllBEOrders,
} from "@/queries/beOrder";
import { OrderDataBEFormat } from "@/types/order";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useShowToast } from "../toast/useShowToast";

// export const useCreateBEOrder = () => {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: (payload: OrderDataBEFormat) => {
// 			return createBEOrder(payload);
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries();
// 		},
// 		onError,
// 	});
// };

export const useAdminUpdateBEOrder = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();
	return useMutation({
		mutationFn: (variables: { payload: OrderDataBEFormat; token: string }) => {
			return adminUpdateBEOrder(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Órden modificada exitosamente.",
			});
		},
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al actualizar la orden",
				description: response.data.message,
			});
		},
	});
};

export const useGetAllBEOrders = () => {
	return useQuery<OrderDataBEFormat[]>({
		queryKey: ["getAllBEOrders"],
		queryFn: () => getAllBEOrders(),
		retry: 2,
	});
};

export const useAdminDeleteBEOrder = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();
	return useMutation({
		mutationFn: (variables: { payload: OrderDataBEFormat; token: string }) => {
			return adminDeleteBEOrder(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Órden eliminada exitosamente.",
			});
		},
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al eliminar la orden",
				description: response.data.message,
			});
		},
	});
};
