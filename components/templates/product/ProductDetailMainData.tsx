import {
	BoxCardLoader,
	TextLoader,
} from "@/components/animations/CustomLoader";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";
import { CartItem, useCartState } from "@/hooks/state/storage";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { Product } from "@/types/product";
import { getPropperSizeType, getSizeName } from "@/utils/functions";
import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { ConfigSizeFormatButton } from "../main/ConfigSizeFormatButton";
import { SizeOptions } from "./SizeOptions";
import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite";

interface Props {
	isLoadingParticulaProductData: boolean;
	product?: Product;
}

export const ProductDetailMainData = ({
	isLoadingParticulaProductData,
	product,
}: Props) => {
	const { finalProductsData } = useGlobalContext();
	const toast = useShowToast();

	const router = useRouter();

	const { currentSizeType, sizeTypes } = useGlobalContext();

	const { addToCart } = useCartState((state) => state);

	const [selectedSize, setSelectedSize] = useState<string>("");

	const handleAddToCart = () => {
		const id = product?._id;
		const name = product?.name;
		const price = product?.price;
		const image = product?.images[0];

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
				sizeType: getPropperSizeType(currentSizeType, sizeTypes),
				price,
				quantity: 1,
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

	const { toggleProductChecked, isProductChecked } = useToggleFavorite(
		finalProductsData ?? []
	);

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
					{product && (
						<Box>
							<Text
								fontSize={["2.5rem", "3.2rem", "2.5rem", "3.2rem"]}
								fontWeight="600"
							>
								{product.name}
							</Text>
							<Flex
								align="center"
								justify="space-between"
								borderBottom="1px solid"
								borderColor="brand.white600"
								pb="2rem"
								onClick={() => {
									if (product._id) toggleProductChecked(product?._id);
								}}
							>
								<Icon
									cursor="pointer"
									color={
										product?.isFavorite
											? "brand.red100"
											: "brand.secondaryColor2"
									}
									fontSize="2rem"
									as={
										product._id && isProductChecked(product._id)
											? GoHeartFill
											: GoHeart
									}
								/>
							</Flex>

							<Box>
								<Text
									color="brand.blue100"
									fontSize={["2.5rem", "4.2rem", "2.5rem", "4.2rem"]}
									fontWeight="600"
								>
									AR$ {product.price}
								</Text>

								<Box mt="2rem">
									<Flex justify={"flex-start"} gap={"1rem"}>
										<Text
											fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
											fontWeight="600"
											color="brand.secondaryColor1"
										>
											Talles ({getSizeName(product, currentSizeType)})
										</Text>
										<ConfigSizeFormatButton />
									</Flex>
									<SizeOptions
										product={product}
										selectedSize={selectedSize}
										select={setSelectedSize}
									/>
								</Box>

								<Box mt="2rem">
									{product.desc && (
										<>
											<Text
												fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
												fontWeight="600"
												color="brand.secondaryColor1"
											>
												Descripción:
											</Text>
											<Text fontSize={["1.5rem", "1.5rem", "1.3rem", "1.5rem"]}>
												{product?.desc}
											</Text>
										</>
									)}
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
