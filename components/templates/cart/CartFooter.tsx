import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useCreateMPOrder } from "@/hooks/orders/useMPOrders";
import { useReserveMultipleProducts } from "@/hooks/products/useProduct";
import {
	useHydratedCartState,
	useHydratedStoreState,
} from "@/hooks/state/hydrated";
import { useCartState } from "@/hooks/state/storage";
import { standardBoxShadow } from "@/styles/themes/foundation/globalStyles";
import { StoredUserData } from "@/types/auth";
import { CartItemMPFormat } from "@/types/order";
import { Product, ReserveProductData } from "@/types/product";
import { getReservedDataFromNameAndQtty } from "@/utils/functions";
import {
	Box,
	Flex,
	Text,
	useBoolean,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ConfirmDeleteModal } from "../admin/ConfirmDeleteModal";

interface Props {
	userReservedProducts: Product[];
	userReservedProductsMPFormated: CartItemMPFormat[];
}

const CartFooter = ({
	userReservedProducts,
	userReservedProductsMPFormated,
}: Props) => {
	const token = useHydratedStoreState("token");

	const { emptyCart } = useCartState((state) => state);

	const cart = useHydratedCartState("cart");

	const { mutateAsync: addMutateAsyncCreateOrder } = useCreateMPOrder();
	const { mutateAsync: addMutateAsyncReserveMultipleProducts } =
		useReserveMultipleProducts();

	const toast = useToast();
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

	const [userEmail, setUserEmail] = useState("");
	const [userName, setUserName] = useState<string>("");
	const [localStoredUser, setLocalStoredUser] = useState<
		StoredUserData | undefined
	>();

	const queryClient = useQueryClient();

	const refreshProducts = () => {
		queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
	};

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

	function getTotalCartPrice() {
		const totalCartPrice =
			cart?.reduce((total, item) => {
				const itemTotal = Number(item.unit_price) * Number(item.quantity);
				return total + itemTotal;
			}, 0) ?? 0;

		return Number(totalCartPrice.toFixed(2));
	}

	function getTotalItemsAmount() {
		const totalCartItemsAmount = cart?.length ?? 0;

		return totalCartItemsAmount;
	}

	const handleReserveProducts = async (
		productsDataToReserve: ReserveProductData[]
	) => {
		try {
			const results = await addMutateAsyncReserveMultipleProducts(
				productsDataToReserve
			);

			if (productsDataToReserve) {
				toast({
					isClosable: true,
					status: "success",
					title: "Puedes ver tus reservas en la pestaña 'Reservas'.",
				});
			}

			toast({
				isClosable: true,
				status: "success",
				title: "Reservas completadas exitosamente.",
				description:
					"Por favor completa el pago o comunicate con nosotros por nuestras redes sociales (Al pie de página).",
			});

			return { successfulReserves: results, failedReserves: [] };
		} catch (error) {
			console.error("Error reservando productos: ", error);
			let errorMessage = "Ocurrió un error desconocido";

			if (
				typeof error === "object" &&
				error !== null &&
				"response" in error &&
				typeof (error as any).response === "object" &&
				"data" in (error as any).response &&
				(error as any).response.data?.error
			) {
				errorMessage = `Error: ${(error as any).response.data.error}`;
			}

			toast({
				status: "error",
				title: "Error en la reserva",
				description: errorMessage,
			});

			return { successfulReserves: [], failedReserves: [{ error }] };
		}
	};

	async function handleConfirmPay() {
		if (!cart) {
			toast({
				status: "error",
				title: "No puedes efectuar pago, carrito vacío",
			});
			return;
		}

		processingPurchaseRequest();

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

		await handleReserveProducts(productsDataToReserve).then(async (res) => {
			if (res?.failedReserves.length !== 0) {
				purchaseRequestLoaded();
			} else {
				const createMPOrderRes = await addMutateAsyncCreateOrder({
					cartItems: [...cart, ...userReservedProductsMPFormated],
					metadata: {
						userId: localStoredUser?.id,
						products: userReservedProducts,
					},
				});

				const id = createMPOrderRes.id;

				if (id) {
					purchaseRequestLoaded();
					setPreferenceId(id);

					refreshProducts();
				}
			}
		});
	}

	return (
		<>
			{cart && (
				<Flex
					bg={"brand.cartFooterBG"}
					borderRadius="1rem"
					p="2rem"
					justify="space-between"
					mt="5rem"
					color={"brand.white200"}
				>
					<Box overflow="hidden" borderRadius="1rem">
						<Text fontWeight="600">Total de Items</Text>
						<Text fontWeight="600" mt="1rem">
							Precio Total
						</Text>

						<Box onClick={onOpenConfirmEmptyCartModal}>
							<CustomButton
								{...{
									text: "Vaciar Carrito",
									py: ["2rem", "2rem"],
									isDisabled: cart?.length === 0,
									boxShadow: standardBoxShadow,
								}}
							/>
						</Box>
					</Box>

					<Box overflow="hidden" borderRadius="1rem">
						<Text textAlign="end">{getTotalItemsAmount()}</Text>
						<Text textAlign="end" mt="1rem">
							AR$ {getTotalCartPrice()}
						</Text>
						<CustomButton
							{...{
								text: isLoadingPurchaseRequest ? "Procesando..." : "Comprar",
								py: ["2rem", "2rem"],
								isDisabled:
									isLoadingPurchaseRequest ||
									(cart?.length === 0 &&
										userReservedProductsMPFormated.length === 0),
								onClickFunction: handleConfirmPay,
								boxShadow: standardBoxShadow,
							}}
						/>
						{preferenceId && <Wallet initialization={{ preferenceId }} />}
					</Box>
				</Flex>
			)}
			<ConfirmDeleteModal
				isOpen={isConfirmEmptyCartModalOpen}
				onClose={onCloseConfirmEmptyCartModal}
				handler={emptyCart}
				text={"Desea vaciar el carrito?"}
			/>
		</>
	);
};

export default CartFooter;
