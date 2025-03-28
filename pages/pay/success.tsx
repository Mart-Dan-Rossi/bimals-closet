import { useGlobalContext } from "@/context/GlobalContext";
import { useCartState } from "@/hooks/state/storage";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PaySuccess = () => {
	const router = useRouter();
	const { isDarkMode } = useGlobalContext();

	const { emptyCart } = useCartState((state) => state);

	// const router = useRouter();
	// const { payment_id, status, merchant_order_id } = router.query;
	// const [metadata, setMetadata] = useState(null);

	// useEffect(() => {
	// 	if (payment_id) {
	// 		const fetchPaymentDetails = async () => {
	// 			try {
	// 				const { data } = await axios.get(
	// 					`/api/mercadopago/payment/${payment_id}`
	// 				);
	// 				setMetadata(data.metadata);
	// 			} catch (error) {
	// 				console.error("Error al obtener detalles del pago", error);
	// 			}
	// 		};

	// 		fetchPaymentDetails();
	// 	}

	// 	console.log("metadata: ", metadata);
	// }, [payment_id]);

	useEffect(() => {
		emptyCart();
	}, []);

	return (
		<Box>
			<Stack spacing="0" direction={["column", "column", "row"]}>
				<Box
					h="100vh"
					w={["100%", "100%", "50%"]}
					p="2rem"
					bg={isDarkMode ? "darkBrand.color1" : "brand.color1"}
					pos="relative"
					display={["none", "none", "flex"]}
				>
					<Box color={isDarkMode ? "darkBrand.white100" : "brand.white100"}>
						<Box onClick={() => router.push("/")}>
							<Text fontWeight="700" fontSize={["1.8rem", "2.5rem"]}>
								Mateo Shoes
							</Text>
						</Box>
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
					<Text p={"2rem"} fontSize={"x-large"} fontWeight={"600"}>
						Pago realizado exitosamente!
					</Text>
					<Text p={"2rem"} fontSize={"xx-large"} fontWeight={"600"}>
						Por favor, comunicate por nuestras redes sociales adjuntando el
						comprobante de pago para que podamos coordinar la entrega.
					</Text>
					<Text fontWeight={"600"}>
						(Puedes encontrar nuestras redes sociales en el pié de página)
					</Text>
					<Text p={"2rem"} fontSize={"x-large"} fontWeight={"600"}>
						Esperamos disfrutes la compra ❤️
					</Text>
				</Box>
			</Stack>
		</Box>
	);
};

export default PaySuccess;
