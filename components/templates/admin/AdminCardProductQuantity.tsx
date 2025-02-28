import { Product } from "@/types/product";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

interface Props {
	item: Product;
	sizeOption: string;
	openDeleteSizeModal: (sizeOption: string, sizeToDelete: number) => void;
}

export const AdminCardProductQuantity = ({
	sizeOption,
	item,
	openDeleteSizeModal,
}: Props) => {
	function handleDecreaceQuantity(prevQuantity: number, size: number) {
		if (prevQuantity === 0) {
			openDeleteSizeModal(sizeOption, size);
		} else {
			// decreaceQuantity();
		}
	}

	function handleIncreaseQuantity() {
		console.log("increaseQuantity");
	}

	return (
		<Flex pl={2} align="left" direction={"column"} gap={2}>
			{item.sizeOptions[sizeOption].map((sizeData, index) => {
				return (
					<Flex
						key={`admin-card-product-quantity-${index}`}
						align="space-between"
						ml="1rem"
						gap={6}
					>
						<Text
							fontSize="1.4rem"
							fontWeight="600"
							color="brand.secondaryColor1"
							minWidth={"2rem"}
						>
							{`${item.sizeOptions[sizeOption][index].size}`}
						</Text>
						<Text
							fontSize="1.4rem"
							fontWeight="600"
							color="brand.secondaryColor1"
						>
							Cantidad:
						</Text>
						<Icon
							onClick={() =>
								handleDecreaceQuantity(sizeData.quantity, sizeData.size)
							}
							as={
								sizeData.quantity === 0 ? RiDeleteBinLine : AiOutlineMinusCircle
							}
							fontSize="2rem"
							cursor={"pointer"}
							opacity={sizeData.quantity === 0 ? 0 : 1}
							color={
								sizeData.quantity === 0
									? "brand.secondaryColor2"
									: "brand.color1"
							}
						/>
						<Text mx="1rem">{sizeData.quantity}</Text>
						<Icon
							onClick={handleIncreaseQuantity}
							as={AiFillPlusCircle}
							fontSize="2rem"
							cursor="pointer"
							color="brand.color1"
						/>
					</Flex>
				);
			})}
		</Flex>
	);
};
