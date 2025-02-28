import { useGlobalContext } from "@/context/GlobalContext";
import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite";
import { Product } from "@/types/product";
import { Box, Circle, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { SizeOptions } from "./SizeOptions";

interface Props {
	product: Product;
}

export const ProductCard = ({ product }: Props) => {
	const { finalProductsData } = useGlobalContext();

	const { toggleProductChecked, isProductChecked } = useToggleFavorite(
		finalProductsData ?? []
	);

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
					onClick={() => {
						if (product._id) toggleProductChecked(product?._id);
					}}
					color={`${
						product._id && isProductChecked(product._id)
							? "brand.red100"
							: "brand.secondaryColor2"
					}`}
					fontSize="1.5rem"
					as={
						product._id && isProductChecked(product._id) ? GoHeartFill : GoHeart
					}
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
						src={`/assets/images/${product?.images[0]}`}
						width={300}
						height={200}
						objectFit="cover"
						alt="Imágen del producto"
					/>

					<Box p={["1rem", "2rem", "2rem", "2rem"]}>
						<Flex
							align={"start"}
							justify="space-between"
							flexDir={"column"}
							gap={2}
						>
							<Flex justify={"space-between"} width={"100%"}>
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
										AR$ {product?.price}
									</Text>
								</Box>
							</Flex>
							<SizeOptions product={product} />
						</Flex>
					</Box>
				</Box>
			</Link>
		</Box>
	);
};
