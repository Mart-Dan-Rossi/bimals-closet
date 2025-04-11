import { FilterTagsDisplayer } from "@/components/ui/modals/FilterTagsDisplayer";
import { useGlobalContext } from "@/context/GlobalContext";
import { useToggleFavorite } from "@/hooks/favorite/useToggleFavorite";
import { Product } from "@/types/product";
import { capitalize } from "@/utils/functions";
import { Box, Circle, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { ColorOptions } from "./ColorOptions";
import { SizeOptions } from "./SizeOptions";

interface Props {
	product: Product;
}

export const ProductCard = ({ product }: Props) => {
	const router = useRouter();
	const { finalProductsData } = useGlobalContext();

	const { toggleProductChecked, isProductChecked } = useToggleFavorite(
		finalProductsData ?? []
	);

	const [selectedColor, setSelectedColor] = useState<string | undefined>("");

	function handleOpenProductPage() {
		router.push(`/product/${product?.slug}`);
	}

	return (
		<Box key={product?._id} pos="relative">
			<Circle
				bg={"brand.white100"}
				p=".5rem"
				pos="absolute"
				left="15px"
				top="15px"
				cursor="pointer"
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
			<Box>
				<Box
					bg={"brand.lightGrey"}
					boxShadow="0px 4px 24px rgba(240, 240, 240, 0.6)"
					borderRadius="1rem"
					overflow="hidden"
				>
					<Box onClick={handleOpenProductPage} cursor="pointer">
						<Image
							src={`/assets/images/${product?.images[0]}`}
							width={300}
							height={200}
							objectFit="cover"
							alt="Imágen del producto"
						/>
					</Box>

					<Box p={["1rem", "2rem", "2rem", "2rem"]}>
						<Flex
							align={"start"}
							justify="space-between"
							flexDir={"column"}
							gap={2}
						>
							<Flex
								onClick={handleOpenProductPage}
								justify={"space-between"}
								width={"100%"}
								cursor="pointer"
								wrap={"wrap"}
							>
								<HStack>
									<Text
										color={"brand.secondaryColor1"}
										textAlign="left"
										maxW="200px"
										fontSize={["1.4rem", "1.5rem"]}
										fontWeight="600"
										isTruncated
									>
										{product?.name}
									</Text>
									<Text
										color={"brand.secondaryColor1"}
										textAlign="left"
										maxW="200px"
										fontSize={["1.4rem", "1.5rem"]}
										fontWeight="600"
										isTruncated
									>
										{capitalize(product.brand)}
									</Text>
								</HStack>
								<Text fontSize={["1.2rem", "1.3rem"]} fontWeight="500">
									AR$ {product?.price}
								</Text>
							</Flex>
							{product.tags && (
								<Flex>
									<FilterTagsDisplayer allTags={product.tags} />
								</Flex>
							)}
							<Flex>
								<ColorOptions
									product={product}
									selectedColor={selectedColor}
									select={setSelectedColor}
								/>
							</Flex>
							{selectedColor !== "" ? (
								<Box onClick={handleOpenProductPage} cursor="pointer">
									<SizeOptions
										selectedColor={selectedColor}
										product={product}
									/>
								</Box>
							) : (
								<Text>Selecciona un color para ver los talles disponibles</Text>
							)}
						</Flex>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
