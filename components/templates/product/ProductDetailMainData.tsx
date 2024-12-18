import {
	BoxCardLoader,
	TextLoader,
} from "@/components/animations/CustomLoader";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { CartItem, useCartState } from "@/hooks/state/storage";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { Product } from "@/types/product";
import { Box, Flex, HStack, Icon, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface Props {
	isLoadingParticulaProductData: boolean;
	particularProductData?: Product;
}

export const ProductDetailMainData = ({
	isLoadingParticulaProductData,
	particularProductData,
}: Props) => {
	const toast = useShowToast();

	const router = useRouter();

	const { addToCart } = useCartState((state) => state);

	const [selectedSize, setSelectedSize] = useState<string>("");

	const handleAddToCart = () => {
		// const product = particularProductData?.data?.product;
		const product = particularProductData;

		const id = product?._id;
		const name = product?.name;
		const price = product?.price;
		const image = product?.image;

		if (id && name && price && image) {
			if (!selectedSize) {
				return toast({
					status: "error",
					title: "Selecciona un talle antes de agregarlo al carrito",
				});
			}
			const payload: CartItem = {
				id,
				name,
				size: selectedSize,
				price,
				quantity: 1,
				// image: image?.[0],
				image: image,
			};
			addToCart(payload);
			toast({
				status: "success",
				title: "Agregado al carrito",
			});
		}
	};

	const handleBuyNow = () => {
		handleAddToCart();

		if (selectedSize) {
			setTimeout(() => {
				router.push("/cart");
			}, 700);
		}
	};
	return (
		<>
			{isLoadingParticulaProductData ? (
				<Box>
					<TextLoader noOfLines={2} />
					<TextLoader mt="4rem" noOfLines={4} />
					<TextLoader mt="4rem" noOfLines={4} />
					<HStack mt="4rem">
						<BoxCardLoader rounded=".6rem" h="40px" />
						<BoxCardLoader rounded=".6rem" h="40px" />
					</HStack>
				</Box>
			) : (
				<>
					{particularProductData && (
						<Box>
							<Text
								fontSize={["2.5rem", "3.2rem", "2.5rem", "3.2rem"]}
								fontWeight="600"
							>
								{/* {particularProductData?.data?.product?.name} */}
								{particularProductData.name}
							</Text>
							<Flex
								align="center"
								justify="space-between"
								borderBottom="1px solid"
								borderColor="brand.white600"
								pb="2rem"
							>
								<Icon
									cursor="pointer"
									color={
										// particularProductData?.data?.product?.isFavorite
										particularProductData.isFavorite
											? "brand.red100"
											: "brand.secondaryColor2"
									}
									fontSize="2rem"
									as={
										// particularProductData?.data?.product?.isFavorite
										particularProductData.isFavorite ? GoHeartFill : GoHeart
									}
								/>
							</Flex>

							<Box>
								<Text
									color="brand.blue100"
									fontSize={["2.5rem", "4.2rem", "2.5rem", "4.2rem"]}
									fontWeight="600"
								>
									{/* ₦{particularProductData?.data?.product?.price} */}
									ARS {particularProductData.price}
								</Text>

								<Box mt="2rem">
									<Text
										fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
										fontWeight="600"
										color="brand.secondaryColor1"
									>
										Talle
									</Text>
									<HStack spacing={4} mt="1rem">
										{["sm", "md", "lg", "xl", "2xl", "3xl"].map((size) => (
											<Tag
												onClick={() => setSelectedSize(size)}
												cursor="pointer"
												size="lg"
												key={size}
												p={[".8rem", ".8rem 1.5rem"]}
												fontSize={["1.5rem", "1.5rem", "1.2rem", "1.5rem"]}
												fontWeight="500"
												bg="transparent"
												border="1px solid"
												borderColor={
													selectedSize === size
														? "brand.secondaryColor1"
														: "brand.white500"
												}
												borderRadius=".5rem"
												_hover={{
													borderColor: "brand.secondaryColor1",
												}}
											>
												{size}
											</Tag>
										))}
									</HStack>
								</Box>

								<Box mt="2rem">
									{/* TODO Check next comment */}
									{/* <Text
								fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
								fontWeight="600"
								color="brand.secondaryColor1"
							>
								Descripción:
							</Text> 
							<Text fontSize={["1.5rem", "1.5rem", "1.3rem", "1.5rem"]}>
                        {particularProductData?.data?.product?.desc} 
                    </Text> */}
									<HStack w="100%" gap="1rem">
										<Box w="100%" onClick={handleAddToCart}>
											<CustomButton
												{...{
													text: "Agregar al carrito",
													btnIcon: AiOutlineShoppingCart,
													py: ["2rem", "2.5rem"],
													bg: "transparent",
													color: "brand.color3",
													boxShadow: "0",
													border: ".2rem solid",
													borderColor: "brand.color3",
													fontSize: ["1.5rem", "1.8rem", "1.6rem", "1.8rem"],
													bgHover: "brand.white300",
													isBtnIcon: true,
												}}
											/>
										</Box>

										<Box w="100%" onClick={handleBuyNow}>
											<CustomButton
												{...{
													text: "Comprar",
													py: ["2rem", "2.5rem"],
													border: ".2rem solid",
													borderColor: "transparent",
												}}
											/>
										</Box>
									</HStack>
								</Box>
							</Box>
						</Box>
					)}
				</>
			)}
		</>
	);
};
