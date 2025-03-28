import { useGlobalContext } from "@/context/GlobalContext";
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
	const { isDarkMode } = useGlobalContext();

	return (
		<Flex
			bg={isDarkMode ? "darkBrand.color2" : "brand.color2"}
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
						src={`/assets/images/${item?.image}`}
						alt="Imágen de producto"
					/>
				</Box>

				<Stack ml="2rem" flexDir="column" spacing="1.2rem">
					<Text
						fontSize="1.8rem"
						fontWeight="300"
						color={isDarkMode ? "darkBrand.white100" : "brand.secondaryColor1"}
					>
						{item?.name.split("-")[0]}
					</Text>
					<Flex align="center">
						<Text
							fontSize="1.7rem"
							fontWeight="600"
							color={isDarkMode ? "darkBrand.secondaryColor4" : "brand.color3"}
						>
							AR$ {item?.unit_price?.toFixed(2)}{" "}
						</Text>
						<Text
							ml=".5rem"
							fontSize="1.5rem"
							fontWeight="300"
							color={isDarkMode ? "darkBrand.color3" : "brand.color3"}
						>
							{item?.quantity &&
								item?.quantity > 1 &&
								`x ${item?.quantity} = AR$ ${(
									item?.unit_price * item?.quantity
								).toFixed(2)}`}
						</Text>
					</Flex>
					<Flex align="center">
						<Text
							fontSize="1.4rem"
							fontWeight="600"
							color={
								isDarkMode
									? "darkBrand.secondaryColor1"
									: "brand.secondaryColor1"
							}
						>
							Talle (US):
						</Text>
						<Text
							color={isDarkMode ? "darkBrand.white100" : ""}
							as="span"
							fontWeight="400"
							ml=".5rem"
						>
							{item?.size}
						</Text>
					</Flex>

					<Flex align="center">
						<Text
							display={"inline-block"}
							fontSize="1.4rem"
							fontWeight="600"
							color={
								isDarkMode
									? "darkBrand.secondaryColor1"
									: "brand.secondaryColor1"
							}
						>
							Cantidad:{" "}
							<Text display={"inline-block"} fontWeight="300">
								{item.quantity}
							</Text>
						</Text>
						{/* <Flex align="center" ml="1rem">
							<Icon
							onClick={() => quantityCount(item?.id, "decreament")}
							as={AiOutlineMinusCircle}
							fontSize="2rem"
							cursor={
								item?.sizeOption.quantity === 1 ? "not-allowed" : "pointer"
								}
								opacity={item?.sizeOption.quantity === 1 ? "0.4" : 1}
								color={{isDarkMode ? "darkBrand.color1" : "brand.color1"}}
								/>
								<Text mx="1rem">{item?.sizeOption.quantity}</Text>
								<Icon
								onClick={() => quantityCount(item?.id, "increament")}
								as={AiFillPlusCircle}
								fontSize="2rem"
								cursor="pointer"
								color={{isDarkMode ? "darkBrand.color1" : "brand.color1"}}
								/>
								</Flex> */}
					</Flex>
					<Flex alignItems={"center"}>
						<Text
							fontSize="1.4rem"
							fontWeight="600"
							color={
								isDarkMode ? "darkBrand.white100" : "brand.secondaryColor1"
							}
						>
							Color:
						</Text>
						<Text ml={"0.5rem"} color={isDarkMode ? "darkBrand.white100" : ""}>
							{color}
						</Text>
					</Flex>
				</Stack>
			</Flex>

			<Box onClick={() => removeFromCart(item?.id, item.name)}>
				<Icon
					as={RiDeleteBinLine}
					fontSize="2rem"
					cursor="pointer"
					color={isDarkMode ? "darkBrand.white100" : "brand.secondaryColor2"}
				/>
			</Box>
		</Flex>
	);
};
