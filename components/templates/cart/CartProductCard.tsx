import { CartItemMPFormat } from "@/types/order";
import { Box, Flex, Icon, Img, Stack, Text } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
	item: CartItemMPFormat;
	color: string;
	// quantityCount: (id: string, type: "increament" | "decreament") => void;
	removeFromCart: (
		id: string | string[],
		name: string,
		isMultiple?: boolean
	) => void;
}

export const CartProductCard = ({
	item,
	color,
	// quantityCount,
	removeFromCart,
}: Props) => {
	return (
		<Flex
			bg={"brand.cartCardBG"}
			borderRadius="1rem"
			p="1rem"
			justify="space-between"
			mb="2rem"
			color="brand.white200"
		>
			<Flex>
				<Box overflow="hidden" borderRadius="1rem">
					<Img
						width="140px"
						height="140px"
						src={`/assets/images/${item?.image}`}
						alt="Imágen de producto"
					/>
				</Box>

				<Stack ml="2rem" flexDir="column" spacing="1.2rem">
					<Text fontSize="1.8rem" fontWeight="300">
						{item?.name.split("-")[0]}
					</Text>
					<Flex align="center">
						<Text fontSize="1.7rem" fontWeight="600">
							AR$ {item?.unit_price?.toFixed(2)}{" "}
						</Text>
						<Text ml=".5rem" fontSize="1.5rem" fontWeight="300">
							{item?.quantity &&
								item?.quantity > 1 &&
								`x ${item?.quantity} = AR$ ${(
									item?.unit_price * item?.quantity
								).toFixed(2)}`}
						</Text>
					</Flex>
					<Flex align="center">
						<Text fontSize="1.4rem" fontWeight="600">
							Talle (US):
						</Text>
						<Text as="span" fontWeight="400" ml=".5rem">
							{item?.size}
						</Text>
					</Flex>

					<Flex align="center">
						<Text display={"inline-block"} fontSize="1.4rem" fontWeight="600">
							Cantidad:{" "}
							<Text display={"inline-block"} fontWeight="300">
								{item.quantity}
							</Text>
						</Text>
					</Flex>
					<Flex alignItems={"center"}>
						<Text fontSize="1.4rem" fontWeight="600">
							Color:
						</Text>
						<Text ml={"0.5rem"}>{color}</Text>
					</Flex>
				</Stack>
			</Flex>

			<Box onClick={() => removeFromCart(item?.id, item.name)}>
				<Icon as={RiDeleteBinLine} fontSize="2rem" cursor="pointer" />
			</Box>
		</Flex>
	);
};
