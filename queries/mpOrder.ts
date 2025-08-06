import { AxiosInstance } from "@/config";
import { OrderDataMPFormat } from "@/types/order";

export const createMPOrder = async (
	payload: OrderDataMPFormat,
	token: string
) => {
	try {
		const { data } = await AxiosInstance.post(
			"/api/order/create-order",
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (err) {
		console.log("Error:", err);
	}
};
