import { useCreateProduct } from "@/hooks/products/useProduct";
import { Product, SizeOptions } from "@/types/product";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export const AddNewProductModal = ({ isOpen, onClose }: Props) => {
	const [name, setName] = useState<string | undefined>();
	const [slug, setSlug] = useState<string | undefined>();
	const [images, setImages] = useState<string[] | undefined>();
	const [price, setPrice] = useState<number | undefined>();
	const [sizeOptions, setSizeOptions] = useState<SizeOptions | undefined>();
	const [desc, setDesc] = useState<string | undefined>();
	const [tags, setTags] = useState<string[] | undefined>();

	function unbrakeCode() {
		setName(undefined);
		setSlug(undefined);
		setImages(undefined);
		setPrice(undefined);
		setSizeOptions(undefined);
		setDesc(undefined);
		setTags(undefined);
	}

	useEffect(() => {
		unbrakeCode();
	}, []);

	const { mutateAsync: addMutateAsync } = useCreateProduct();

	const toast = useToast();

	function checkIfEveryKeyHaveValue(obj: SizeOptions) {
		return (
			Object.keys(obj)
				.map((key: string) => {
					return obj[key];
				})
				.filter((valor) => valor === undefined).length !==
			Object.keys(obj).length
		);
	}

	function handleAddProduct() {
		if (
			name &&
			slug &&
			images &&
			price &&
			sizeOptions &&
			checkIfEveryKeyHaveValue(sizeOptions)
		) {
			const product: Product = {
				name,
				slug,
				images,
				price,
				sizeOptions,
				desc,
				tags,
			};
			addMutateAsync(product);
		}
		{
			const singlePropMissing =
				[name && slug && images && price && sizeOptions].filter(Boolean)
					.length === 1;
			toast({
				status: "error",
				title: "Falta alguna propiedad",
				description: `Falta${!singlePropMissing && "n"} la${
					!singlePropMissing && "s"
				} siguiente${!singlePropMissing && "s"} característica${
					!singlePropMissing && "s"
				}: ${!name && "Nombre"} ${!slug && "Identificador"} ${
					!images && "Imagenes"
				} ${!price && "Precio"} ${!sizeOptions && "Opciones de talle"} ${
					sizeOptions &&
					!checkIfEveryKeyHaveValue(sizeOptions) &&
					"Algún talle fue puesto pero se le asignó un valor"
				}`,
			});
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Está seguro?</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{/* <Text>
						Desea borrar de forma permanente{" "}
						{deletingProduct ? "este producto" : "este talle"}?
					</Text> */}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Cancelar
					</Button>
					<Button colorScheme="red" onClick={handleAddProduct}>
						Confirmar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
