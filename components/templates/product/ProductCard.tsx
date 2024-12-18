import { Box, Circle, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { GoHeart, GoHeartFill } from "react-icons/go";
import {
	MapProduct,
	useToggleFavorite,
} from "@/hooks/favorite/useToggleFavorite";

interface Props {
	product: Product;
	productsData: Product[];
}

export const ProductCard = ({ product, productsData }: Props) => {
	// const mapProducts = productData?.data?.products?.map((item: Product) => {
	const mapProducts: MapProduct[] = productsData?.map((item) => {
		const res = {
			...item,
		};
		return res;
	});

	const { toggleProductChecked, isProductChecked } =
		useToggleFavorite(mapProducts);

	return (
		<Box key={product?._id} pos="relative" cursor="pointer">
			<Circle
				bg="brand.white100"
				p=".5rem"
				pos="absolute"
				left="15px"
				top="15px"
			>
				<Icon
					onClick={() => toggleProductChecked(product?._id)}
					color={`${
						isProductChecked(product._id)
							? "brand.red100"
							: "brand.secondaryColor2"
					}`}
					fontSize="1.5rem"
					as={isProductChecked(product._id) ? GoHeartFill : GoHeart}
				/>
			</Circle>
			<Link href={`/product/${product?.slug}`}>
				<Box
					bg="brand.white100"
					boxShadow="0px 4px 24px rgba(240, 240, 240, 0.6)"
					borderRadius="1rem"
					overflow="hidden"
				>
					<Image
						// src={product?.image[0]}
						src={product?.image}
						width={300}
						height={200}
						// objectFit="cover"
						alt="Imágen del producto"
					/>

					<Box p={["1rem", "2rem", "2rem", "2rem"]}>
						<Flex
							align={["left", "center"]}
							justify="space-between"
							flexDir={["column", "row"]}
						>
							<Text
								color="brand.secondaryColor1"
								textAlign="left"
								maxW="200px"
								fontSize={["1.4rem", "1.5rem"]}
								fontWeight="600"
								isTruncated
							>
								{product?.name}
							</Text>
							<Box>
								<Text
									fontSize={["1.2rem", "1.3rem"]}
									fontWeight="500"
									color="brand.blue100"
								>
									ARS {product?.price}
								</Text>
							</Box>
						</Flex>
					</Box>
				</Box>
			</Link>
		</Box>
	);
};
