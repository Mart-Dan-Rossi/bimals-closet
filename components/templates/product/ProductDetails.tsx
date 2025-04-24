import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";
import { useParticularProduct } from "@/hooks/products/useProduct";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductDetailImages } from "./ProductDetailImages";
import { ProductDetailMainData } from "./ProductDetailMainData";
import { useEffect, useState } from "react";

export const ProductDetails = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: product, isLoading: isLoadingParticulaProductData } =
		useParticularProduct(slug as string);

	const [selectedColor, setSelectedColor] = useState<string | undefined>();

	useEffect(() => {
		setSelectedColor(product?.sizeOptions[0].color);
	}, [product]);

	return (
		<Box pt="15rem" minH={"65vh"} bg={"brand.lightGrey"}>
			{product ? (
				<Box maxW="1280px" mx="auto" px="3rem">
					<PreviousPageButton />

					<SimpleGrid
						columns={[1, 2, 2, 2]}
						gap="4rem"
						borderBottom="1px solid"
						borderColor={"brand.white600"}
						pb="2rem"
					>
						<ProductDetailImages
							isLoadingParticulaProductData={isLoadingParticulaProductData}
							product={product}
							selectedColor={selectedColor}
						/>

						<ProductDetailMainData
							isLoadingParticulaProductData={isLoadingParticulaProductData}
							product={product}
							selectedColor={selectedColor}
							setSelectedColor={setSelectedColor}
						/>
					</SimpleGrid>
				</Box>
			) : (
				<Box maxW="1280px" mx="auto" px="3rem">
					<PreviousPageButton />

					<Text fontWeight={"600"} fontSize={"larger"}>
						Producto no encontrado
					</Text>
				</Box>
			)}
		</Box>
	);
};
