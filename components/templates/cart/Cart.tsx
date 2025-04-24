import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";
import { useGlobalContext } from "@/context/GlobalContext";
import {
	useHydratedCartState,
	useHydratedStoreState,
} from "@/hooks/state/hydrated";
import { CartItemMPFormat, OrderDataBEFormat } from "@/types/order";
import { Product, SizeOptions } from "@/types/product";
import { getDefaultImage, getTotalProductsReserved } from "@/utils/functions";
import {
	Box,
	Circle,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminOrderCard from "../admin/AdminOrderCard";
import CartContent from "./CartContent";
import CartFooter from "./CartFooter";
import EmptyCartMessage from "./EmptyCartMessage";
import ReservedProductsTab from "./ReservedProductsTab";
import { standardBoxShadow } from "@/styles/themes/foundation/globalStyles";

export const CartItems = () => {
	const { finalProductsData, ordersData } = useGlobalContext();

	const token = useHydratedStoreState("token");
	const cart = useHydratedCartState("cart");

	const [currentTab, setCurrentTab] = useState(0);

	const [userReservedProducts, setUserReserverdProducts] = useState<Product[]>(
		[]
	);

	const [userReservedProductsMPFormated, setUserReservedProductsMPFormated] =
		useState<CartItemMPFormat[]>([]);

	const [userFinalOrders, setUserFinalOrders] = useState<
		OrderDataBEFormat[] | undefined
	>();

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : null;
		if (user) {
			const ordersFiltered = ordersData?.filter((order) => {
				return order.user.id === user.id;
			});
			setUserFinalOrders(ordersFiltered);
		}
	}, [ordersData, token]);

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : null;
		if (user) {
			const URP: Product[] = finalProductsData
				?.map((product) => {
					const userReservations =
						product.reservedData?.filter((reserve) => {
							const sameUserId = reserve.userId === user.id;
							const isHidden = reserve.hide;

							return sameUserId && !isHidden;
						}) || [];

					if (userReservations.length === 0) return null;

					const filteredSizeOptions = product.sizeOptions
						.map((sizeOption) => {
							const matchingReservation = userReservations.find(
								(reserve) =>
									reserve.usSize === sizeOption.usSize &&
									reserve.color === sizeOption.color
							);

							return matchingReservation
								? { ...sizeOption, quantity: matchingReservation.quantity }
								: null;
						})
						.filter(Boolean) as SizeOptions;

					return {
						...product,
						sizeOptions: filteredSizeOptions,
						reservedData: product.reservedData,
					};
				})
				.filter(Boolean) as Product[];

			const URPCartItemMPFormat: CartItemMPFormat[] | undefined = URP?.reduce(
				(acc: CartItemMPFormat[], product) => {
					if (!product?._id) return acc;

					const thisUserReservedData = product.reservedData?.filter(
						(reservedData) => reservedData.userId === user.id
					);

					const totalUserReservations = thisUserReservedData?.reduce(
						(sum, reservation) => sum + reservation.quantity,
						0
					);

					acc.push({
						id: product._id,
						name: product.name,
						unit_price: product.price,
						quantity: totalUserReservations ?? 0,
						image: getDefaultImage(product.images),
					});

					return acc;
				},
				[]
			);

			setUserReserverdProducts(URP || []);
			setUserReservedProductsMPFormated(URPCartItemMPFormat || []);
		}
	}, [finalProductsData, token]);

	return (
		<Box pt="15rem" pb="5rem" bg={"brand.white400"} minHeight={"90vh"}>
			<Flex alignItems={"center"} flexDirection={"column"}>
				<Box ml={"9%"} alignSelf={"flex-start"}>
					<PreviousPageButton />
				</Box>

				<Tabs defaultIndex={0} variant={"enclosed-colored"}>
					<TabList>
						<Tab
							fontSize={"large"}
							value="products"
							onClick={() => setCurrentTab(0)}
						>
							<Box as="span" pos="relative">
								<Circle
									bg={"brand.gold100"}
									p=".3rem .7rem"
									pos="absolute"
									right="-1.5rem"
									top="-1rem"
									fontSize=".9rem"
									fontWeight="600"
									color="white"
								>
									{cart && cart.length}
								</Circle>
								<span>Carrito</span>
							</Box>
						</Tab>

						<Tab
							fontSize={"large"}
							value="orders"
							onClick={() => setCurrentTab(1)}
						>
							<Box as="span" pos="relative">
								<Circle
									bg={"brand.gold100"}
									p=".3rem .7rem"
									pos="absolute"
									right="-1.5rem"
									top="-1rem"
									fontSize=".9rem"
									fontWeight="600"
									color="white"
								>
									{getTotalProductsReserved(userReservedProducts)}
								</Circle>
								<span>Reservas</span>
							</Box>
						</Tab>

						<Tab
							fontSize={"large"}
							value="orders"
							onClick={() => setCurrentTab(2)}
						>
							<Box as="span" pos="relative">
								<Circle
									bg={"brand.gold100"}
									p=".3rem .7rem"
									pos="absolute"
									right="-1.5rem"
									top="-1rem"
									fontSize=".9rem"
									fontWeight="600"
									color="white"
								>
									{userFinalOrders ? userFinalOrders.length : 0}
								</Circle>
								<span>Mis compras</span>
							</Box>
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel minW={"80vw"}>
							<EmptyCartMessage />
							<CartContent />
						</TabPanel>
						<TabPanel minW={"80vw"}>
							<ReservedProductsTab
								userReservedProducts={userReservedProducts}
							/>
						</TabPanel>

						<TabPanel minW={"80vw"}>
							<Flex flexDirection={"column"} gap={"2rem"}>
								{userFinalOrders?.map((orderData, index) => {
									return (
										<Box
											key={`user-cart-final-order-${orderData._id}-${index}`}
											borderRadius={"20px"}
											boxShadow={standardBoxShadow}
										>
											<AdminOrderCard
												orderData={orderData}
												hideAdminOrderCardUserData={true}
											/>
										</Box>
									);
								})}
							</Flex>
						</TabPanel>
					</TabPanels>
				</Tabs>
				{currentTab !== 2 && (
					<Box minW={"80vw"}>
						<CartFooter
							userReservedProducts={userReservedProducts}
							userReservedProductsMPFormated={userReservedProductsMPFormated}
						/>
					</Box>
				)}
			</Flex>
		</Box>
	);
};
