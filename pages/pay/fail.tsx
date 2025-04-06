import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { BasketBall } from "@/public/assets/images/BasketBall";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const PayFailed = () => {
	const router = useRouter();

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
					<Box color={"brand.white100"}>
						<Box cursor="pointer" onClick={() => router.push("/")}>
							<Text fontWeight="700" fontSize={["1.8rem", "2.5rem"]}>
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
					alignItems="center"
					justifyContent="center"
					flexDir="column"
					ms="0rem"
				>
					<Text
						colorScheme={"red"}
						color={"red"}
						p={"2rem"}
						fontSize={"x-large"}
						fontWeight={"600"}
					>
						Algo salió mal!
					</Text>
					<Text p={"2rem"} fontSize={"xx-large"} fontWeight={"600"}>
						Por favor, intenta nuevamente más tarde.
					</Text>
					<CustomButton
						{...{
							text: "Volver al inicio",
							py: ["2rem", "2rem"],
							border: ".2rem solid",
							borderColor: "transparent",
							onClickFunction: () => {
								router.push("/");
							},
						}}
					/>
				</Box>
			</Stack>
		</Box>
	);
};

export default PayFailed;
