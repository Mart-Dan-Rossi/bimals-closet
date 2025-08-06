import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { useRegisterUser } from "@/hooks/auth/useAuth";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { IFormRegisterInput } from "@/types/auth";
import axios from "axios";
import { useRouter } from "next/router";
import { withAuth } from "../../components/templates/withAuth";
import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";

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
					router.push("/auth/login");
				});
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast({
					status: "error",
					title:
						error?.response?.data?.error.message ||
						"Ha ocurrido un error! Intenta nuevamente más tarde",
				});
			}
		}
	};

	return (
		<Box>
			<Stack spacing="0" direction={["column", "column", "row"]}>
				<Box
					w={["100%", "100%", "50%"]}
					bg={"brand.color1"}
					p="2rem"
					display={["none", "none", "flex"]}
					flexDir="column"
					justifyContent="space-between"
				>
					<PreviousPageButton />
					<Box>
						<Image
							w="100%"
							src="/assets/images/register-bg.png"
							alt="Fondo de 'regístrate'"
						/>
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
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: "Formato de mail inválido",
										},
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
											onlyCountries={["ar"]}
											disableDropdown
											value={phoneInput}
											autoFormat={true}
											onChange={(e) => {
												setPhoneInput(e);
												field.onChange(e);
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
									color={"brand.red100"}
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
							<Text fontSize="lg" as="i">
								* La contraseña debe tener un mínimo de ocho caracteres, al
								menos una mayúscula, un número y una minúscula. Los espacios no
								están permitidos *
							</Text>
						</Box>
						<Box my="2rem">
							<CustomInput
								{...{
									id: "passwordVerification",
									repeatInput: true,
									placeholder: "Repita contraseña",
									type: showPassword ? "text" : "password",
									formHook: register("passwordVerification", {
										required: "Por favor introduce la contraseña",
										pattern: {
											value: /^(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/,
											message: "Debe coincidir con la contraseña",
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

						<CustomButton
							{...{
								text: "Crear cuenta",
								isLoading,
								isValidData: Object.keys(errors).length === 0,
								isSubmitButton: true,
							}}
						/>

						<Box>
							<Box cursor="pointer" onClick={() => router.push("/auth/login")}>
								<Text
									mt=".7rem"
									color={"brand.seconda	ryColor2"}
									fontWeight="500"
									fontSize="1.3rem"
								>
									Ya tienes una cuenta?
									<span style={{ color: "#00AF54" }}> Logueate</span>
								</Text>
							</Box>
						</Box>

						<Box
							position="absolute"
							bottom="2rem"
							left="2rem"
							display={["block", "none"]}
						>
							<Text
								color={"brand.color1"}
								fontWeight="600"
								textAlign="left"
								fontSize="1.5rem"
							>
								Paso 1 de 3
							</Text>
						</Box>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default withAuth(Register);
