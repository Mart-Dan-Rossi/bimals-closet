import { RectangularCardLoader } from "@/components/animations/CustomLoader";
import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useGetMyFavorites } from "@/hooks/favorite/useFavorite";
import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Product } from "@/types/product";
import {
	Box,
	Center,
	Circle,
	Flex,
	Icon,
	Img,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FaGhost } from "react-icons/fa";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlineDisabledByDefault } from "react-icons/md";

export const Wishlist = () => {
	const router = useRouter();
	const token = useHydratedStoreState("token");
	const { data: wishlistData, isLoading: isLoadingWishlistData } =
		useGetMyFavorites();

	const mapProducts = wishlistData?.map((item: Product) => {
		const res = {
			...item,
		};
		return res;
	});

	const { toggleProductChecked } = useToggleFavorite(mapProducts);

	return (
		<Box pt="15rem" pb="5rem">
			<Box maxW="880px" mx="auto" px="3rem">
				<Box as="span" mb="2rem" onClick={() => router.back()}>
					<Icon as={BiChevronLeft} fontSize="3rem" cursor="pointer" />
				</Box>

				{token ? (
					<Fragment>
						{wishlistData?.length == 0 && (
							<Center flexDir="column" h="42vh">
								<Icon
									as={FaGhost}
									fontSize="10rem"
									color="brand.color1"
									opacity="0.4"
								/>
								<Text mt="1rem" fontWeight="300" textAlign="center">
									Lista de deseos vacía? Comienza a agregar produtos ahora!
								</Text>
							</Center>
						)}
					</Fragment>
				) : (
					<Center flexDir="column" h="42vh">
						<Icon
							as={MdOutlineDisabledByDefault}
							fontSize="10rem"
							color="brand.color1"
							opacity="0.4"
						/>
						<Text mt="1rem" fontWeight="300" textAlign="center">
							Esta función es exclusiva para usuarios logueados. Conéctacte para
							usar nuestra plataforma plenamente y disfrutar la experiencia de
							compra aún más.
						</Text>
						<Link href="/auth/login">
							<Box w="100%">
								<CustomButton
									{...{
										text: "Conectar",
										py: ["2rem", "2rem"],
										px: "4rem",
										border: ".2rem solid",
										borderColor: "transparent",
									}}
								/>
							</Box>
						</Link>
					</Center>
				)}

				{token ? (
					<Fragment>
						{isLoadingWishlistData ? (
							<Fragment>
								{Array(3)
									.fill(0)
									.map((_, idx) => (
										<RectangularCardLoader
											key={idx}
											rounded=".6rem"
											h="160px"
											mt="1rem"
										/>
									))}
							</Fragment>
						) : (
							<Fragment>
								{wishlistData?.map((product: Product) => (
									<Flex
										key={product?._id}
										bg="brand.secondaryColor5"
										borderRadius="1rem"
										p="1rem"
										justify="space-between"
										mb="2rem"
									>
										<Flex w="100%">
											<Link href={`/product/${product?.slug}`}>
												<Box overflow="hidden" borderRadius="1rem">
													<Img
														width="140px"
														height="140px"
														// src={product?.image[0]}
														src={product?.image}
														alt="Imágen del producto"
													/>
												</Box>
											</Link>

											<Flex w="100%" justify="space-between" pos="relative">
												<Stack
													w={["100%", "30%"]}
													ml="2rem"
													flexDir="column"
													spacing="1.2rem"
												>
													<Link href={`/product/${product?.slug}`}>
														<Text
															fontSize="1.8rem"
															fontWeight="300"
															color="brand.secondaryColor1"
														>
															{product?.name}
														</Text>
													</Link>

													<Flex align="center">
														<Text
															fontSize="1.7rem"
															fontWeight="600"
															color="brand.secondaryColor1"
														>
															ARS {product?.price?.toFixed(2)}{" "}
														</Text>
													</Flex>

													<Box
														w="100%"
														onClick={() => toggleProductChecked(product?._id)}
													>
														<CustomButton
															{...{
																text: "Quitar de lista de deseados",
																py: ["2rem", "2rem"],
																bg: "transparent",
																color: "brand.color3",
																boxShadow: "0",
																border: ".2rem solid",
																borderColor: "brand.color3",
																fontSize: ["1.3rem", "1.5rem"],
																bgHover: "brand.white300",
															}}
														/>
													</Box>
												</Stack>

												<Circle
													bg="brand.white100"
													p=".5rem"
													pos="absolute"
													right="0"
													top=".1rem"
												>
													<Icon
														color={`${
															product?.isFavorite
																? "brand.red100"
																: "brand.secondaryColor2"
														}`}
														fontSize="1.5rem"
														as={product?.isFavorite ? GoHeartFill : GoHeart}
													/>
												</Circle>
											</Flex>
										</Flex>
									</Flex>
								))}
							</Fragment>
						)}
					</Fragment>
				) : null}
			</Box>
		</Box>
	);
};
