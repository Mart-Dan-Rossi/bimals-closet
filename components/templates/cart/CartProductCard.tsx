import { useCartState } from "@/hooks/state/storage";
import { capitalize } from "@/utils/functions";
import { ClothSizesOptions } from "@/utils/productCaracteristics";
import { Box, Flex, Icon, Img, Switch, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";

interface Props {
	name: string;
	unit_price: number;
	quantity: number;
	usSize: number | ClothSizesOptions;
	color: string;
	removeFromCart?: (
		id: string,
		color: string,
		size: string,
		name: string
	) => void;
	id?: string;
	slug?: string;
	image?: string;
	showDeliveredIndicator?: boolean;
	isDelivered?: boolean | undefined;
	setPreferenceId: Dispatch<SetStateAction<null | any>>;
	setBuyButtonClicked: Dispatch<SetStateAction<boolean>>;
}

export const CartProductCard = ({
	name,
	unit_price,
	quantity,
	usSize,
	color,
	id,
	slug,
	image,
	showDeliveredIndicator,
	isDelivered,
	setPreferenceId,
	setBuyButtonClicked,
}: Props) => {
	const router = useRouter();

	const { removeFromCart } = useCartState((state) => state);

	function handleTrashButton() {
		if (removeFromCart && id) {
			setBuyButtonClicked(false);
			setPreferenceId(null);
			removeFromCart(id, color, usSize.toString(), name);
		}
	}

	function handleEditButton() {
		if (removeFromCart && id) {
			removeFromCart(id, color, usSize.toString(), name);
			router.push(`/product/${slug}`);
		}
	}

	return (
		<Flex
			bg={"brand.cartCardBG"}
			borderRadius="1rem"
			p="1rem"
			justify="space-between"
			mb="2rem"
			color="brand.white200"
		>
			<Flex alignItems="center">
				{image && (
					<Box overflow="hidden">
						<Img
							width="140px"
							height="140px"
							src={`/assets/images/${image}`}
							alt="Imágen de producto"
							borderRadius="1rem"
						/>
					</Box>
				)}

				<Flex ml="2rem" flexDir="column">
					<Text fontSize="1.8rem" fontWeight="bolder">
						{name.split("-")[0]}
					</Text>
					<Flex align="center" mt="1.2rem">
						<Text fontSize="1.6rem" fontWeight="normal">
							AR$ {unit_price?.toFixed(2)}{" "}
						</Text>
						<Text ml=".5rem" fontSize="1.5rem" fontWeight="normal">
							{quantity &&
								quantity > 1 &&
								`x ${quantity} = AR$ ${(unit_price * quantity).toFixed(2)}`}
						</Text>
					</Flex>
					<Flex align="center">
						<Text fontSize="1.4rem" fontWeight="normal">
							Talle (US):
						</Text>
						<Text as="span" fontWeight="normal" ml=".5rem">
							{usSize}
						</Text>
					</Flex>

					<Flex alignItems={"center"}>
						<Text fontSize="1.4rem" fontWeight="normal">
							Color:
						</Text>
						<Text ml={"0.5rem"}>{capitalize(color)}</Text>
					</Flex>
					<Flex align="center">
						<Text
							display={"inline-block"}
							fontSize="1.4rem"
							fontWeight="normal"
						>
							Cantidad:{" "}
							<Text display={"inline-block"} fontWeight="normal">
								{quantity}
							</Text>
						</Text>
					</Flex>
				</Flex>
			</Flex>

			<Flex alignItems="flex-start">
				{showDeliveredIndicator ? (
					<Flex alignItems="center">
						<Text mr="1rem">Enviado:</Text>
						<Switch isChecked={isDelivered} disabled={true} size="lg" />
					</Flex>
				) : (
					<>
						<Box onClick={handleEditButton}>
							<Icon as={RiPencilLine} fontSize="2rem" cursor="pointer" />
						</Box>
						<Box onClick={handleTrashButton}>
							<Icon as={RiDeleteBinLine} fontSize="2rem" cursor="pointer" />
						</Box>
					</>
				)}
			</Flex>
		</Flex>
	);
};
