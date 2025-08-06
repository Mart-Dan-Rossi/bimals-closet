import {
	useAdminCancelReservation,
	useManualPurchaseHanlding,
} from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Product, ReservedData } from "@/types/product";
import {
	calculateReservationTimeLeft,
	capitalize,
	copyToClipboard,
	isReservationOnTime,
} from "@/utils/functions";
import {
	Box,
	Flex,
	Icon,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

interface Props {
	item: Product;
}

const ProductReservationsManaggement = ({ item }: Props) => {
	const { reservedData, slug } = item;
	const toast = useToast();
	const token = useHydratedStoreState("token");

	const { mutateAsync: addMutateAsyncAdminCancelReservation } =
		useAdminCancelReservation();
	const { mutateAsync: addMutateAsyncManualPurchase } =
		useManualPurchaseHanlding();

	const [interactedReservation, setInteractedReservation] = useState<
		ReservedData | undefined
	>();

	const {
		isOpen: isConfirmCancelReservationModalOpen,
		onOpen: onOpenConfirmCancelReservationModal,
		onClose: onCloseConfirmCancelReservationModal,
	} = useDisclosure();

	const {
		isOpen: isConfirmCreateOrderModalOpen,
		onOpen: onOpenConfirmCreateOrderModal,
		onClose: onCloseConfirmCreateOrderModal,
	} = useDisclosure();

	const validReservations = reservedData?.filter((reservation) => {
		return isReservationOnTime(reservation);
	});

	function shortString(str: string | undefined) {
		if (!str) return "unknown";
		if (str.length <= 8) return str;
		return `${str.slice(0, 4)}...${str.slice(-4)}`;
	}

	async function handleCancelReservation() {
		if (interactedReservation) {
			const { userId, usSize, color } = interactedReservation;
			if (userId && token) {
				await addMutateAsyncAdminCancelReservation({
					payload: {
						slug,
						userId,
						usSize,
						color,
					},
					token,
				});
			}
		}
	}

	async function handleManualPurchase() {
		if (interactedReservation) {
			const { userId, usSize, color, quantity } = interactedReservation;

			if (userId && token) {
				const itemCopy = { ...item };
				itemCopy.sizeOptions = [{ usSize, color, quantity }];

				await addMutateAsyncManualPurchase({
					payload: { userId, products: [itemCopy] },
					token,
				});
			}
		}
	}

	function handleBinButton(reservation: ReservedData) {
		setInteractedReservation(reservation);
		onOpenConfirmCancelReservationModal();
	}

	function handleCashButton(reservation: ReservedData) {
		setInteractedReservation(reservation);
		onOpenConfirmCreateOrderModal();
	}

	function handleCopyUserIdToClipboard(reservation: ReservedData) {
		if (reservation.userId) {
			copyToClipboard(reservation.userId);
			toast({
				title: "UserId copiado al portapapeles",
				description: `UserId: ${reservation.userId}`,
				status: "success",
			});
		}
	}

	return (
		<VStack minW="300px" bg="brand.white400" borderRadius="1rem" p={4}>
			<Text textAlign="center" color="brand.white100">
				Reservas
			</Text>
			<TableContainer overflowX="auto" w="100%">
				<Table display={{ base: "none", md: "table" }}>
					<Thead>
						<Tr>
							<Th color="brand.white100">User ID</Th>
							<Th color="brand.white100">Talle</Th>
							<Th color="brand.white100">Color</Th>
							<Th color="brand.white100">Cant</Th>
							<Th color="brand.white100">Restante</Th>
							<Th color="brand.white100">Comprado</Th>
							<Th color="brand.white100">Cancelar</Th>
						</Tr>
					</Thead>
					<Tbody>
						{validReservations?.map((reservation) => (
							<Tr
								key={`01-${reservation.userId}-${reservation.timestamp}-${reservation.color}-${reservation.usSize}`}
							>
								<Tooltip
									fontSize={"small"}
									hasArrow
									placement="top-start"
									label={reservation.userId}
								>
									<Td
										onClick={() => handleCopyUserIdToClipboard(reservation)}
										cursor="pointer"
										color="brand.white100"
										isTruncated
										fontFamily="small"
									>
										{shortString(reservation.userId)}
									</Td>
								</Tooltip>
								<Td color="brand.white100">{reservation.usSize}</Td>
								<Td color="brand.white100">{capitalize(reservation.color)}</Td>
								<Td color="brand.white100">{reservation.quantity}</Td>
								<Td color="brand.white100">
									{calculateReservationTimeLeft(reservation.timestamp)}
								</Td>

								<Td>
									<Icon
										onClick={() => handleCashButton(reservation)}
										as={BsCurrencyDollar}
										fontSize="2rem"
										cursor="pointer"
										color={"brand.white100"}
									/>
								</Td>
								<Td>
									<Icon
										onClick={() => handleBinButton(reservation)}
										as={RiDeleteBinLine}
										fontSize="2rem"
										cursor="pointer"
										color={"brand.white100"}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<Stack display={{ base: "flex", md: "none" }} spacing={4}>
				{validReservations?.map((reservation) => (
					<Box
						key={`02-${reservation.userId}-${reservation.timestamp}-${reservation.color}-${reservation.usSize}`}
						p={3}
						borderWidth="1px"
						borderRadius="lg"
					>
						<Text>
							<b>User:</b> {reservation.userId}
						</Text>
						<Text>
							<b>Talle:</b> {reservation.usSize}
						</Text>
						<Text>
							<b>Color:</b> {reservation.color}
						</Text>
						<Text>
							<b>Cantidad:</b> {reservation.quantity}
						</Text>
						<Text>
							<b>Tiempo:</b>
							{calculateReservationTimeLeft(reservation.timestamp)}
						</Text>
						<Flex justifyContent="space-around" mt="1rem">
							<Icon
								border="1px solid black"
								borderRadius="10px"
								padding="3px"
								onClick={() => handleCashButton(reservation)}
								as={BsCurrencyDollar}
								fontSize="2rem"
								cursor="pointer"
								color={"brand.white100"}
							/>
							<Icon
								border="1px solid black"
								borderRadius="10px"
								padding="3px"
								onClick={() => handleBinButton(reservation)}
								as={RiDeleteBinLine}
								fontSize="2rem"
								cursor="pointer"
								color={"brand.white100"}
							/>
						</Flex>
					</Box>
				))}
			</Stack>
			<ConfirmDeleteModal
				isOpen={isConfirmCreateOrderModalOpen}
				onClose={onCloseConfirmCreateOrderModal}
				handler={() => handleManualPurchase()}
				text={"Seguro que este producto fue vendido?"}
			/>
			<ConfirmDeleteModal
				isOpen={isConfirmCancelReservationModalOpen}
				onClose={onCloseConfirmCancelReservationModal}
				handler={() => handleCancelReservation()}
				text={"Seguro que quiere eliminar esta reserva?"}
			/>
		</VStack>
	);
};

export default ProductReservationsManaggement;
