import { AxiosInstance } from "@/config";
import { OrderDataBEFormat } from "@/types/order";

export const createBEOrder = async (payload: OrderDataBEFormat) => {
	const { data } = await AxiosInstance.post("/api/order/add", payload);

	return data;
};

export const updateBEOrder = async (payload: OrderDataBEFormat) => {
	const { data } = await AxiosInstance.post("/api/order/update", payload);

	return data;
};

export const getAllBEOrders = async (): Promise<OrderDataBEFormat[]> => {
	const { data } = await AxiosInstance.get("/api/order");

	return data.data.orders;
};
