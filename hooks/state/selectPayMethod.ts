import { useMutation, useQueryClient } from "react-query";
import { useShowToast } from "../toast/useShowToast";
import { selectPayMethod } from "@/queries/selectPayMethod";
import { SelectPayMethodProps } from "@/types/selectPayMethod";
import { onError } from "@/utils/error";

export const useSelectPayMethod = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (payload: SelectPayMethodProps) => selectPayMethod(payload),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Te has registrado con éxito",
			});
		},
		onError,
	});
};
