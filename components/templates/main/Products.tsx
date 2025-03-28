import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { ProductCard } from "../product/ProductCard";
import { FiltersButton } from "./FiltersButton";

export const Products = () => {
	const {
		currentSizeType,
		filter,
		finalProductsData,
		isLoadingProductData,
		isDarkMode,
	} = useGlobalContext();

	const [filteredProductsData, setFinalProductsData] =
		useState(finalProductsData);

	useEffect(() => {
		if (finalProductsData) {
			const filteredProducts = finalProductsData.filter((product) => {
				let passAllFilters = true;

				if (filter) {
					if (passAllFilters && filter.sizeOptions) {
						const isOverMin = product.sizeOptions?.some((sizeData) => {
							if (filter.sizeOptions && filter.sizeOptions.usSize) {
								return sizeData.usSize >= filter.sizeOptions.usSize.min;
							}
						});

						const isUnderMax = product.sizeOptions?.some((sizeData) => {
							if (filter.sizeOptions && filter.sizeOptions.usSize) {
								return sizeData.usSize <= filter.sizeOptions.usSize.max;
							}
						});

						passAllFilters = !!(isOverMin && isUnderMax);
					}
				}

				return passAllFilters;
			});

			setFinalProductsData(filteredProducts);
		}
	}, [finalProductsData, filter, currentSizeType]);

	return (
		<Box
			p="0"
			bg={isDarkMode ? "darkBrand.color2" : "brand.color1"}
			position="relative"
			h="100%"
			overflow="hidden"
		>
			<Box maxW="1280px" mx="auto" pb="4rem">
				{/* Grid background decorative */}
				{!isDarkMode && (
					<Box pos="absolute" top="310px" left="-100px">
						<Image
							width={200}
							height={200}
							src="/assets/images/product-bg.png"
							alt="Fondo de productos"
						/>
					</Box>
				)}

				<Box p="3rem" pos="relative" zIndex="">
					<Flex justify={"space-between"}>
						<Flex align="center">
							{/* <Image
								src="/assets/images/new-seal.svg"
								height={30}
								width={30}
								alt="Indicativo de nuevo"

							/> */}
							<Text
								color={isDarkMode ? "darkBrand.white100" : "brand.white100"}
								fontWeight="600"
								ml="1rem"
								userSelect={"none"}
							>
								{/* Nuevos productos! */}
								Nuestros productos!
							</Text>
						</Flex>
						<Flex>
							<FiltersButton />
						</Flex>
					</Flex>

					<SimpleGrid columns={[2, 3, 3, 4]} gap="2rem" mt="1rem">
						{isLoadingProductData ? (
							<Fragment>
								{Array(4)
									.fill(0)
									.map((_, idx) => (
										<BoxCardLoader
											key={idx}
											rounded=".6rem"
											h={["230px", "300px"]}
										/>
									))}
							</Fragment>
						) : (
							<Fragment>
								{/* {productsData?.data?.products?.map((product: Product) => ( */}
								{filteredProductsData &&
									finalProductsData &&
									filteredProductsData.map(
										(product: Product) =>
											product._id && (
												<ProductCard
													key={`products-general-view-${product._id}-${product.slug}`}
													product={product}
												/>
											)
									)}
							</Fragment>
						)}
					</SimpleGrid>
				</Box>
			</Box>
		</Box>
	);
};
