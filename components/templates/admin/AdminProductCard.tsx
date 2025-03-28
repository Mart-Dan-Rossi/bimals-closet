import { Product } from "@/types/product";
import { Box, Flex, Icon, Img } from "@chakra-ui/react";
import { SetStateAction } from "react";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import AdminProductDataDisplay from "./AdminProductDataDisplay";
import { useGlobalContext } from "@/context/GlobalContext";

interface Props {
	item: Product;
	setIsDeleteProduct: React.Dispatch<SetStateAction<boolean>>;
	onOpenConfirmDeleteModal: () => void;
	onOpenAddNewProduct: () => void;
	setProductToInteractWith: React.Dispatch<SetStateAction<Product | undefined>>;
	setEditingProduct: React.Dispatch<SetStateAction<boolean>>;
}

export const AdminProductCard = ({
	item,
	setIsDeleteProduct,
	onOpenConfirmDeleteModal,
	onOpenAddNewProduct,
	setProductToInteractWith,
	setEditingProduct,
}: Props) => {
	const { isDarkMode } = useGlobalContext();

	function openDeleteProductModal() {
		setProductToInteractWith(item);
		setIsDeleteProduct(true);
		onOpenConfirmDeleteModal();
	}

	function openProductEditionModal() {
		setProductToInteractWith(item);
		setEditingProduct(true);
		onOpenAddNewProduct();
	}

	return (
		<Flex
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
					allowTagFiltering={true}
				/>
			</Flex>

			<Flex>
				<Icon
					onClick={openProductEditionModal}
					as={RiPencilLine}
					fontSize="2rem"
					cursor="pointer"
					color={
						isDarkMode ? "darkBrand.secondaryColor5" : "brand.secondaryColor2"
					}
				/>
				<Icon
					onClick={openDeleteProductModal}
					as={RiDeleteBinLine}
					fontSize="2rem"
					cursor="pointer"
					color={
						isDarkMode ? "darkBrand.secondaryColor5" : "brand.secondaryColor2"
					}
				/>
			</Flex>
		</Flex>
	);
};
