import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { useForgotPassword } from "@/hooks/auth/useAuth";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { IFormLoginInput } from "@/types/auth";
import { Box, Icon, Image, Stack, Text, useBoolean } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdCheckmarkCircle } from "react-icons/io";
import withAuth from "../withAuth";

const ForgotPassword = () => {
	const [status, setStatus] = useBoolean();
	const toast = useShowToast();
	const { mutateAsync, isLoading } = useForgotPassword();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormLoginInput>();

	const onSubmit: SubmitHandler<IFormLoginInput> = async (data) => {
		try {
			const res = await mutateAsync(data);
			if (res?.status === "success") {
				setStatus.on();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast({
					status: "error",
					title:
						error?.response?.data?.message ||
						"Ocurrió un error. Intente nuevamente luego.",
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
						{!status
							? "Cambiar contraseña"
							: "	Link para cambiar contraseña enviado"}
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
							? "Para cambiar la contraseña, por favor dinos tu mail."
							: "Un link ha sido mandado a tu mail para cambiar tu contraseña. Clickea el link para cambiar la contraseña."}
					</Text>

					{!status && (
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
										errorMessage: errors.email?.message as string,
									}}
								/>
							</Box>

							<CustomButton {...{ text: "Cambiar contraseña", isLoading }} />

							<Link href="/auth/login">
								<Text
									mt=".7rem"
									color="brand.secondaryColor2"
									fontWeight="500"
									fontSize="1.3rem"
								>
									Ya tienes una cuenta?
									<span style={{ color: "#00AF54" }}> Logueate</span>
								</Text>
							</Link>
						</Box>
					)}
				</Box>
			</Stack>
		</Box>
	);
};

export default withAuth(ForgotPassword);
