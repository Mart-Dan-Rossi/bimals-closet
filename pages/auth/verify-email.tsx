import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useVerifyEmailToken } from "@/hooks/auth/useAuth";
import {
	Box,
	Center,
	Flex,
	Heading,
	Icon,
	Image,
	Text,
	useBoolean,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import withAuth from "../withAuth";

const VerifyEmail = () => {
	const router = useRouter();
	const { email, token } = router.query;
	const [status, setStatus] = useBoolean();

	const { data: tokenData } = useVerifyEmailToken(token as string);

	useEffect(() => {
		if (tokenData?.status === "success") {
			setStatus.on();
		}
	}, [tokenData]);

	return (
		<Box bg="brand.white100">
			<Flex
				maxW="1280px"
				mx="auto"
				p="2rem"
				flexDir="column"
				h={["90vh", "100vh"]}
				justifyContent="space-between"
			>
				<Box>
					<Box
						bg="brand.color1"
						borderRadius="50%"
						pos="absolute"
						h={["150px", "150px", "200px", "250px", "300px"]}
						w={["150px", "150px", "200px", "250px", "300px"]}
						top="-79px"
						left="-58px"
					/>
					<Heading
						py="4rem"
						color="brand.secondaryColor1"
						fontWeight="600"
						fontSize={["3rem", "2.5rem", "2.5rem", "3rem"]}
						textAlign="center"
					>
						Verificar mail
					</Heading>

					<Box textAlign="center">
						<Box w="100%" h="100%" mt="0rem">
							<Image
								w={["200px", "200px", "300px", "400px"]}
								h={["200px", "200px", "300px", "400px"]}
								m="0 auto"
								src="/assets/images/verify-email-img.png"
								alt="Fondo de verificar mail"
							/>
						</Box>

						{!status ? (
							<Text
								m="3rem auto"
								w={["100%", "100%", "450px"]}
								fontSize={["1.5rem", "1.5rem", "1.8rem", "2rem"]}
								fontWeight="400"
								letterSpacing="0.02rem"
							>
								Te hemos mandado un mail a <b>{email}</b>. Por favor verifica tu
								bandeja de entrada.
							</Text>
						) : (
							<Box>
								<Center fontSize="4rem" maxW="330px" mx="auto" mt="2rem">
									<Icon
										color="brand.color1"
										fontSize="3rem"
										as={IoMdCheckmarkCircle}
									/>
									<Text
										m=".5rem"
										// w={["100%", "100%", "450px"]}
										fontSize={["1.8rem", "1.5rem", "1.8rem", "2rem"]}
										fontWeight="300"
										letterSpacing="0.02rem"
									>
										Verificación de mail exitosa
									</Text>
								</Center>

								<Link href="/auth/verify-phone">
									<CustomButton
										{...{ w: "auto", px: "5rem", text: "Proceed" }}
									/>
								</Link>
							</Box>
						)}
					</Box>
				</Box>

				<Box>
					<Text
						textAlign="left"
						color="brand.color1"
						fontWeight="600"
						fontSize="1.5rem"
					>
						Paso 2 de 3
					</Text>
				</Box>
			</Flex>
		</Box>
	);
};

export default withAuth(VerifyEmail);
