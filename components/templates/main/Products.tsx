import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGetAllProducts } from "@/hooks/products/useProduct";
import { Product } from "@/types/product";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { ProductCard } from "../product/ProductCard";

export const Products = () => {
	// const { data: productData, isLoading: isLoadingProductData } =
	// 	useGetAllProducts();

	const productsData: Product[] = useGetAllProducts();
	const [isLoadingProductData, setIsLoadingProductData] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoadingProductData(false);
		}, 1000);
	}, []);

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
					<Flex align="center">
						<Image
							src="/assets/images/new-seal.svg"
							height={30}
							width={30}
							alt="Indicativo de nuevo"
						/>
						<Text fontWeight="600" ml="1rem">
							Últimos productos!
						</Text>
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
								{productsData.map((product: Product) => (
									<ProductCard
										key={`products-general-view-${product._id}-${product.slug}`}
										product={product}
										productsData={productsData}
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
