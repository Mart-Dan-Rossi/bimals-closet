import { AxiosInstance } from "@/config";
import { Product } from "@/types/product";

export const getAllProducts = async (): Promise<Product[]> => {
	const { data } = await AxiosInstance.get("/api/products");

	return data.data.products;
};

export const getParticularProduct = async (slug: string): Promise<Product> => {
	const { data } = await AxiosInstance.get(`/api/products/${slug}`);

	return data;
};
