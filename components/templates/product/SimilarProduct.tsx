import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGlobalContext } from "@/context/GlobalContext";
import { useGetAllProducts } from "@/hooks/products/useProduct";
import { Product } from "@/types/product";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export const SimilarProduct = () => {
	// const { data: productData, isLoading: isLoadingProductData } =
	// 	useGetAllProducts();

	const { currentSizeType } = useGlobalContext();

	const productsData = useGetAllProducts();

	const [isLoadingProductData, setIsLoadingProductData] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadingProductData(false);
		}, 1000);
	}, []);

	const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

	const shuffleArray = (array: Product[]) => {
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

	// useEffect(() => {
	// 	if (productData) {
	// 		const shuffled = shuffleArray(productData?.data?.products);
	// 		setShuffledProducts(shuffled);
	// 	}
	// }, [productData]);

	useEffect(() => {
		if (productsData) {
			const shuffled = shuffleArray(productsData).filter((product) => {
				if (currentSizeType === "any") {
					return true;
				}
				return Object.keys(product.sizeOptions).includes(currentSizeType);
			});
			setShuffledProducts(shuffled);
		}
		// }, [productsData]);
	}, [currentSizeType]);

	console.log("productsData: ", productsData);

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
								<ProductCard
									product={product}
									productsData={shuffledProducts}
								/>
							)}
						</Fragment>
					))}
			</SimpleGrid>
		</Box>
	);
};
