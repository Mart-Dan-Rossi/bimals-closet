import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { useLoginUser } from "@/hooks/auth/useAuth";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { IFormLoginInput } from "@/types/auth";
import { Box, Flex, Image, Stack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useRouter } from "next/router";
import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";
import { useStoreState } from "@/hooks/state/storage";
import { useRouter } from "next/router";
import { BasketBall } from "../../public/assets/images/BasketBall";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	// const router = useRouter();
	const toast = useShowToast();
	const { mutateAsync, isLoading } = useLoginUser();
	const { setToken } = useStoreState((state) => state);

	const [passwordPatternError, setPasswordPatternError] = useState<
		string | null
	>(null);

	const [mailError, setMailError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormLoginInput>();

	const router = useRouter();

	const onSubmit: SubmitHandler<IFormLoginInput> = async (data) => {
		try {
			setMailError(null);
			setPasswordPatternError(null);

			const res = await mutateAsync(data);
			setToken(res?.data?.token);
			localStorage.setItem(
				"MateoShoesUser",
				JSON.stringify({
					name: res?.data?.user?.fullName,
					id: res?.data?.user?._id,
					email: res?.data?.user?.email,
				})
			);
			router.push("/");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/;
				if (error.response?.data.message.includes("Usuario no encontrado")) {
					setMailError(
						"Usuario no encontrado. No hay cuenta asociada a este mail."
					);

					if (data.password && !passwordRegex.test(data.password)) {
						setPasswordPatternError(
							"La contraseña debe tener un mínimo de ocho caracteres, al menos una mayúscula, un número y una minúscula. Los espacios no están permitidos."
						);
					}
				} else {
					if (data.password && !passwordRegex.test(data.password)) {
						setPasswordPatternError(
							"La contraseña debe tener un mínimo de ocho caracteres, al menos una mayúscula, un número y una minúscula. Los espacios no están permitidos."
						);
					} else {
						toast({
							status: "error",
							title:
								error?.response?.data?.message ||
								"Ocurrió un error, intenta de nuevo luego",
						});
					}
				}
			}
		}
	};

	return (
		<Box>
			<Stack spacing="0" direction={["column", "column", "row"]}>
				<VStack
					h="100vh"
					w={["100%", "100%", "50%"]}
					p="2rem"
					bg={"brand.dark200"}
					pos="relative"
					display={["none", "none", "flex"]}
					alignItems={"flex-start"}
					justifyContent={"flex-start"}
				>
					<Box color={"brand.white100"}>
						<Box cursor={"pointer"} onClick={() => router.push("/")}>
							<Text fontWeight="700" fontSize={["1.8rem", "2.5rem"]}>
								Mateo Shoes
							</Text>
						</Box>
					</Box>

					<PreviousPageButton color="brand.white100" />

					<Flex justify={"flex-end"} w={"90%"}>
						<BasketBall />
					</Flex>

					<Image
						w="300px"
						pos="absolute"
						left="0"
						bottom="0"
						src="/assets/images/login-bg-two.png"
						alt="Fondo del Login 2"
					/>
				</VStack>

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
					<Text
						fontWeight="600"
						fontSize={["3rem", "2.5rem", "2.5rem", "3rem"]}
					>
						Logueate
					</Text>
					<Text
						fontWeight="500"
						fontSize={["1.4rem", "1.15rem", "1.15rem", "1.4rem"]}
						letterSpacing="0.05rem"
					>
						Te damos la bienvenida nuevamente. Te extrañamos!
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
									id: "email",
									placeholder: "Email",
									type: "text",
									formHook: register("email", {
										required: "Por favor introduce tu mail",
									}),
									errorMessage:
										(errors.email?.message as string) || mailError || "",
								}}
							/>
						</Box>

						<Box my="2rem">
							<CustomInput
								{...{
									id: "password",
									placeholder: "Contraseña",
									type: showPassword ? "text" : "password",
									formHook: register("password", {
										required: "Introduce la contraseña",
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

									errorMessage:
										(errors.password?.message as string) ||
										passwordPatternError ||
										"",
								}}
							/>
						</Box>

						{/* <Box
							cursor="pointer"
							onClick={() => router.push("/auth/forgot-password")}
						>
							<Text
								textDecoration="underline"
								mt=".5rem"
								color={"brand.secondaryColor2"}
								fontWeight="500"
								fontSize="1.2rem"
								float="right"
							>
								Olvidate la contraseña?
							</Text>
						</Box> */}

						<CustomButton
							{...{
								text: "Loguear",
								isLoading,
								isValidData: true,
								isSubmitButton: true,
							}}
						/>

						<Box>
							<Box
								cursor="pointer"
								onClick={() => router.push("/auth/register")}
							>
								<Text
									mt=".7rem"
									color={"brand.secondaryColor2"}
									fontWeight="500"
									fontSize="1.3rem"
								>
									No tienes cuenta?
									<span style={{ color: "#00AF54" }}> Registrate</span>
								</Text>
							</Box>
						</Box>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default Login;
