import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { applyFilters } from "@/utils/functions";
import { SiteMainSections } from "@/utils/helpers";
import {
	Box,
	Flex,
	SimpleGrid,
	Text,
	useBoolean,
	Button,
} from "@chakra-ui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
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
	const [filteredProductsData, setFilteredProductsData] = useState<Product[]>(
		[]
	);
	const [isLoadingFilters, { on: filtersLoading, off: filtersLoaded }] =
		useBoolean(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	useEffect(() => {
		if (finalProductsData && finalProductsData.length > 0) {
			filtersLoading();

			const filtered = applyFilters(finalProductsData, filter, section);

			setFilteredProductsData(filtered);
			setCurrentPage(1);
			filtersLoaded();
		}
	}, [finalProductsData, filter, section]);

	const sortedProducts = useMemo(() => {
		return [...filteredProductsData]
			.sort((a, b) => {
				if (hideFilter && a.createdAt && b.createdAt) {
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				}
				return 0;
			})
			.slice(0, hideFilter ? 8 : filteredProductsData.length);
	}, [filteredProductsData]);

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

	const paginatedProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
	}, [sortedProducts, currentPage]);

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
						{!hideFilter ? (
							<FilterButtons
								filteredProductsData={filteredProductsData}
								section={section}
								sectionFilter={sectionFilter}
								setSectionFilter={setSectionFilter}
							/>
						) : (
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
						{isLoadingFilters || isLoadingProductData ? (
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
								{paginatedProducts.map(
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
					{!hideFilter && totalPages > 1 && (
						<Flex
							justifyContent={"center"}
							gap={"1rem"}
							alignItems={"flex-end"}
						>
							<Button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								isDisabled={currentPage === 1}
								colorScheme="whiteAlpha"
								variant="solid"
								size="lg"
							>
								Anterior
							</Button>

							<Flex mt="2rem" justify="center" gap="0.5rem" wrap="wrap">
								{Array.from({ length: totalPages }).map((_, index) => {
									const pageNum = index + 1;
									return (
										<Button
											key={pageNum}
											onClick={() => setCurrentPage(pageNum)}
											bg={
												currentPage === pageNum ? "brand.secondary" : "gray.600"
											}
											color="white"
											size="lg"
											fontWeight="bold"
											_hover={{ bg: "brand.secondary" }}
										>
											{pageNum}
										</Button>
									);
								})}
							</Flex>
							<Button
								onClick={() => setCurrentPage((prev) => Math.max(prev + 1, 1))}
								isDisabled={currentPage === totalPages}
								colorScheme="whiteAlpha"
								variant="solid"
								size="lg"
							>
								Siguiente
							</Button>
						</Flex>
					)}
				</Box>
			</Box>
		</Box>
	);
};
