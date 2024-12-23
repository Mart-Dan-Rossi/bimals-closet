import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { useResetPassword } from "@/hooks/auth/useAuth";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { IFormLoginInput } from "@/types/auth";
import { Box, Icon, Image, Stack, Text, useBoolean } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";
import withAuth from "../withAuth";

const ResetPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [status, setStatus] = useBoolean();
	const toast = useShowToast();
	const { mutateAsync, isLoading } = useResetPassword();
	const router = useRouter();
	const { code } = router.query;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormLoginInput>();

	const onSubmit: SubmitHandler<IFormLoginInput> = async (data) => {
		const { newPassword, confirmPassword } = data;

		if (newPassword !== confirmPassword) {
			return toast({
				status: "error",
				title:
					"Las contraseñas no coinciden. Por favor checkealo y vuelve a intentarlo.",
			});
		}

		const payload = {
			newPassword,
			resetToken: code,
		};

		try {
			const res = await mutateAsync(payload);
			if (res?.status === "success") {
				setStatus.on();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log("error", error);

				toast({
					status: "error",
					title:
						error?.response?.data?.message ||
						"Ocurrió un error. Intenta nuevamente luego",
				});
			}
		}
	};

	return (
		<Box>
			<Stack spacing="0" direction={["column", "column", "row"]}>
				<Box
					h="100vh"
					w={["100%", "100%", "50%"]}
					p="2rem"
					bg="brand.color1"
					pos="relative"
					display={["none", "none", "flex"]}
				>
					<Image
						w="460px"
						pos="absolute"
						right="-14px"
						top="102px"
						src="/assets/images/login-bg-one.png"
						alt="Fondo de Login"
					/>
					<Image
						w="300px"
						pos="absolute"
						left="0"
						bottom="0"
						src="/assets/images/login-bg-two.png"
						alt="Fondo de Login"
					/>
				</Box>

				<Box
					h={["90vh", "100vh"]}
					w={["100%", "100%", "50%"]}
					bg={["#fff"]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDir="column"
					ms="0rem"
				>
					{status && (
						<Icon
							fontSize="4rem"
							color="brand.color1"
							as={IoMdCheckmarkCircle}
							mb="1rem"
						/>
					)}
					<Text
						color="brand.secondaryColor1"
						fontWeight="600"
						fontSize={["3rem", "2.5rem", "2.5rem", "3rem"]}
						textAlign="center"
						px="4rem"
					>
						{!status ? "Reset Password" : "Password Reset Successful"}
					</Text>
					<Text
						color="brand.secondaryColor1"
						fontWeight="500"
						fontSize={["1.4rem", "1.15rem", "1.15rem", "1.4rem"]}
						letterSpacing="0.05rem"
						textAlign="center"
						px="4rem"
					>
						{!status
							? "Buen trabajo, clickeaste el link para cambiar tu contraseña. introduce la contraseña nueva."
							: "Felicitaciones! Tu contraseña se cambió correctamente. Tienes una nueva contraseña. Clickea el botón de debajo para conectarte"}
					</Text>

					<Box
						as="form"
						w={["100%", "100%", "100%", "80%", "56%"]}
						px="4rem"
						onSubmit={handleSubmit(onSubmit)}
					>
						{!status && (
							<Fragment>
								<Box my="2rem">
									<CustomInput
										{...{
											id: "newPassword",
											placeholder: "Nueva contraseña",
											type: showPassword ? "text" : "password",
											formHook: register("newPassword", {
												required: "Por favor introduce tu nueva contraseña",
												pattern: {
													value: /^(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/,
													message:
														"La contraseña debe tener al menos ocho caracteres, una mayúscula y un número. Los espacios no están permitidos.",
												},
											}),
											handlePasswordClick: () => setShowPassword(!showPassword),
											passwordIcon: (
												<Box onClick={() => setShowPassword(!showPassword)}>
													{showPassword ? (
														<AiOutlineEye />
													) : (
														<AiOutlineEyeInvisible />
													)}
												</Box>
											),

											errorMessage: errors.newPassword?.message as string,
										}}
									/>
								</Box>

								<Box my="2rem">
									<CustomInput
										{...{
											id: "confirmPassword",
											placeholder: "Confirmar contraseña",
											type: showConfirmPassword ? "text" : "password",
											formHook: register("confirmPassword", {
												required: "Por favor confirma tu contraseña",
												pattern: {
													value: /^(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/,
													message:
														"La contraseña debe tener al menos ocho caracteres, una mayúscula y un número. Los espacios no están permitidos.",
												},
											}),
											handlePasswordClick: () =>
												setShowConfirmPassword(!showConfirmPassword),
											passwordIcon: (
												<Box
													onClick={() =>
														setShowConfirmPassword(!showConfirmPassword)
													}
												>
													{showConfirmPassword ? (
														<AiOutlineEye />
													) : (
														<AiOutlineEyeInvisible />
													)}
												</Box>
											),

											errorMessage: errors.confirmPassword?.message as string,
										}}
									/>
								</Box>
							</Fragment>
						)}

						{!status ? (
							<CustomButton {...{ text: "Cambiar contraseña", isLoading }} />
						) : (
							<Box>
								<Link href="/auth/login">
									<CustomButton {...{ text: "Conectate" }} />
								</Link>
							</Box>
						)}
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default withAuth(ResetPassword);
