import { AxiosInstance } from "@/config";
import { IFormLoginInput, IFormRegisterInput } from "@/types/auth";

export const loginUser = async (payload: IFormLoginInput) => {
	const { data } = await AxiosInstance.post("/api/users/login", payload);

	return data;
};

export const registerUser = async (payload: IFormRegisterInput) => {
	const { data } = await AxiosInstance.post("/api/users/register", payload);

	return data;
};

export const forgotPassword = async (payload: IFormLoginInput) => {
	const { data } = await AxiosInstance.post(
		"/api/users/forgot-password",
		payload
	);

	return data;
};

export const resetPassword = async (payload: IFormLoginInput) => {
	const { data } = await AxiosInstance.post(
		"/api/users/reset-password",
		payload
	);

	return data;
};

export const verifyEmailToken = async (verificationToken: string) => {
	const { data } = await AxiosInstance.get(
		`/api/users/verify/${verificationToken}`
	);

	return data;
};
