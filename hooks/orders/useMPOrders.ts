import { createMPOrder } from "@/queries/mpOrder";
import { OrderDataMPFormat } from "@/types/order";
import { onError } from "@/utils/error";
import { useMutation, useQueryClient } from "react-query";

export const useCreateMPOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: OrderDataMPFormat) => {
			return createMPOrder(payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries();
		},
		onError,
	});
};
