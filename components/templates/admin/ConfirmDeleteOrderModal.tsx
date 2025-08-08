import { useAdminDeleteBEOrder } from "@/hooks/orders/useBEOrders";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { OrderDataBEFormat } from "@/types/order";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	orderData: OrderDataBEFormat;
	onOpenShowDeletedOrderModal: () => void;
	setDeletedOrderData: Dispatch<SetStateAction<OrderDataBEFormat | undefined>>;
}

export const ConfirmDeleteOrderModal = ({
	isOpen,
	onClose,
	orderData,
	onOpenShowDeletedOrderModal,
	setDeletedOrderData,
}: Props) => {
	const { mutateAsync: addMutateAsynceDeleteBEOrder } = useAdminDeleteBEOrder();

	const toast = useToast();

	const token = useHydratedStoreState("token");

	async function confirmDelete() {
		if (!token) {
			toast({
				status: "error",
				title: "Se requiere estar logueado para realizar esta acción",
			});
			return;
		}
		try {
			const res = await addMutateAsynceDeleteBEOrder({
				payload: orderData,
				token,
			});

			if (res?.status === "success") {
				toast({
					status: "success",
					title: "Órden eliminada correctamente",
				});
			}

			setDeletedOrderData(orderData);
			onOpenShowDeletedOrderModal();
			onClose();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast({
					status: "error",
					title:
						error?.response?.data?.error.message ||
						"Ha ocurrido un error! Intenta nuevamente más tarde",
				});
			}
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Está seguro?</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text color={"brand.red100"}>
						Borrar la órden no agrega los productos nuevamente!
					</Text>
					<Text color={"brand.red100"} mt="1rem">
						Podría descoordinar alguna entrega.
					</Text>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Cancelar
					</Button>
					<Button colorScheme="red" onClick={confirmDelete}>
						Confirmar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
