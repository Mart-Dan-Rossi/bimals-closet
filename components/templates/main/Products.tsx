import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { applyFilters } from "@/utils/functions";
import { SiteMainSections } from "@/utils/helpers";
import { Box, Flex, SimpleGrid, Text, useBoolean } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { ProductCard } from "../product/ProductCard";
import FilterButtons from "@/components/ui/FilterButtons";

interface Props {
	hideFilter?: boolean;
	section?: SiteMainSections;
}

export const Products = ({ hideFilter, section }: Props) => {
	const { filter, finalProductsData, isLoadingProductData } =
		useGlobalContext();

	const [sectionFilter, setSectionFilter] = useState<
		SiteMainSections | undefined
	>(section);

	const [filteredProductsData, setFilteredProductsData] =
		useState(finalProductsData);

	const [isLoadingFilters, { on: filtersLoaded, off: filtersLoading }] =
		useBoolean(false);

	useEffect(() => {
		if (finalProductsData) {
			filtersLoading();
			setFilteredProductsData(applyFilters(finalProductsData, filter, section));
			filtersLoaded();
		}
	}, [finalProductsData, filter, section]);

	return (
		<Box
			p="0"
			pt={!hideFilter ? "15rem" : ""}
			minH={"65vh"}
			bg={"brand.mainContenetBG"}
			position="relative"
			h="100%"
			overflow="hidden"
		>
			<Box maxW="1280px" mx="auto" pb="4rem">
				<Box p="3rem" pos="relative" zIndex="">
					<Box>
						{!hideFilter && (
							<FilterButtons
								filteredProductsData={filteredProductsData}
								section={section}
								sectionFilter={sectionFilter}
								setSectionFilter={setSectionFilter}
							/>
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
						{isLoadingFilters && isLoadingProductData ? (
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
								{filteredProductsData &&
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
