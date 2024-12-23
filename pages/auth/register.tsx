import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import axios from "axios";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { useRegisterUser } from "@/hooks/auth/useAuth";
import { IFormRegisterInput } from "@/types/auth";
import Link from "next/link";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useRouter } from "next/router";
import withAuth from "../withAuth";

const Register = () => {
	const [phoneInput, setPhoneInput] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const toast = useShowToast();
	const { mutateAsync, isLoading } = useRegisterUser();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFormRegisterInput>();

	const onSubmit: SubmitHandler<IFormRegisterInput> = async (data) => {
		try {
			const res = await mutateAsync(data);

			if (res?.status === "success") {
				setTimeout(() => {
					router.push({
						pathname: "/auth/verify-email",
						query: { email: res?.data?.email },
					});
				}, 1500);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast({
					status: "error",
					title:
						error?.response?.data?.message ||
						"Ha ocurrido un error! Intenta nuevamente más tarde",
				});
			}
		}
	};

	return (
		<Box>
			<Stack spacing="0" direction={["column", "column", "row"]}>
				<Box
					// h="100vh"
					w={["100%", "100%", "50%"]}
					bg="brand.color1"
					p="2rem"
					// display="flex"
					display={["none", "none", "flex"]}
					flexDir="column"
					justifyContent="space-between"
				>
					<Box>
						<Image
							w="100%"
							src="/assets/images/register-bg.png"
							alt="Fondo de 'regístrate'"
						/>
					</Box>
					<Box>
						<Text
							color="#fff"
							pl=".6rem"
							fontWeight="600"
							textAlign="left"
							fontSize="1.5rem"
						>
							Paso 1 de 3
						</Text>
					</Box>
				</Box>

				<Box
					h={["90vh", "100vh"]}
					w={["100%", "100%", "50%"]}
					bg="#fff"
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDir="column"
				>
					<Text
						color="brand.secondaryColor1"
						fontWeight="600"
						fontSize={["3rem", "2.5rem", "2.5rem", "3rem"]}
					>
						Crear cuenta
					</Text>

					<Box
						as="form"
						w={["100%", "100%", "100%", "80%", "56%"]}
						px="4rem"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Box my="2rem">
							<CustomInput
								{...{
									id: "fullName",
									placeholder: "Nombre completo",
									type: "text",
									formHook: register("fullName", {
										required: "Por favor introduce tu nombre completo",
									}),
									errorMessage: errors.fullName?.message as string,
								}}
							/>
						</Box>

						<Box my="2rem">
							<CustomInput
								{...{
									id: "email",
									placeholder: "Mail",
									type: "text",
									formHook: register("email", {
										required: "Por favor introduce tu mail",
									}),
									errorMessage: errors.email?.message as string,
								}}
							/>
						</Box>

						<Box my="2rem">
							<Controller
								name="phoneNumber"
								control={control}
								rules={{
									required: "Por favor introduce tu número de teléfono",
								}}
								render={({ field }) => {
									return (
										<PhoneInput
											country="ar"
											value={phoneInput}
											autoFormat={true}
											onChange={(e) => {
												setPhoneInput(e);
												field.onChange(Number(e));
											}}
											inputClass="phone-input"
											inputProps={{
												id: "phoneNumber",
												placeholder: "Número de teléfono",
												required: true,
											}}
											inputStyle={{
												border: "1px solid #EAEAEA",
												paddingLeft: "5rem",
												borderRadius: "1rem",
												cursor: "pointer",
												margin: "2rem 0",
												padding: "2rem 3rem 2rem 4.5rem",
												width: "100%",
												fontSize: "1.6rem",
											}}
										/>
									);
								}}
							/>
							{errors.phoneNumber && (
								<Text
									color="brand.red100"
									fontSize="1.1rem"
									fontWeight="300"
									mt=".5rem"
								>
									{errors.phoneNumber.message}
								</Text>
							)}
						</Box>

						<Box my="2rem">
							<CustomInput
								{...{
									id: "password",
									repeatInput: true,
									placeholder: "Contraseña",
									type: showPassword ? "text" : "password",
									formHook: register("password", {
										required: "Por favor introduce la contraseña",
										pattern: {
											value: /^(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/,
											message:
												"La contraseña debe tener un mínimo de ocho caracteres, al menos una mayúscula, un número y una minúscula. Los espacios no están permitidos.",
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

									errorMessage: errors.password?.message as string,
								}}
							/>
						</Box>

						<CustomButton {...{ text: "Crear cuenta", isLoading }} />

						<Box>
							<Link href="/auth/login">
								<Text
									mt=".7rem"
									color="brand.secondaryColor2"
									fontWeight="500"
									fontSize="1.3rem"
								>
									Ya tienes una contraseña?
									<span style={{ color: "#00AF54" }}> Logueate</span>
								</Text>
							</Link>
						</Box>

						<Box
							position="absolute"
							bottom="2rem"
							left="2rem"
							display={["block", "none"]}
						>
							<Text
								color="brand.color1"
								fontWeight="600"
								textAlign="left"
								fontSize="1.5rem"
							>
								Paseo 1 de 3
							</Text>
						</Box>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default withAuth(Register);
