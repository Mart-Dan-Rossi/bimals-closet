import { AuthAxiosInstance, AxiosInstance } from "@/config";
import { FavoriteProps } from "@/types/favorite";

export const addFavorite = async (payload: FavoriteProps) => {
	const { data } = await AxiosInstance.post("api/favorite/add", payload);

	return data;
};

export const removeFavorite = async (payload: FavoriteProps) => {
	const { data } = await AxiosInstance.delete("api/favorite/remove", {
		data: payload,
	});

	return data;
};

export const myFavorites = async () => {
	const { data } = await AuthAxiosInstance.get("api/favorite/my-favorites");

	return data;
};
