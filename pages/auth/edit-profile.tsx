import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { useEditProfile } from "@/hooks/auth/useAuth";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { IFormLoginInput } from "@/types/auth";
import { Box, Icon, Image, Stack, Text, useBoolean } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { withAuth } from "../../components/templates/withAuth";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import PhoneInput from "react-phone-input-2";
import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";

const ResetPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [status, setStatus] = useBoolean();
	const [phoneInput, setPhoneInput] = useState("");
	const toast = useShowToast();
	const { mutateAsync, isLoading } = useEditProfile();
	const router = useRouter();

	const token = useHydratedStoreState("token");

	const storedUser = localStorage.getItem("MateoShoesUser");
	const user = storedUser && token ? JSON.parse(storedUser) : undefined;

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IFormLoginInput>();

	const onSubmit: SubmitHandler<IFormLoginInput> = async (data) => {
		const { fullName, phoneNumber, email, newPassword, passwordVerification } =
			data;

		if (newPassword !== passwordVerification) {
			return toast({
				status: "error",
				title:
					"Las contraseñas no coinciden. Por favor checkealo y vuelve a intentarlo.",
			});
		}

		const payload = {
			fullName,
			phoneNumber,
			email,
			newPassword,
			passwordVerification,
			userId: user?.id,
		};

		try {
			const res = await mutateAsync(payload);
			if (res?.status === "success") {
				setStatus.on();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
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
					bg={"brand.color1"}
					pos="relative"
					display={["none", "none", "flex"]}
				>
					<PreviousPageButton />
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
							color={"brand.color1"}
							as={IoMdCheckmarkCircle}
							mb="1rem"
						/>
					)}
					<Text
						fontWeight="600"
						fontSize={["3rem", "2.5rem", "2.5rem", "3rem"]}
						textAlign="center"
						px="4rem"
					>
						{!status ? "Editar perfil" : "Perfil editado exitosamente"}
					</Text>
					<Text
						fontWeight="500"
						fontSize={["1.4rem", "1.15rem", "1.15rem", "1.4rem"]}
						letterSpacing="0.05rem"
						textAlign="center"
						px="4rem"
					>
						{!status
							? "Introduce los nuevos datos."
							: "Felicitaciones! Tu perfil se cambió correctamente. Clickea el botón de debajo para conectarte nuevamente"}
					</Text>

					<Box
						as="form"
						w={["100%", "100%", "100%", "80%", "56%"]}
						px="4rem"
						onSubmit={handleSubmit(onSubmit)}
					>
						{!status && user && (
							<Fragment>
								<Box my="2rem">
									<CustomInput
										{...{
											id: "fullName",
											defaultValue: user.name,
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
											defaultValue: user.email,
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
											id: "passwordVerification",
											placeholder: "Confirmar contraseña",
											type: showConfirmPassword ? "text" : "password",
											formHook: register("passwordVerification", {
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

											errorMessage: errors.passwordVerification
												?.message as string,
										}}
									/>
								</Box>
							</Fragment>
						)}

						{!status ? (
							<CustomButton
								{...{
									text: "Confirmar edición",
									isLoading,
									isValidData: Object.keys(errors).length === 0,
									isSubmitButton: true,
								}}
							/>
						) : (
							<Box>
								<Box
									cursor="pointer"
									onClick={() => router.push("/auth/login")}
								>
									<CustomButton {...{ text: "Conectate" }} />
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default withAuth(ResetPassword);
