import { AxiosInstance } from "@/config";
import { OrderDataMPFormat } from "@/types/order";

export const createMPOrder = async (payload: OrderDataMPFormat) => {
	try {
		const { data } = await AxiosInstance.post(
			"/api/order/create-order",
			payload
		);
		return data;
	} catch (err) {
		console.log("Error:", err);
	}
};
