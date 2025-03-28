import {
	createBEOrder,
	getAllBEOrders,
	updateBEOrder,
} from "@/queries/beOrder";
import { OrderDataBEFormat } from "@/types/order";
import { onError } from "@/utils/error";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useShowToast } from "../toast/useShowToast";

export const useCreateBEOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: OrderDataBEFormat) => {
			return createBEOrder(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError,
	});
};

export const useUpdateBEOrder = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();
	return useMutation({
		mutationFn: (payload: OrderDataBEFormat) => {
			return updateBEOrder(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Órden modificada exitosamente.",
			});
		},
		onError,
	});
};

export const useGetAllBEOrders = () => {
	return useQuery<OrderDataBEFormat[]>({
		queryKey: ["getAllBEOrders"],
		queryFn: () => getAllBEOrders(),
		retry: 2,
	});
};
