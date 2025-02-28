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
} from "@chakra-ui/react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	deletingProduct: boolean;
	handler: () => void;
}

export const ConfirmDeleteModal = ({
	deletingProduct,
	handler,
	isOpen,
	onClose,
}: Props) => {
	function confirmDelete() {
		handler();
		onClose();
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Está seguro?</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>
						Desea borrar de forma permanente{" "}
						{deletingProduct ? "este producto" : "este talle"}?
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
