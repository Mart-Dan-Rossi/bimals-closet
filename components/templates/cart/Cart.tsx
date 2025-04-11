import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";
import { useGlobalContext } from "@/context/GlobalContext";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { CartItemMPFormat } from "@/types/order";
import { Product, SizeOptions } from "@/types/product";
import {
	Box,
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CartContent from "./CartContent";
import CartFooter from "./CartFooter";
import EmptyCartMessage from "./EmptyCartMessage";
import ReservedProductsTab from "./ReservedProductsTab";

export const CartItems = () => {
	const { finalProductsData } = useGlobalContext();

	const token = useHydratedStoreState("token");

	const [userReservedProducts, setUserReserverdProducts] = useState<Product[]>(
		[]
	);
	const [userReservedProductsMPFormated, setUserReservedProductsMPFormated] =
		useState<CartItemMPFormat[]>([]);

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
						image: product.images[0],
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
						<Tab fontSize={"large"} value="products">
							Carrito
						</Tab>
						{userReservedProducts.length > 0 && (
							<Tab fontSize={"large"} value="orders">
								Reservas
							</Tab>
						)}
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
					</TabPanels>
				</Tabs>
				<Box minW={"80vw"}>
					<CartFooter
						userReservedProductsMPFormated={userReservedProductsMPFormated}
					/>
				</Box>
			</Flex>
		</Box>
	);
};
