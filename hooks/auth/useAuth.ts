import {
	forgotPassword,
	getUser,
	loginUser,
	registerUser,
	editProfile,
	verifyEmailToken,
} from "@/queries/auth";
import { IFormLoginInput, IFormRegisterInput, UserData } from "@/types/auth";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useShowToast } from "../toast/useShowToast";

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
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al loguear",
				description: response.data.message,
			});
		},
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
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al registrar usuario",
				description: response.data.message,
			});
		},
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
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al verificar el pasword",
				description: response.data.message,
			});
		},
	});
};

export const useEditProfile = () => {
	const queryClient = useQueryClient();
	const toast = useShowToast();

	return useMutation({
		mutationFn: (payload: IFormLoginInput) => editProfile(payload),
		onSuccess: () => {
			queryClient.invalidateQueries();
			toast({
				status: "success",
				title: "Contraseña cambiada exitosamente!",
			});
		},
		onError: ({ response }) => {
			toast({
				status: "error",
				title: "Error al editar el perfil",
				description: response.data.message,
			});
		},
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
				title: "Error al verificar el email",
				description: response.data.message,
			});
		},
	});
};
