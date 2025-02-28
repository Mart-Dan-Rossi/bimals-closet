import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { ProductCard } from "../product/ProductCard";
import { ConfigSizeFormatButton } from "./ConfigSizeFormatButton";
import { FiltersButton } from "./FiltersButton";

export const Products = () => {
	const { currentSizeType, filter, finalProductsData, isLoadingProductData } =
		useGlobalContext();

	const [filteredProductsData, setFinalProductsData] =
		useState(finalProductsData);

	useEffect(() => {
		if (finalProductsData) {
			const filteredProducts = finalProductsData.filter((product) => {
				let passAllFilters =
					currentSizeType === "any" ||
					Object.keys(product.sizeOptions).includes(currentSizeType);

				if (filter) {
					if (passAllFilters && filter.sizeOptions) {
						const sizeOptionsKey = Object.keys(filter.sizeOptions)[0]; // Should only have 1 and never be "any"
						if (sizeOptionsKey === currentSizeType) {
							const isOverMin = product.sizeOptions[sizeOptionsKey]?.some(
								(sizeData) => {
									if (
										filter.sizeOptions &&
										filter.sizeOptions[sizeOptionsKey]
									) {
										return (
											sizeData.size >= filter.sizeOptions[sizeOptionsKey].min
										);
									}
								}
							);

							const isUnderMax = product.sizeOptions[sizeOptionsKey]?.some(
								(sizeData) => {
									if (
										filter.sizeOptions &&
										filter.sizeOptions[sizeOptionsKey]
									) {
										return (
											sizeData.size <= filter.sizeOptions[sizeOptionsKey].max
										);
									}
								}
							);

							passAllFilters = !!(isOverMin && isUnderMax);
						}
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
			bg="brand.white300"
			position="relative"
			h="100%"
			overflow="hidden"
		>
			<Box maxW="1280px" mx="auto" pb="4rem">
				{/* Grid background decorative */}
				<Box pos="absolute" top="310px" left="-100px">
					<Image
						width={200}
						height={200}
						src="/assets/images/product-bg.png"
						alt="Fondo de productos"
					/>
				</Box>

				<Box p="3rem" pos="relative" zIndex="">
					<Flex justify={"space-between"}>
						<Flex align="center">
							<Image
								src="/assets/images/new-seal.svg"
								height={30}
								width={30}
								alt="Indicativo de nuevo"
							/>
							<Text fontWeight="600" ml="1rem" userSelect={"none"}>
								Nuevos productos!
							</Text>
						</Flex>
						<Flex>
							<FiltersButton />
							<ConfigSizeFormatButton />
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
									filteredProductsData.map((product: Product) => (
										<ProductCard
											key={`products-general-view-${product._id}-${product.slug}`}
											product={product}
										/>
									))}
							</Fragment>
						)}
					</SimpleGrid>
				</Box>
			</Box>
		</Box>
	);
};
