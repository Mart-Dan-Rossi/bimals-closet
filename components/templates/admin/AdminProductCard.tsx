import { Product } from "@/types/product";
import { Box, Flex, Icon, Img, Stack, Text } from "@chakra-ui/react";
import { SetStateAction } from "react";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { AdminCardProductQuantity } from "./AdminCardProductQuantity";

interface Props {
	item: Product;
	setIsDeleteProduct: React.Dispatch<SetStateAction<boolean>>;
	onOpenConfirmDeleteModal: () => void;
	onOpenAddNewProduct: () => void;
	setProductToInteractWith: React.Dispatch<SetStateAction<Product | undefined>>;
	setEditingProduct: React.Dispatch<SetStateAction<boolean>>;
	setSizeToDelete: React.Dispatch<
		SetStateAction<{ sizeOption: string; sizeToDelete: number } | undefined>
	>;
}

export const AdminProductCard = ({
	item,
	setIsDeleteProduct,
	onOpenConfirmDeleteModal,
	onOpenAddNewProduct,
	setProductToInteractWith,
	setEditingProduct,
	setSizeToDelete,
}: Props) => {
	// function handleAddSize() {
	// 	console.log("Add size");
	// }

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

	function openDeleteSizeModal(sizeOption: string, sizeToDelete: number) {
		setProductToInteractWith(item);
		setSizeToDelete({ sizeOption, sizeToDelete });
		setIsDeleteProduct(false);
		onOpenConfirmDeleteModal();
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
					<Text
						fontSize="1.8rem"
						fontWeight="300"
						color="brand.secondaryColor1"
					>
						{item?.name}
					</Text>
					<Flex align="center">
						<Text
							fontSize="1.7rem"
							fontWeight="600"
							color="brand.secondaryColor1"
						>
							AR$ {item?.price?.toFixed(2)}{" "}
						</Text>
					</Flex>
					<Text
						fontSize="1.4rem"
						fontWeight="600"
						color="brand.secondaryColor1"
					>
						{`Talles (${Object.keys(item.sizeOptions)[0]}):`}
					</Text>
					<Flex direction={"column"} align={"center"}>
						{Object.keys(item.sizeOptions).map((sizeOption, index) => {
							return (
								<Box key={`admin-card-product-quantity-container-${index}`}>
									{index === 0 && (
										<>
											<AdminCardProductQuantity
												item={item}
												sizeOption={sizeOption}
												openDeleteSizeModal={openDeleteSizeModal}
											/>
										</>
									)}
								</Box>
							);
						})}

						{/* <Icon
							onClick={handleAddSize}
							as={AiFillPlusSquare}
							fontSize="2rem"
							cursor="pointer"
							color="brand.color1"
						/> */}
					</Flex>
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
