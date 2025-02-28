import { CustomButton } from "@/components/ui/buttons/CustomButton";
import {
	useHydratedCartState,
	useHydratedStoreState,
} from "@/hooks/state/hydrated";
import { CartItem, useCartState } from "@/hooks/state/storage";
import { Box, Center, Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FaGhost } from "react-icons/fa";
import { CartProductCard } from "./CartProductCard";

export const CartItems = () => {
	const cart = useHydratedCartState("cart");
	const token = useHydratedStoreState("token");

	const { quantityCount, removeFromCart, emptyCart } = useCartState(
		(state) => state
	);

	const router = useRouter();

	const [userEmail, setUserEmail] = useState("");
	const [userName, setUserName] = useState<string>("");

	const totalCartPrice =
		cart?.reduce((total, item) => {
			const itemTotal = Number(item.price) * Number(item.quantity);
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
	}, [userEmail, userName, token]);

	return (
		<Box pt="15rem" pb="5rem">
			<Box maxW="880px" mx="auto" px="3rem">
				<Box as="span" mb="2rem" onClick={() => router.back()}>
					<Icon as={BiChevronLeft} fontSize="3rem" cursor="pointer" />
				</Box>

				{cart?.length === 0 && (
					<Center flexDir="column">
						<Icon
							as={FaGhost}
							fontSize="10rem"
							color="brand.color1"
							opacity="0.4"
						/>
						<Text mt="1rem" fontWeight="300" textAlign="center">
							Tu carrito está vacío! Comienza a llenarlo ahora!
						</Text>
					</Center>
				)}

				{cart?.map((item: CartItem, index) => {
					return (
						<CartProductCard
							key={`cart-item-${index}-key`}
							item={item}
							quantityCount={quantityCount}
							removeFromCart={removeFromCart}
						/>
					);
				})}
				{cart && (
					<Flex
						bg="brand.secondaryColor5"
						borderRadius="1rem"
						p="2rem"
						justify="space-between"
						mt="5rem"
					>
						<Box overflow="hidden" borderRadius="1rem">
							<Text fontWeight="600">Total de Items</Text>
							<Text textAlign="center">{cart?.length}</Text>
							<Box>
								<CustomButton
									{...{
										text: "Pagar",
										py: ["2rem", "2rem"],
										border: ".2rem solid",
										borderColor: "transparent",
										isDisabled: cart?.length < 1,
									}}
								/>
							</Box>
						</Box>

						<Box overflow="hidden" borderRadius="1rem">
							<Text fontWeight="600">Precio Total</Text>
							<Text textAlign="center">AR$ {totalCartPrice?.toFixed(2)}</Text>
							<Box onClick={emptyCart}>
								<CustomButton
									{...{
										text: "Vaciar Carrito",
										py: ["2rem", "2rem"],
										border: ".2rem solid",
										borderColor: "transparent",
										isDisabled: cart?.length < 1,
									}}
								/>
							</Box>
						</Box>
					</Flex>
				)}
			</Box>
		</Box>
	);
};
