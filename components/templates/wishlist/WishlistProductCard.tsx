import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { Box, Circle, Flex, Icon, Img, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
	GoHeart,
	// GoHeart,
	GoHeartFill,
} from "react-icons/go";

interface Props {
	product: Product;
}

export const WishlistProductCard = ({ product }: Props) => {
	const router = useRouter();
	const { isDarkMode } = useGlobalContext();

	// const mapProducts = wishlistData?.map((item: Product) => {
	// 	const res = {
	// 		...item,
	// 		isFavorite: true,
	// 	};
	// 	return res;
	// });

	return (
		<Flex
			bg={isDarkMode ? "darkBrand.color2" : "brand.color2"}
			borderRadius="1rem"
			p="1rem"
			justify="space-between"
			mb="2rem"
		>
			<Flex w="100%">
				<Box
					cursor="pointer"
					onClick={() => router.push(`/product/${product?.slug}`)}
				>
					<Box overflow="hidden" borderRadius="1rem">
						<Img
							width="140px"
							height="140px"
							src={`/assets/images/${product?.images[0]}`}
							alt="Imágen del producto"
						/>
					</Box>
				</Box>

				<Flex w="100%" justify="space-between" pos="relative">
					<Stack
						w={["100%", "30%"]}
						ml="2rem"
						flexDir="column"
						spacing="1.2rem"
					>
						<Box
							cursor="pointer"
							onClick={() => router.push(`/product/${product?.slug}`)}
						>
							<Text
								fontSize="1.8rem"
								fontWeight="300"
								color={
									isDarkMode
										? "darkBrand.secondaryColor1"
										: "brand.secondaryColor1"
								}
							>
								{product?.name}
							</Text>
						</Box>

						<Flex align="center">
							<Text
								fontSize="1.7rem"
								fontWeight="600"
								color={isDarkMode ? "darkBrand.color3" : "brand.color3"}
							>
								AR$ {product?.price?.toFixed(2)}{" "}
							</Text>
						</Flex>
					</Stack>

					<Circle
						bg={isDarkMode ? "darkBrand.white100" : "brand.white100"}
						p=".5rem"
						pos="absolute"
						right="0"
						top=".1rem"
					>
						<Icon
							color={`${
								product?.isFavorite
									? isDarkMode
										? "darkBrand.red100"
										: "brand.red100"
									: isDarkMode
									? "darkBrand.secondaryColor2"
									: "brand.secondaryColor2"
							}`}
							fontSize="1.5rem"
							as={product?.isFavorite ? GoHeartFill : GoHeart}
						/>
					</Circle>
				</Flex>
			</Flex>
		</Flex>
	);
};
