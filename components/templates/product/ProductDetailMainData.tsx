import {
	BoxCardLoader,
	TextLoader,
} from "@/components/animations/CustomLoader";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { FilterTagsDisplayer } from "@/components/ui/modals/FilterTagsDisplayer";
import { useGlobalContext } from "@/context/GlobalContext";
import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite";
import { useCartState } from "@/hooks/state/storage";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { CartItemMPFormat } from "@/types/order";
import { Product } from "@/types/product";
import {
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdAttachMoney } from "react-icons/md";
import { ColorOptions } from "./ColorOptions";
import { SizeOptions } from "./SizeOptions";
import SizeTableComparation from "./SizeTableComparation";

interface Props {
	isLoadingParticulaProductData: boolean;
	product?: Product;
}

export const ProductDetailMainData = ({
	isLoadingParticulaProductData,
	product,
}: Props) => {
	const { finalProductsData, isDarkMode } = useGlobalContext();
	const toast = useShowToast();

	const router = useRouter();

	const { addToCart } = useCartState((state) => state);

	const [selectedSize, setSelectedSize] = useState<string>("");
	const [selectedColor, setSelectedColor] = useState<string | undefined>("");

	const {
		isOpen: isSizeTableShown,
		onOpen: showSizeTable,
		onClose: hideSizeTable,
	} = useDisclosure();

	useEffect(() => {
		if (product?.sizeOptions[0].color)
			setSelectedColor(() => {
				return product?.sizeOptions[0].color;
			});
	}, [product]);

	const handleAddToCart = () => {
		const id = product?._id;
		const name = product?.name;
		const price = product?.price;
		const selectedSizeIndex = product?.sizeOptions.findIndex(
			(item) => item.usSize === Number(selectedSize)
		);

		if (selectedSizeIndex) {
			const sizeOption = product?.sizeOptions[selectedSizeIndex];
			const image = product?.images[0];

			if (id && name && price && image) {
				if (!sizeOption) {
					return toast({
						status: "error",
						title: "Selecciona un talle antes de agregarlo al carrito",
					});
				}

				const payload: CartItemMPFormat = {
					id,
					name: `${name} - ${selectedColor} - ${sizeOption.usSize}US`,
					unit_price: price,
					size: sizeOption.usSize,
					image: image,
					quantity: sizeOption.quantity,
				};
				addToCart(payload);
				toast({
					status: "success",
					title: "Agregado al carrito",
					description: `${name} ${selectedColor} ${sizeOption.usSize}US en el carrito!`,
				});
			}

			setSelectedColor(product?.sizeOptions[0].color);
			setSelectedSize("");
		}
	};

	function handlePurchaseButton() {
		if (!selectedSize) {
			return toast({
				status: "error",
				title: "Selecciona un talle antes de agregarlo al carrito",
			});
		}
		handleAddToCart();
		router.push("/cart");
	}

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
								color={isDarkMode ? "darkBrand.white100" : ""}
							>
								{product.name}
							</Text>
							<Flex
								align="center"
								justify="space-between"
								borderBottom="1px solid"
								borderColor={
									isDarkMode ? "darkBrand.white600" : "brand.white600"
								}
								pb="2rem"
								onClick={() => {
									if (product._id) toggleProductChecked(product?._id);
								}}
							>
								<Icon
									cursor="pointer"
									color={
										product?.isFavorite
											? isDarkMode
												? "darkBrand.red100"
												: "brand.red100"
											: isDarkMode
											? "darkBrand.secondaryColor2"
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
									color={
										isDarkMode ? "darkBrand.secondaryColor4" : "brand.color1"
									}
									fontSize={["2.5rem", "4.2rem", "2.5rem", "4.2rem"]}
									fontWeight="600"
								>
									AR$ {product.price}
								</Text>

								{product.tags && (
									<Flex>
										<FilterTagsDisplayer allTags={product.tags} />
									</Flex>
								)}

								<Box mt="2rem">
									<Flex justify={"flex-start"} gap={"1rem"}>
										<Text
											fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
											fontWeight="600"
											color={
												isDarkMode
													? "darkBrand.secondaryColor1"
													: "brand.secondaryColor1"
											}
										>
											Color:
										</Text>
									</Flex>
									<Flex>
										<ColorOptions
											product={product}
											selectedColor={selectedColor}
											select={setSelectedColor}
											resetSelectedSize={() => setSelectedSize("")}
										/>
									</Flex>
									<Flex justify={"flex-start"} gap={"1rem"} mt={"1rem"}>
										<Text
											fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
											fontWeight="600"
											color={
												isDarkMode
													? "darkBrand.secondaryColor1"
													: "brand.secondaryColor1"
											}
										>
											Talles (US)
										</Text>
										<Box display={["block", "none", "none", "none"]}>
											<Button
												onClick={showSizeTable}
												boxShadow="2px 2px 5px 0px rgba(0,0,0,0.75)"
												colorScheme="orange"
											>
												Tabla de talles
											</Button>
										</Box>
									</Flex>
									<SizeOptions
										selectedColor={selectedColor}
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
												color={
													isDarkMode
														? "darkBrand.secondaryColor1"
														: "brand.secondaryColor1"
												}
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
													color: isDarkMode
														? "darkBrand.white100"
														: "brand.white100",
													boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75)",
													border: ".2rem solid",
													borderColor: isDarkMode
														? "darkBrand.color2"
														: "brand.color2",
													fontSize: ["1.5rem", "1.8rem", "1.6rem", "1.8rem"],
													bgHover: isDarkMode
														? "darkBrand.white300"
														: "brand.white300",
													isBtnIcon: true,
												}}
											/>
										</Box>
										<Box w="100%" onClick={handlePurchaseButton}>
											<CustomButton
												{...{
													text: "Comprar",
													btnIcon: MdAttachMoney,
													py: ["2rem", "2.5rem"],
													bg: "transparent",
													color: isDarkMode
														? "darkBrand.white100"
														: "brand.white100",
													boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75)",
													border: ".2rem solid",
													borderColor: isDarkMode
														? "darkBrand.color2"
														: "brand.color2",
													fontSize: ["1.5rem", "1.8rem", "1.6rem", "1.8rem"],
													bgHover: isDarkMode
														? "darkBrand.white300"
														: "brand.white300",
													isBtnIcon: true,
												}}
											/>
										</Box>
									</HStack>
								</Box>
							</Box>
							<SizeTableComparation
								brand={product.brand}
								isOpen={isSizeTableShown}
								onClose={hideSizeTable}
								sizeOptions={product.sizeOptions}
							/>
						</Box>
					)}
				</>
			)}
		</>
	);
};
