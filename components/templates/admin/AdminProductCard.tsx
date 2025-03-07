import { Product } from "@/types/product";
import { Box, Flex, Icon, Img, Stack, Tag, Text } from "@chakra-ui/react";
import { SetStateAction } from "react";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { DisplayColorSizesAndQuantityInputsContainer } from "../product/DisplayColorSizesAndQuantityInputsContainer";
import { capitalize } from "@/utils/functions";
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
	// function handleAddSize() {
	// 	console.log("Add size");
	// }

	const { onOpenFiltersDrawer } = useGlobalContext();

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
			bg="brand.secondaryColor5"
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

				<Stack ml="2rem" flexDir="column" spacing="1.2rem">
					<Flex gap={"2rem"}>
						<Text
							fontSize="1.8rem"
							fontWeight="600"
							color="brand.secondaryColor1"
						>
							{item?.name} {item.brand && capitalize(item.brand)}
						</Text>
						{item.tags &&
							item.tags.map((tag) => (
								<Tag
									key={`${item.slug}-${tag}-tag`}
									cursor={"pointer"}
									onClick={onOpenFiltersDrawer}
								>
									{capitalize(tag)}
								</Tag>
							))}
					</Flex>
					<Flex align="center">
						<Text
							fontSize="1.7rem"
							fontWeight="600"
							color="brand.secondaryColor1"
						>
							AR$ {item?.price?.toFixed(2)}
						</Text>
					</Flex>

					<DisplayColorSizesAndQuantityInputsContainer item={item} />
				</Stack>
			</Flex>

			<Flex>
				<Icon
					onClick={openProductEditionModal}
					as={RiPencilLine}
					fontSize="2rem"
					cursor="pointer"
					color="brand.secondaryColor2"
				/>
				<Icon
					onClick={openDeleteProductModal}
					as={RiDeleteBinLine}
					fontSize="2rem"
					cursor="pointer"
					color="brand.secondaryColor2"
				/>
			</Flex>
		</Flex>
	);
};
