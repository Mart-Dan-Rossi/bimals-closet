import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";
import { useCreateMPOrder } from "@/hooks/orders/useMPOrders";
import { useReserveMultipleProducts } from "@/hooks/products/useProduct";
import {
	useHydratedCartState,
	useHydratedStoreState,
} from "@/hooks/state/hydrated";
import { useCartState } from "@/hooks/state/storage";
import { StoredUserData } from "@/types/auth";
import { CartItemMPFormat } from "@/types/order";
import { ReserveProductData } from "@/types/product";
import { getReservedDataFromNameAndQtty } from "@/utils/functions";
import {
	Box,
	Center,
	Flex,
	Icon,
	Text,
	useBoolean,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FaGhost } from "react-icons/fa";
import { ConfirmDeleteModal } from "../admin/ConfirmDeleteModal";
import { CartProductCard } from "./CartProductCard";

export const CartItems = () => {
	const cart = useHydratedCartState("cart");
	const token = useHydratedStoreState("token");

	const { isDarkMode } = useGlobalContext();

	const { mutateAsync: addMutateAsyncCreateOrder } = useCreateMPOrder();
	const { mutateAsync: addMutateAsyncReserveMultipleProducts } =
		useReserveMultipleProducts();

	const { removeFromCart, emptyCart } = useCartState((state) => state);

	const router = useRouter();
	const toast = useToast();

	const [userEmail, setUserEmail] = useState("");
	const [userName, setUserName] = useState<string>("");
	const [localStoredUser, setLocalStoredUser] = useState<
		StoredUserData | undefined
	>();

	const [preferenceId, setPreferenceId] = useState(null);
	const [
		isLoadingPurchaseRequest,
		{ on: processingPurchaseRequest, off: purchaseRequestLoaded },
	] = useBoolean();

	if (process.env.NEXT_PUBLIC_MERCADOPAGO_LIVE_KEY) {
		initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_LIVE_KEY, {
			locale: "es-AR",
		});
	}

	const {
		isOpen: isConfirmEmptyCartModalOpen,
		onOpen: onOpenConfirmEmptyCartModal,
		onClose: onCloseConfirmEmptyCartModal,
	} = useDisclosure();

	const totalCartPrice =
		cart?.reduce((total, item) => {
			const itemTotal = Number(item.unit_price) * Number(item.quantity);
			return total + itemTotal;
		}, 0) ?? 0;

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : null;
		const email = user ? user.email : null;

		if (userEmail !== email) {
			setUserEmail(email);
		}
		if (userName !== user) {
			setUserName(user?.name.split(" ")[0]);
		}
		if (JSON.stringify(localStoredUser) !== JSON.stringify(user)) {
			setLocalStoredUser(user);
		}
	}, [userEmail, userName, token]);

	const handleReserveProducts = async (
		productsDataToReserve: ReserveProductData[]
	) => {
		try {
			const results = await addMutateAsyncReserveMultipleProducts(
				productsDataToReserve
			);

			toast({
				duration: 120000,
				isClosable: true,
				status: "success",
				title: "Reservas completadas exitosamente.",
				description:
					"Por favor completa el pago o comunicate con nosotros por nuestras redes sociales (Al pie de página).",
			});

			return { successfulReserves: results, failedReserves: [] };
		} catch (error) {
			console.error("Error reservando productos:", error);
			toast({
				status: "error",
				title: "Error en la reserva",
				description: `Error: ${error}`,
			});

			return { successfulReserves: [], failedReserves: [{ error }] };
		}
	};

	async function handleConfirmPay() {
		if (!cart || cart.length === 0) {
			toast({
				status: "error",
				title: "No puedes efectuar pago, carrito vacío",
			});
			return;
		}

		processingPurchaseRequest();

		const createMPOrderRes = await addMutateAsyncCreateOrder({
			cartItems: cart,
			metadata: { userId: localStoredUser?.id },
		});

		const id = createMPOrderRes.id;

		const productsDataToReserve = cart.map((item) => {
			return {
				id: item.id,
				userId: localStoredUser?.id,
				reservedData: getReservedDataFromNameAndQtty(
					item.name,
					item.quantity,
					localStoredUser?.id
				),
			};
		});

		await handleReserveProducts(productsDataToReserve).then((res) => {
			if (res?.failedReserves.length !== 0) {
				purchaseRequestLoaded();
			} else if (id) {
				purchaseRequestLoaded();
				setPreferenceId(id);
			}
		});
	}

	return (
		<Box
			pt="15rem"
			pb="5rem"
			bg={isDarkMode ? "darkBrand.white300" : "brand.white300"}
			minHeight={"90vh"}
		>
			<Box maxW="880px" mx="auto" px="3rem">
				<Box as="span" mb="2rem" onClick={() => router.back()}>
					<Icon
						as={BiChevronLeft}
						fontSize="3rem"
						cursor="pointer"
						color={isDarkMode ? "darkBrand.white100" : "black"}
					/>
				</Box>

				{cart?.length === 0 && (
					<Center flexDir="column">
						<Icon
							as={FaGhost}
							fontSize="10rem"
							color={isDarkMode ? "darkBrand.white100" : "brand.color1"}
							opacity="0.4"
						/>
						<Text mt="1rem" fontWeight="300" textAlign="center">
							Tu carrito está vacío! Comienza a llenarlo ahora!
						</Text>
					</Center>
				)}

				{cart?.map((item: CartItemMPFormat, index) => {
					return (
						<CartProductCard
							key={`cart-item-${index}-key`}
							item={item}
							color={item.name.split("-")[1]}
							// quantityCount={quantityCount}
							removeFromCart={removeFromCart}
						/>
					);
				})}
				{cart && (
					<Flex
						bg={isDarkMode ? "darkBrand.color2" : "brand.color2"}
						borderRadius="1rem"
						p="2rem"
						justify="space-between"
						mt="5rem"
					>
						<Box overflow="hidden" borderRadius="1rem">
							<Text
								fontWeight="600"
								color={isDarkMode ? "darkBrand.white100" : ""}
							>
								Total de Items
							</Text>
							<Text
								textAlign="center"
								color={isDarkMode ? "darkBrand.white100" : ""}
							>
								{cart?.length}
							</Text>
							<CustomButton
								{...{
									text: isLoadingPurchaseRequest ? "Procesando..." : "Pagar",
									py: ["2rem", "2rem"],
									isDisabled: isLoadingPurchaseRequest || cart?.length < 1,
									onClickFunction: handleConfirmPay,
									boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75)",
								}}
							/>
							{preferenceId && <Wallet initialization={{ preferenceId }} />}
						</Box>

						<Box overflow="hidden" borderRadius="1rem">
							<Text
								fontWeight="600"
								color={isDarkMode ? "darkBrand.white100" : ""}
							>
								Precio Total
							</Text>
							<Text
								textAlign="center"
								color={
									isDarkMode ? "darkBrand.secondaryColor4" : "brand.color3"
								}
							>
								AR$ {totalCartPrice?.toFixed(2)}
							</Text>
							<Box onClick={onOpenConfirmEmptyCartModal}>
								<CustomButton
									{...{
										text: "Vaciar Carrito",
										py: ["2rem", "2rem"],
										isDisabled: cart?.length < 1,
										boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75)",
									}}
								/>
							</Box>
						</Box>
					</Flex>
				)}
			</Box>
			<ConfirmDeleteModal
				isOpen={isConfirmEmptyCartModalOpen}
				onClose={onCloseConfirmEmptyCartModal}
				handler={emptyCart}
				text={"Desea vaciar el carrito?"}
			/>
		</Box>
	);
};
