import SocialMedia from "@/components/ui/SocialMedia";
import { useGlobalContext } from "@/context/GlobalContext";
import { Footer } from "@/layouts/Footer";
import { BasketBall } from "@/public/assets/images/BasketBall";
import { QueryData } from "@/types/Query";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PaySuccess = () => {
	const router = useRouter();

	const { setQueryData } = useGlobalContext();

	const { payment_id } = router.query;

	useEffect(() => {
		setQueryData(router.query as QueryData);
	}, [payment_id]);

	return (
		<Box>
			<Stack h="92vh" spacing="0" direction={["column", "column", "row"]}>
				<Box
					w={["100%", "100%", "50%"]}
					p="2rem"
					bg={"brand.color1"}
					pos="relative"
					display={["none", "none", "flex"]}
				>
					<Box color={"brand.white100"}>
						<Box onClick={() => router.push("/")}>
							<Text
								cursor={"pointer"}
								userSelect={"none"}
								fontWeight="700"
								fontSize={["1.8rem", "2.5rem"]}
							>
								Mateo Shoes
							</Text>
						</Box>
					</Box>
					<Flex justify={"flex-end"} w={"90%"}>
						<BasketBall />
					</Flex>
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
					alignItems="flex-start"
					justifyContent="center"
					flexDir="column"
					ms="0rem"
				>
					<Text p={"2rem"} fontSize={"x-large"} fontWeight={"600"}>
						Pago realizado exitosamente!
					</Text>
					<Text p={"2rem"} fontSize={"xx-large"} fontWeight={"600"}>
						Por favor, comunicate por nuestras redes sociales adjuntando el
						comprobante de pago para que podamos coordinar la entrega.
					</Text>
					<Box
						border="1px solid black"
						margin="0 auto"
						borderRadius="20px"
						p="2rem"
					>
						<SocialMedia iconsColor={"brand.black"} successSection={true} />
					</Box>
					<Text p={"2rem"} fontSize={"x-large"} fontWeight={"600"}>
						Esperamos disfrutes la compra ❤️
					</Text>
				</Box>
			</Stack>
			<Footer />
		</Box>
	);
};

export default PaySuccess;
