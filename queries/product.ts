import { AxiosInstance } from "@/config";
import { Product, ReserveProductData } from "@/types/product";

export const getAllProducts = async (): Promise<Product[]> => {
	const { data } = await AxiosInstance.get("/api/products");

	return data.data.products;
};

export const getParticularProduct = async (slug: string): Promise<Product> => {
	const { data } = await AxiosInstance.get(`/api/products/${slug}`);

	return data.data.product;
};

export const createProduct = async (payload: Product) => {
	const { data } = await AxiosInstance.post("/api/products/add", payload);

	return data;
};

export const updateProduct = async (payload: Product) => {
	const { data } = await AxiosInstance.post("/api/products/update", payload);

	return data;
};

export const reserveProducts = async (payload: ReserveProductData[]) => {
	const { data } = await AxiosInstance.post(
		"/api/products/reserveProducts",
		payload
	);

	return data;
};

export const updateMultipleProducts = async (products: Product[]) => {
	const { data } = await AxiosInstance.post("/api/products/update-multiple", {
		products,
	});

	return data;
};

export const deleteProduct = async (payload: Product) => {
	const { data } = await AxiosInstance.delete("api/products/remove", {
		data: payload,
	});

	return data;
};
