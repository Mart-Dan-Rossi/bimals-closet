import { AuthAxiosInstance, AxiosInstance } from "@/config";

export const addFavorite = async (
	payload: { productId: string },
	token: string
) => {
	const { data } = await AxiosInstance.post("api/favorite/add", payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data;
};

export const removeFavorite = async (
	payload: { productId: string },
	token: string
) => {
	const { data } = await AxiosInstance.post("api/favorite/remove", payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return data;
};

export const myFavorites = async () => {
	const { data } = await AuthAxiosInstance.get("api/favorite/my-favorites");

	return data;
};
