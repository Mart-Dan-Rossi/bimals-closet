import { useGlobalContext } from "@/context/GlobalContext";
import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite";
import { Product } from "@/types/product";
import { getDefaultImage } from "@/utils/functions";
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

	const { finalProductsData } = useGlobalContext();

	const { toggleProductChecked, isProductChecked } = useToggleFavorite(
		finalProductsData ?? []
	);

	return (
		<Flex
			bg={"brand.cartCardBG"}
			borderRadius="1rem"
			p="1rem"
			justify="space-between"
			mb="2rem"
			color={"brand.white100"}
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
							src={`/assets/images/${getDefaultImage(product.images)}`}
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
							<Text fontSize="1.8rem" fontWeight="300">
								{product?.name}
							</Text>
						</Box>

						<Flex align="center">
							<Text fontSize="1.7rem" fontWeight="600">
								AR$ {product?.price?.toFixed(2)}{" "}
							</Text>
						</Flex>
					</Stack>

					<Circle
						cursor={"pointer"}
						bg={"brand.white100"}
						p=".5rem"
						pos="absolute"
						right="0"
						top=".1rem"
						onClick={() => {
							if (product._id) toggleProductChecked(product?._id);
						}}
					>
						<Icon
							color={`${
								product?.isFavorite ? "brand.red100" : "brand.secondaryColor2"
							}`}
							fontSize="1.5rem"
							as={
								product._id && isProductChecked(product._id)
									? GoHeartFill
									: GoHeart
							}
						/>
					</Circle>
				</Flex>
			</Flex>
		</Flex>
	);
};
