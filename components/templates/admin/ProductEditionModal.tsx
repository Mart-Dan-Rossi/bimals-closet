import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { useCreateProduct } from "@/hooks/products/useProduct";
import { Product, SizeOptions } from "@/types/product";
import {
	Box,
	Button,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiAddCircleLine } from "react-icons/ri";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	editingProduct: boolean;
	item: Product | undefined;
}

export const ProductEditionModal = ({
	isOpen,
	onClose,
	editingProduct,
	item,
}: Props) => {
	const [name, setName] = useState<string | undefined>(item?.name);
	const [slug, setSlug] = useState<string | undefined>(item?.slug);
	const [images, setImages] = useState<string[] | undefined>(item?.images);
	const [price, setPrice] = useState<number | undefined>(item?.price);
	const [sizeOptions, setSizeOptions] = useState<SizeOptions | undefined>(
		item?.sizeOptions
	);
	const [desc, setDesc] = useState<string | undefined>(item?.desc);
	const [tags, setTags] = useState<string[] | undefined>(item?.tags);

	useEffect(() => {
		setName(undefined);
		setSlug(undefined);
		setImages(undefined);
		setPrice(undefined);
		setSizeOptions(undefined);
		setDesc(undefined);
		setTags(undefined);
	}, []);

	const [amountOfImages, setAmountOfImages] = useState<number>(1);
	const [amountOfSizes, setAmountOfSizes] = useState<number>(1);

	const { mutateAsync: addMutateAsyncCreateProduct } = useCreateProduct();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Product>();

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

	async function handleUploadProduct() {
		if (
			name &&
			slug &&
			images &&
			price &&
			sizeOptions &&
			checkIfEveryKeyHaveValue(sizeOptions)
		) {
			try {
				const product: Product = {
					name,
					slug,
					images,
					price,
					sizeOptions,
					desc,
					tags,
				};

				const res = editingProduct
					? () => {
							console.log("Editing product");
					  }
					: await addMutateAsyncCreateProduct(product);

				if (res?.status === "success") {
					toast({ status: "success", title: "Producto cargado correctamente" });
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					toast({
						status: "error",
						title:
							error?.response?.data?.message ||
							"Ha ocurrido un error! Intenta nuevamente más tarde",
					});
				}
			}
		} else {
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
			<ModalContent minWidth={"80%"}>
				<ModalHeader>Está seguro?</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box
						as="form"
						w={["100%", "100%", "100%", "80%", "56%"]}
						px="4rem"
						onSubmit={handleSubmit(handleUploadProduct)}
					>
						<Box my="2rem">
							<Text>Nombre:</Text>
							<CustomInput
								{...{
									id: "productName",
									placeholder: "Nombre",
									type: "text",
									formHook: register("name", {
										required: "Por favor introduce el nombre del producto",
									}),
									errorMessage: errors.name?.message as string,
								}}
							/>
						</Box>

						<Box my="2rem">
							<Text>Slug:</Text>
							<CustomInput
								{...{
									id: "productSlug",
									placeholder: "Slug",
									type: "text",
									formHook: register("slug", {
										required: "Por favor introduce un slug único",
									}),
									errorMessage: errors.slug?.message as string,
								}}
							/>
						</Box>
						<Box
							my="2rem"
							padding={"1rem"}
							borderRadius={"10px"}
							border={"1px solid black"}
						>
							<Text>Imágenes:</Text>
							{Array.from({ length: amountOfImages }).map((__, index) => {
								return (
									<Box key={`create-product-image-${index}`}>
										<CustomInput
											{...{
												id: `productImagesURL${index}`,
												placeholder: "URL de imágen",
												type: "text",
												formHook: register("images", {
													required: "Por favor introduce una URL",
												}),
												errorMessage: errors.images?.message as string,
											}}
										/>
									</Box>
								);
							})}
							<Button
								colorScheme="blue"
								onClick={() => {
									setAmountOfImages((prev) => prev + 1);
								}}
							>
								<Icon as={RiAddCircleLine} fontSize="2rem" />
							</Button>
						</Box>
						<Box my="2rem">
							<Text>Precio:</Text>
							<CustomInput
								{...{
									id: "productPrice",
									placeholder: "Precio",
									type: "number",
									formHook: register("price", {
										required: "Por favor el valor en pesos",
									}),
									errorMessage: errors.slug?.message as string,
								}}
							/>
						</Box>
						<Box
							my="2rem"
							padding={"1rem"}
							borderRadius={"10px"}
							border={"1px solid black"}
						>
							<Text>Imágenes:</Text>
							{Array.from({ length: amountOfSizes }).map((__, index) => {
								return (
									<Box key={`create-product-size-${index}`}>
										<CustomInput
											{...{
												id: `productSizeOption${index}`,
												placeholder: "Talle en US",
												type: "text",
												formHook: register("sizeOptions", {
													required: "Por favor introduce un talle",
												}),
												errorMessage: errors.images?.message as string,
											}}
										/>
									</Box>
								);
							})}
							<Button
								colorScheme="blue"
								margin={"0 auto"}
								onClick={() => {
									setAmountOfSizes((prev) => prev + 1);
								}}
							>
								<Icon as={RiAddCircleLine} fontSize="2rem" />
							</Button>
						</Box>
						<Box my="2rem">
							<Text>Descripción (Optativo):</Text>
							<CustomInput
								{...{
									id: "productDesc",
									placeholder: "Descripción",
									type: "text",
									errorMessage: errors.slug?.message as string,
									formHook: register("desc"),
								}}
							/>
						</Box>
						<Box my="2rem">
							<Text>Tags (Optativo):</Text>
							<CustomInput
								{...{
									id: "productTags",
									placeholder: "Tags",
									type: "text",
									errorMessage: errors.tags?.message as string,
									formHook: register("tags"),
								}}
							/>
						</Box>

						<CustomButton {...{ text: "Crear cuenta" }} />
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
