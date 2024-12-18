import { useParticularProduct } from "@/hooks/products/useProduct";
import { Box, Icon, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { ProductDetailImages } from "./ProductDetailImages";
import { ProductDetailMainData } from "./ProductDetailMainData";

export const ProductDetails = () => {
	const router = useRouter();
	const { slug } = router.query;

	// const {
	// data: particularProductData,
	// 	isLoading: isLoadingParticulaProductData,
	// } = useParticularProduct(slug as string);

	const particularProductData = useParticularProduct(slug as string);

	const [isLoadingParticulaProductData, setIsLoadingParticulaProductData] =
		useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadingParticulaProductData(false);
		}, 1000);
	}, []);

	return (
		<Box pt="15rem" bg="brand.white100">
			<Box maxW="1280px" mx="auto" px="3rem">
				<Box as="span" mb="2rem" onClick={() => router.back()}>
					<Icon as={BiChevronLeft} fontSize="3rem" cursor="pointer" />
				</Box>

				<SimpleGrid
					columns={[1, 2, 2, 2]}
					gap="4rem"
					borderBottom="1px solid"
					borderColor="brand.white600"
					pb="2rem"
				>
					<ProductDetailImages
						isLoadingParticulaProductData={isLoadingParticulaProductData}
						particularProductData={particularProductData}
					/>

					<ProductDetailMainData
						isLoadingParticulaProductData={isLoadingParticulaProductData}
						particularProductData={particularProductData}
					/>
				</SimpleGrid>
			</Box>
		</Box>
	);
};
