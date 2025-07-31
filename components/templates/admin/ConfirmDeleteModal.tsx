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
import { Dispatch, SetStateAction } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	handler: () => void;
	text: string;
	setPreferenceId?: Dispatch<SetStateAction<null>>;
	setBuyButtonClicked?: Dispatch<SetStateAction<boolean>>;
}

export const ConfirmDeleteModal = ({
	isOpen,
	onClose,
	setPreferenceId,
	setBuyButtonClicked,
	handler,
	text,
}: Props) => {
	function confirmDelete() {
		if (setPreferenceId) {
			setPreferenceId(null);
		}
		if (setBuyButtonClicked) {
			setBuyButtonClicked(false);
		}
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
					<Text>{text}</Text>
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
