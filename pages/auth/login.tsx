import { Box, Stack, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { useLoginUser } from "@/hooks/auth/useAuth";
import Link from "next/link";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { IFormLoginInput } from "@/types/auth";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useRouter } from "next/router";
import withAuth from "../withAuth";
import { useStoreState } from "@/hooks/state/storage";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const toast = useShowToast();
	const { mutateAsync, isLoading } = useLoginUser();
	const { setToken } = useStoreState((state) => state);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormLoginInput>();

	const onSubmit: SubmitHandler<IFormLoginInput> = async (data) => {
		try {
			const res = await mutateAsync(data);
			setTimeout(() => {
				setToken(res?.data?.token);
				sessionStorage.setItem(
					"user",
					JSON.stringify({
						name: res?.data?.user?.fullName,
						id: res?.data?.user?._id,
						email: res?.data?.user?.email,
					})
				);

				router.push("/");
			}, 50);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast({
					status: "error",
					title:
						error?.response?.data?.message ||
						"Erorr occurred! Please try again later",
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
					<Box color="brand.white100">
						<Link href="/">
							<Text fontWeight="700" fontSize={["1.8rem", "2.5rem"]}>
								Mateo Shoes
							</Text>
						</Link>
					</Box>
					<Image
						w="460px"
						pos="absolute"
						right="-14px"
						top="102px"
						src="/assets/images/login-bg-one.png"
						alt="Fondo del Login"
					/>
					<Image
						w="300px"
						pos="absolute"
						left="0"
						bottom="0"
						src="/assets/images/login-bg-two.png"
						alt="Fondo del Login"
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
					<Text
						color="brand.secondaryColor1"
						fontWeight="600"
						fontSize={["3rem", "2.5rem", "2.5rem", "3rem"]}
					>
						Logueate
					</Text>
					<Text
						color="brand.secondaryColor1"
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
										required: "Please enter your email",
									}),
									errorMessage: errors.email?.message as string,
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

						<Link href="/auth/forgot-password">
							<Text
								textDecoration="underline"
								mt=".5rem"
								color="brand.secondaryColor2"
								fontWeight="500"
								fontSize="1.2rem"
								float="right"
							>
								Olvidate la contraseña?
							</Text>
						</Link>

						<CustomButton {...{ text: "Loguear", isLoading }} />

						<Box>
							<Link href="/auth/register">
								<Text
									mt=".7rem"
									color="brand.secondaryColor2"
									fontWeight="500"
									fontSize="1.3rem"
								>
									No tienes cuenta?
									<span style={{ color: "#00AF54" }}> Registrate</span>
								</Text>
							</Link>
						</Box>
					</Box>
				</Box>
			</Stack>
		</Box>
	);
};

export default withAuth(Login);
