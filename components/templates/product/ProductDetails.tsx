import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";
import { useParticularProduct } from "@/hooks/products/useProduct";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ProductDetailImages } from "./ProductDetailImages";
import { ProductDetailMainData } from "./ProductDetailMainData";

export const ProductDetails = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: product, isLoading: isLoadingParticulaProductData } =
		useParticularProduct(slug as string);

	return (
		<Box pt="15rem" bg={"brand.lightGrey"} minH={"65vh"}>
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
