import { AxiosInstance } from "@/config";
import {
	CancelReservationData,
	ManualOrderDataFormat,
	Product,
	ReserveProductData,
} from "@/types/product";

export const getAllProducts = async (): Promise<Product[]> => {
	const { data } = await AxiosInstance.get("/api/products");

	return data.data.products;
};

export const getParticularProduct = async (slug: string): Promise<Product> => {
	const { data } = await AxiosInstance.get(`/api/products/${slug}`);

	return data.data.product;
};

export const createProduct = async (payload: Product, token: string) => {
	const { data } = await AxiosInstance.post("/api/products/add", payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data;
};

export const updateProduct = async (payload: Product, token: string) => {
	const { data } = await AxiosInstance.post("/api/products/update", payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data;
};

export const updateMultipleProducts = async (
	products: Product[],
	token: string
) => {
	const { data } = await AxiosInstance.post(
		"/api/products/update-multiple",
		{
			products,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return data;
};

export const reserveProducts = async (
	payload: ReserveProductData[],
	token: string
) => {
	const { data } = await AxiosInstance.post(
		"/api/products/reserveProducts",
		payload,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return data;
};

// export const hideUserReservations = async (userId: string) => {
// 	const { data } = await AxiosInstance.post(
// 		"/api/products/hideUserReservations",
// 		{ userId }
// 	);

// 	return data;
// };

export const deleteProduct = async (payload: Product, token: string) => {
	const { data } = await AxiosInstance.post("api/products/remove", payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data;
};

export const cancelReservation = async (
	payload: CancelReservationData,
	token: string
) => {
	const { data } = await AxiosInstance.post(
		"/api/products/cancelReservation",
		payload,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return data;
};

export const adminCancelReservation = async (
	payload: CancelReservationData,
	token: string
) => {
	const { data } = await AxiosInstance.post(
		"/api/products/adminCancelReservation",
		payload,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return data;
};

export const manualPurchaseHanlding = async (
	payload: ManualOrderDataFormat,
	token: string
) => {
	const { data } = await AxiosInstance.post(
		"/api/products/manualPurchaseHanlding",
		payload,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return data;
};
