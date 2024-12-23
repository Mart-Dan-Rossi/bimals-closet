import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite";
import { Product } from "@/types/product";
import {
	Box,
	Circle,
	Flex,
	Icon,
	Img,
	Link,
	Stack,
	Text,
} from "@chakra-ui/react";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface Props {
	product: Product;
	wishlistData: Product[];
}

export const WishlistProductCard = ({ product, wishlistData }: Props) => {
	const mapProducts = wishlistData?.map((item: Product) => {
		const res = {
			...item,
		};
		return res;
	});

	const { toggleProductChecked } = useToggleFavorite(mapProducts);
	return (
		<Flex
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

						<Box w="100%" onClick={() => toggleProductChecked(product?._id)}>
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
								product?.isFavorite ? "brand.red100" : "brand.secondaryColor2"
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
