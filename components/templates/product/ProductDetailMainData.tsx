import {
	BoxCardLoader,
	TextLoader,
} from "@/components/animations/CustomLoader";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { FilterTagsDisplayer } from "@/components/ui/modals/FilterTagsDisplayer";
import { useGlobalContext } from "@/context/GlobalContext";
import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { useCartState } from "@/hooks/state/storage";
import { useShowToast } from "@/hooks/toast/useShowToast";
import { standardBoxShadow } from "@/styles/themes/foundation/globalStyles";
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
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
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
	const { finalProductsData } = useGlobalContext();
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

	const token = useHydratedStoreState("token");

	const handleAddToCart = () => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : undefined;
		const userId = user ? user.id : undefined;

		if (!userId) {
			return toast({
				status: "error",
				title: "Debes estar logueado para agregar un producto al carrito",
			});
		}

		const id = product?._id;
		const name = product?.name;
		const price = product?.price;
		const selectedSizeIndex = product?.sizeOptions.findIndex(
			(item) => item.usSize === Number(selectedSize)
		);

		if (selectedSizeIndex || typeof selectedSizeIndex === "number") {
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
								{product.name.toUpperCase()}
							</Text>
							<Flex
								align="center"
								justify="space-between"
								borderBottom="1px solid"
								borderColor={"brand.white600"}
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
									fontSize={["1.2rem", "2.2rem", "1.2rem", "2.2rem"]}
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
									{selectedColor !== "" ? (
										<>
											<Flex justify={"flex-start"} gap={"1rem"} mt={"1rem"}>
												<Text
													fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
													fontWeight="600"
												>
													Talles (US)
												</Text>
												<Box display={["block", "none", "none", "none"]}>
													<Button
														onClick={showSizeTable}
														boxShadow={standardBoxShadow}
														colorScheme="blackAlpha"
														marginBottom={".5rem"}
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
										</>
									) : (
										<Flex justify={"flex-start"} gap={"1rem"} mt={"1rem"}>
											<Text
												fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
												fontWeight="600"
											>
												Talles (US)
											</Text>
											<Text color="red" marginTop={"2rem"} fontWeight={"600"}>
												Selecciona un color para ver los talles
											</Text>
										</Flex>
									)}
								</Box>

								<Box mt="2rem">
									{product.desc && (
										<>
											<Text
												fontSize={["1.6rem", "1.8rem", "1.5rem", "1.8rem"]}
												fontWeight="600"
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
													isBtnIcon: true,
												}}
											/>
										</Box>
										<Box w="100%" onClick={() => router.push("/cart")}>
											<CustomButton
												{...{
													text: "Ir al carrito",
													btnIcon: FaArrowRight,
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
