import { Product } from "@/types/product";
import { Box, Flex, Img } from "@chakra-ui/react";
import ProductDataDisplay from "../admin/ProductDataDisplay";

interface Props {
	userReservedProducts: Product[];
}

const ReservedProductsTab = ({ userReservedProducts }: Props) => {
	return (
		<>
			{userReservedProducts.map((item) => {
				return (
					<Flex
						key={`reservedProductsTab-${item._id}`}
						bg={"brand.headerBG"}
						borderRadius="1rem"
						color={"brand.white100"}
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

							<ProductDataDisplay
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
