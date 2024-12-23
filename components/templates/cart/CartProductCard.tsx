import { CartItem } from "@/hooks/state/storage";
import { Box, Flex, Icon, Img, Stack, Text } from "@chakra-ui/react";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
	item: CartItem;
	quantityCount: (id: string, type: "increament" | "decreament") => void;
	removeFromCart: (id: string | string[], isMultiple?: boolean) => void;
}

export const CartProductCard = ({
	item,
	quantityCount,
	removeFromCart,
}: Props) => {
	return (
		<Flex
			bg="brand.secondaryColor5"
			borderRadius="1rem"
			p="1rem"
			justify="space-between"
			mb="2rem"
		>
			<Flex>
				<Box overflow="hidden" borderRadius="1rem">
					<Img
						width="140px"
						height="140px"
						// src={item?.image}
						src={`${item?.image}`}
						alt="Imágen de producto"
					/>
				</Box>

				<Stack ml="2rem" flexDir="column" spacing="1.2rem">
					<Text
						fontSize="1.8rem"
						fontWeight="300"
						color="brand.secondaryColor1"
					>
						{item?.name}
					</Text>
					<Flex align="center">
						<Text
							fontSize="1.7rem"
							fontWeight="600"
							color="brand.secondaryColor1"
						>
							ARS {item?.price?.toFixed(2)}{" "}
						</Text>
						<Text
							ml=".5rem"
							fontSize="1.5rem"
							fontWeight="300"
							color="brand.secondaryColor2"
						>
							{item?.quantity &&
								item?.quantity > 1 &&
								`x ${item?.quantity} = ARS ${(
									item?.price * item?.quantity
								).toFixed(2)}`}
						</Text>
					</Flex>
					<Flex align="center">
						<Text
							fontSize="1.4rem"
							fontWeight="600"
							color="brand.secondaryColor1"
						>
							Talle:
						</Text>
						<Text as="span" fontWeight="400" ml=".5rem">
							{item?.size}
						</Text>
					</Flex>

					<Flex align="center">
						<Text
							fontSize="1.4rem"
							fontWeight="600"
							color="brand.secondaryColor1"
						>
							Cantidad:
						</Text>
						<Flex align="center" ml="1rem">
							<Icon
								onClick={() => quantityCount(item?.id, "decreament")}
								as={AiOutlineMinusCircle}
								fontSize="2rem"
								cursor={item?.quantity === 1 ? "not-allowed" : "pointer"}
								opacity={item?.quantity === 1 ? "0.4" : 1}
								color="brand.color1"
							/>
							<Text mx="1rem">{item?.quantity}</Text>
							<Icon
								onClick={() => quantityCount(item?.id, "increament")}
								as={AiFillPlusCircle}
								fontSize="2rem"
								cursor="pointer"
								color="brand.color1"
							/>
						</Flex>
					</Flex>
				</Stack>
			</Flex>

			<Box onClick={() => removeFromCart(item?.id)}>
				<Icon
					as={RiDeleteBinLine}
					fontSize="2rem"
					cursor="pointer"
					color="brand.secondaryColor2"
				/>
			</Box>
		</Flex>
	);
};
