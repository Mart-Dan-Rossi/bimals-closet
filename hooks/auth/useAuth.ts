import { useMutation, useQuery, useQueryClient } from "react-query";
import { useShowToast } from "../toast/useShowToast";
import { onError } from "@/utils/error";
import {
	forgotPassword,
	getUser,
	loginUser,
	registerUser,
	resetPassword,
	verifyEmailToken,
} from "@/queries/auth";
import { IFormLoginInput, IFormRegisterInput, UserData } from "@/types/auth";
import { useRouter } from "next/router";

export const useGetUser = (userId: string) => {
	return useQuery<UserData>({
		queryKey: ["getUser", userId],
		queryFn: () => getUser(userId),
		retry: 2,
		enabled: !!userId,
	});
};

export const useLoginUser = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();
	const router = useRouter();

	return useMutation({
		mutationFn: (payload: IFormLoginInput) => loginUser(payload),
		onSuccess: () => {
			queryClient.invalidateQueries();
			router.push("/");
			toast({
				status: "success",
				title: "Logueado exitosamente",
			});
		},
		onError,
	});
};

export const useRegisterUser = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (payload: IFormRegisterInput) => registerUser(payload),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Te has registrado con éxito",
			});
		},
		onError,
	});
};

export const useForgotPassword = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (payload: IFormLoginInput) => forgotPassword(payload),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title:
					"Un email de cambio de contraseña ha sido enviado exitosamente. Por favor, revisa tu bandeja de entrada para más instrucciones",
			});
		},
		onError,
	});
};

export const useResetPassword = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (payload: IFormLoginInput) => resetPassword(payload),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Contraseña cambiada exitosamente!",
			});
		},
		onError,
	});
};

export const useVerifyEmailToken = (verificationToken: string) => {
	const toast = useShowToast();

	return useQuery({
		queryKey: ["verifyEmailToken"],
		queryFn: () => verifyEmailToken(verificationToken),
		retry: 2,
		enabled: !!verificationToken,
		onError: ({ response }) => {
			toast({
				status: "error",
				title: response.data.message,
			});
		},
	});
};
