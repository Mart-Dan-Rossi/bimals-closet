import { createMPOrder } from "@/queries/mpOrder";
import { OrderDataMPFormat } from "@/types/order";
import { useMutation, useQueryClient } from "react-query";
import { useShowToast } from "../toast/useShowToast";

export const useCreateMPOrder = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (variables: { payload: OrderDataMPFormat; token: string }) => {
			return createMPOrder(variables.payload, variables.token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al verificar el email",
				description: response.data.message,
			});
		},
	});
};
