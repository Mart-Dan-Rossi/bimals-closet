import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export const SimilarProduct = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { finalProductsData, isLoadingProductData } = useGlobalContext();

	const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

	const shuffleArray = (array: Product[] | undefined) => {
		if (!array) return [];

		const shuffledArray = [...array];
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			];
		}
		return shuffledArray;
	};

	useEffect(() => {
		if (finalProductsData) {
			const shuffled = shuffleArray(getSimilarProducts());
			setShuffledProducts(shuffled);
		}
	}, [finalProductsData, slug]);

	function getSimilarProducts() {
		const currentProduct = finalProductsData?.find(
			(product) => product.slug === slug
		);

		const filteredProducts = finalProductsData?.filter((product) => {
			const tagsFiltering = product.tags?.some(
				(tag) => currentProduct?.tags?.includes(tag)
			);

			const sizeFiltering = Object.keys(product.sizeOptions || {}).some(
				(key) => {
					return currentProduct?.sizeOptions[key]?.some(
						(num) => product.sizeOptions[key]?.includes(num)
					);
				}
			);

			return tagsFiltering || sizeFiltering;
		});

		return filteredProducts;
	}

	return (
		<Box maxW="1280px" mx="auto" px="3rem" pb="8rem" pt="3rem">
			<Text fontWeight="600" fontSize="2.5rem">
				Podrían interesarte
			</Text>

			<SimpleGrid columns={[2, 3, 3, 4]} gap="2rem" mt="2rem">
				{shuffledProducts
					?.slice(0, 4)
					.map((product: Product) => (
						<Fragment key={product?._id}>
							{isLoadingProductData ? (
								<BoxCardLoader rounded=".6rem" h={["230px", "300px"]} />
							) : (
								<ProductCard product={product} />
							)}
						</Fragment>
					))}
			</SimpleGrid>
		</Box>
	);
};
