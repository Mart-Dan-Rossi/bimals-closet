import { useGlobalContext } from "@/context/GlobalContext";
import { Box, Flex, Img } from "@chakra-ui/react";
import AdminProductDataDisplay from "../admin/AdminProductDataDisplay";
import { Product } from "@/types/product";

interface Props {
	userReservedProducts: Product[];
}

const ReservedProductsTab = ({ userReservedProducts }: Props) => {
	const { isDarkMode } = useGlobalContext();

	return (
		<>
			{userReservedProducts.map((item) => {
				return (
					<Flex
						key={`reservedProductsTab-${item._id}`}
						bg={isDarkMode ? "darkBrand.dark200" : "brand.secondaryColor5"}
						borderRadius="1rem"
						p="1rem"
						justify="space-between"
						mb="2rem"
					>
						<Flex>
							<Box overflow="hidden" borderRadius="1rem">
								<Img
									width="140px"
									height="140px"
									src={`/assets/images/${item?.images[0]}`}
									alt="Imágen de producto"
								/>
							</Box>

							<AdminProductDataDisplay
								name={item.name}
								sizeOptions={item.sizeOptions}
								price={item.price}
								brand={item.brand}
								tags={item.tags}
								slug={item.slug}
								allowTagFiltering={false}
							/>
						</Flex>
					</Flex>
				);
			})}
		</>
	);
};

export default ReservedProductsTab;
