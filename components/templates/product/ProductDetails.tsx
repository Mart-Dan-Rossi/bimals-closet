import { useParticularProduct } from "@/hooks/products/useProduct";
import { Box, Icon, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";
import { ProductDetailImages } from "./ProductDetailImages";
import { ProductDetailMainData } from "./ProductDetailMainData";
import { useGlobalContext } from "@/context/GlobalContext";

export const ProductDetails = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { isDarkMode } = useGlobalContext();

	const { data: product, isLoading: isLoadingParticulaProductData } =
		useParticularProduct(slug as string);

	return (
		<Box pt="15rem" bg={isDarkMode ? "darkBrand.white300" : "brand.white300"}>
			<Box maxW="1280px" mx="auto" px="3rem">
				<Box as="span" mb="2rem" onClick={() => router.back()}>
					<Icon
						as={BiChevronLeft}
						fontSize="3rem"
						cursor="pointer"
						color={isDarkMode ? "darkBrand.white100" : ""}
					/>
				</Box>

				<SimpleGrid
					columns={[1, 2, 2, 2]}
					gap="4rem"
					borderBottom="1px solid"
					borderColor={isDarkMode ? "darkBrand.white600" : "brand.white600"}
					pb="2rem"
				>
					<ProductDetailImages
						isLoadingParticulaProductData={isLoadingParticulaProductData}
						product={product}
					/>

					<ProductDetailMainData
						isLoadingParticulaProductData={isLoadingParticulaProductData}
						product={product}
					/>
				</SimpleGrid>
			</Box>
		</Box>
	);
};
