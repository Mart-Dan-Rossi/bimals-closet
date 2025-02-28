import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { CustomInput } from "@/components/ui/forms/CustomInput";
import { useCreateProduct } from "@/hooks/products/useProduct";
import {
	Product,
	//  SizeOptions
} from "@/types/product";
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
import { ChangeEvent, useEffect, useMemo, useState } from "react";
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
	const defaultItem = useMemo(
		() =>
			item || {
				name: "",
				slug: "",
				images: [],
				price: 0,
				sizeOptions: {},
				desc: "",
				tags: "",
			},
		[item]
	) as Product;
	const [name, setName] = useState(defaultItem?.name || "");
	const [slug, setSlug] = useState(defaultItem?.slug || "");
	const [images, setImages] = useState(defaultItem?.images || []);
	const [price, setPrice] = useState(defaultItem?.price || 0);
	const [sizeOptions, setSizeOptions] = useState(
		defaultItem?.sizeOptions || {}
	);
	const [desc, setDesc] = useState(defaultItem?.desc || "");
	const [tags, setTags] = useState(defaultItem?.tags || []);

	const [amountOfImages, setAmountOfImages] = useState<number>(1);
	// const [amountOfSizes, setAmountOfSizes] = useState<number>(1);
	const [amountOfTags, setAmountOfTags] = useState<number>(1);

	useEffect(() => {
		setName(defaultItem?.name || "");
		setSlug(defaultItem?.slug || "");
		setImages(defaultItem?.images || []);
		setPrice(defaultItem?.price || 0);
		setSizeOptions(defaultItem?.sizeOptions || {});
		setDesc(defaultItem?.desc || "");
		setTags(defaultItem?.tags || []);
		setAmountOfImages(1);
		// setAmountOfSizes(1)
		setAmountOfTags(0);
	}, [defaultItem]);

	const { mutateAsync: addMutateAsyncCreateProduct } = useCreateProduct();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Product>();

	const toast = useToast();

	async function handleUploadProduct() {
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
	}

	function handleSetName(e: ChangeEvent<HTMLInputElement>) {
		setName(e.target.value);
	}

	function handleSetSlug(e: ChangeEvent<HTMLInputElement>) {
		setSlug(e.target.value);
	}

	function handleSetImageIndex(
		index: number,
		e: ChangeEvent<HTMLInputElement>
	) {
		const imagesData = images;
		imagesData[index] = e.target.value;

		setImages(imagesData);
	}

	function handleSetPrice(e: ChangeEvent<HTMLInputElement>) {
		setPrice(Number(e.target.value));
	}

	function handleSetDescription(e: ChangeEvent<HTMLInputElement>) {
		setDesc(e.target.value);
	}

	function handleSetTagIndex(index: number, e: ChangeEvent<HTMLInputElement>) {
		const tagsData = tags;
		tagsData[index] = e.target.value;

		setTags(tagsData);
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
									value: name,
									defaultValue: name,
									onChange: handleSetName,
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
									value: slug,
									defaultValue: slug,
									onChange: handleSetSlug,
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
												value: images[index],
												defaultValue: images[index] || "",
												onChange: (e: ChangeEvent<HTMLInputElement>) =>
													handleSetImageIndex(index, e),
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
							<Text>Precio (AR$):</Text>
							<CustomInput
								{...{
									id: "productPrice",
									placeholder: "Precio",
									value: price,
									defaultValue: price,
									onChange: handleSetPrice,
									type: "number",
									formHook: register("price", {
										required: "Por favor el valor en pesos",
									}),
									errorMessage: errors.slug?.message as string,
								}}
							/>
						</Box>
						{/* <Box
							my="2rem"
							padding={"1rem"}
							borderRadius={"10px"}
							border={"1px solid black"}
						>
							<Text>SizeOptions:</Text>
							{Array.from({ length: amountOfSizes }).map((__, index) => {
								return (
									<Box key={`create-product-size-${index}`}>
										<CustomInput
											{...{
												id: `productSizeOption${index}`,
												placeholder: "Talle en US",
												defaultValue: sizeOptions,
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
						</Box> */}
						<Box my="2rem">
							<Text>Descripción (Optativo):</Text>
							<CustomInput
								{...{
									id: "productDesc",
									placeholder: "Descripción",
									value: desc,
									defaultValue: desc,
									onChange: handleSetDescription,
									type: "text",
									errorMessage: errors.slug?.message as string,
									formHook: register("desc"),
								}}
							/>
						</Box>
						<Box my="2rem">
							<Text>Tags (Optativo):</Text>
							{Array.from({ length: amountOfTags }).map((__, index) => {
								return (
									<Box key={`create-product-tags-${index}`}>
										<CustomInput
											{...{
												id: "productTags",
												placeholder: "Tags",
												value: tags[index],
												defaultValue: tags[index],
												onChange: (e: ChangeEvent<HTMLInputElement>) =>
													handleSetTagIndex(index, e),
												type: "text",
												errorMessage: errors.tags?.message as string,
												formHook: register("tags"),
											}}
										/>
									</Box>
								);
							})}
						</Box>

						<CustomButton {...{ text: "Crear cuenta" }} />
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
