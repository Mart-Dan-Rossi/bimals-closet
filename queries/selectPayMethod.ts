import { AxiosInstance } from "@/config";
import { SelectPayMethodProps } from "@/types/selectPayMethod";

export const selectPayMethod = async (payload: SelectPayMethodProps) => {
	const { data } = await AxiosInstance.post("/api/create_preference", payload);

	return data;
};
