import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { applyFilters } from "@/utils/functions";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { ProductCard } from "../product/ProductCard";

interface Props {
	hideFilter?: boolean;
}

export const Products = ({ hideFilter }: Props) => {
	const { filter, finalProductsData, isLoadingProductData } =
		useGlobalContext();

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

			setFinalProductsData(applyFilters(filteredProducts, filter));
		}
	}, [finalProductsData, filter]);

	return (
		<Box
			p="0"
			bg={"brand.mainContenetBG"}
			position="relative"
			h="100%"
			overflow="hidden"
		>
			<Box maxW="1280px" mx="auto" pb="4rem">
				<Box p="3rem" pos="relative" zIndex="">
					<Box>
						{!hideFilter && (
							<Flex gap={"2rem"}>
								<BsFilterLeft color="white" />
								<Button>Talle</Button>
								<Button>Color</Button>
								<Button>Otros</Button>
							</Flex>
						)}

						{hideFilter && (
							<Flex align="center">
								<Text
									color={"brand.white100"}
									fontWeight="600"
									ml="1rem"
									userSelect={"none"}
								>
									ÚLTIMOS LANZAMIENTOS
								</Text>
							</Flex>
						)}
					</Box>

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
