import { Product } from "@/types/product";
import { Box, Flex, Icon, Img, Stack, Text } from "@chakra-ui/react";
import { SetStateAction } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { AdminCardProductQuantity } from "./AdminCardProductQuantity";

interface Props {
	item: Product;
	setIsDeleteProduct: React.Dispatch<SetStateAction<boolean>>;
	onOpen: () => void;
	setProductToDelete: React.Dispatch<SetStateAction<Product | undefined>>;
	setSizeToDelete: React.Dispatch<
		SetStateAction<{ sizeOption: string; sizeToDelete: number } | undefined>
	>;
}

export const AdminProductCard = ({
	item,
	setIsDeleteProduct,
	onOpen,
	setProductToDelete,
	setSizeToDelete,
}: Props) => {
	function handleAddSize() {
		console.log("Add size");
	}

	function openDeleteProductModal() {
		setProductToDelete(item);
		setIsDeleteProduct(true);
		onOpen();
	}

	function openDeleteSizeModal(sizeOption: string, sizeToDelete: number) {
		setProductToDelete(item);
		setSizeToDelete({ sizeOption, sizeToDelete });
		setIsDeleteProduct(false);
		onOpen();
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
								<>
									{index === 0 && (
										<>
											<AdminCardProductQuantity
												item={item}
												sizeOption={sizeOption}
												openDeleteSizeModal={openDeleteSizeModal}
											/>
										</>
									)}
								</>
							);
						})}

						<Icon
							onClick={handleAddSize}
							as={AiFillPlusSquare}
							fontSize="2rem"
							cursor="pointer"
							color="brand.color1"
						/>
					</Flex>
				</Stack>
			</Flex>

			<Box>
				<Icon
					onClick={openDeleteProductModal}
					as={RiDeleteBinLine}
					fontSize="2rem"
					cursor="pointer"
					color="brand.secondaryColor2"
				/>
			</Box>
		</Flex>
	);
};
