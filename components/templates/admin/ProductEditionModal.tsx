import { CustomButton } from "@/components/ui/buttons/CustomButton";
import {
	useCreateProduct,
	useUpdateProduct,
} from "@/hooks/products/useProduct";
import { Product } from "@/types/product";
import { Brand } from "@/utils/sizesEquivalencies";
import {
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BrandSelector } from "./BrandSelector";
import { DescriptionInput } from "./DescriptionInput";
import { ImagesInputsContainer } from "./ImagesInputsContainer";
import { NameInput } from "./NameInput";
import { PriceInput } from "./PriceInput";
import { ProductStockEdited } from "./ProductStockEditer";
import { SlugInput } from "./SlugInput";
import { TagsInputs } from "./TagsInputs";
import { useGlobalContext } from "@/context/GlobalContext";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	editingProduct: boolean;
	item: Product | undefined;
}

export const inputStyles = {
	border: "1px solid #EAEAEA",
	borderRadius: "1rem",
	py: "2rem",
	fontSize: "1.6rem",
	_placeholder: {
		fontWeight: 500,
		fontSize: "1.3rem",
		color: "brand.secondaryColor1",
	},
	_focus: {
		borderColor: "brand.color1",
		boxShadow: "none",
	},
	_hover: {
		borderColor: "none",
	},
};

export const ProductEditionModal = ({
	isOpen,
	onClose,
	editingProduct,
	item,
}: Props) => {
	const { finalProductsData } = useGlobalContext();

	const defaultItem = useMemo(
		() =>
			item || {
				name: "",
				slug: "",
				images: [],
				price: 0,
				brand: "other",
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
	const [brand, setBrand] = useState(defaultItem?.brand || "other");
	const [sizeOptions, setSizeOptions] = useState(
		defaultItem?.sizeOptions || {}
	);
	const [desc, setDesc] = useState(defaultItem?.desc || "");
	const [tags, setTags] = useState(defaultItem?.tags || []);

	const [amountOfImages, setAmountOfImages] = useState<number>(1);

	const [isValidNameData, { on: setInvalidNameData, off: setValidNameData }] =
		useBoolean(editingProduct);

	const [isValidSlugData, { on: setInvalidSlugData, off: setValidSlugData }] =
		useBoolean(editingProduct);

	const [
		isValidImagesData,
		{ on: setInvalidImagesData, off: setValidImagesData },
	] = useBoolean(editingProduct);

	const [
		isValidPriceData,
		{ on: setInvalidPriceData, off: setValidPriceData },
	] = useBoolean(editingProduct);

	const [
		isValidsizeOptionsData,
		{ on: setInvalidsizeOptionsData, off: setValidsizeOptionsData },
	] = useBoolean(editingProduct);

	const [showFormErrors, { on: handleShowErrors, off: handleHideErrors }] =
		useBoolean(false);

	useEffect(() => {
		setName((editingProduct && defaultItem?.name) || "");
		setSlug((editingProduct && defaultItem?.slug) || "");
		setImages((editingProduct && defaultItem?.images) || []);
		setPrice((editingProduct && defaultItem?.price) || 0);
		setBrand((editingProduct && defaultItem?.brand) || "other");
		setSizeOptions(
			(editingProduct && defaultItem?.sizeOptions) || [
				{ usSize: 0, color: "", quantity: 0 },
			]
		);
		setDesc((editingProduct && defaultItem?.desc) || "");
		setTags((editingProduct && defaultItem?.tags) || []);
		setAmountOfImages((editingProduct && defaultItem.images.length) || 1);
		handleHideErrors();
	}, [defaultItem, editingProduct]);

	useEffect(() => {
		function areAllSizeOptionsDataValid() {
			const anyValid = !item?.sizeOptions.some((sizeOption) => {
				const { usSize, quantity, color, arg, cm, eu } = sizeOption;

				const hasSizeOrQuantity = usSize || quantity;
				const hasColor = color !== "";
				const hasAnySize = hasSizeOrQuantity || hasColor;
				const hasInvalidSize = !arg || !cm || !eu;

				const isInvalid =
					(hasSizeOrQuantity && !hasColor) ||
					(hasColor && !usSize) ||
					(hasAnySize && hasInvalidSize) ||
					(hasColor && quantity);

				return isInvalid;
			});

			return anyValid;
		}

		if (areAllSizeOptionsDataValid()) {
			setInvalidsizeOptionsData();
		} else {
			setValidsizeOptionsData();
		}
	}, [sizeOptions]);

	const { mutateAsync: addMutateAsyncCreateProduct } = useCreateProduct();
	const { mutateAsync: addMutateAsynceEditProduct } = useUpdateProduct();

	const { handleSubmit } = useForm<Product>();

	const toast = useToast();

	async function handleUploadProduct() {
		try {
			const product: Product = {
				name,
				slug,
				images: images.filter((urlImg) => urlImg.length > 0),
				price,
				sizeOptions: sizeOptions.filter(
					(sizeOption) =>
						sizeOption.color.length > 0 &&
						sizeOption.quantity > 0 &&
						sizeOption.usSize &&
						sizeOption.usSize > 0 &&
						(brand !== "other" ||
							(sizeOption.arg && sizeOption.cm) ||
							sizeOption.eu)
				),
				brand: brand.toLocaleLowerCase() as Brand,
				desc,
				tags: tags ? tags.filter((tag) => tag !== "") : undefined,
			};

			const res = editingProduct
				? await addMutateAsynceEditProduct(product)
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
		if (name === "") {
			setInvalidNameData();
		} else {
			setValidNameData();
		}
	}

	function handleIsSlugAllowed(value: string) {
		if (editingProduct) {
			const otherProducts = finalProductsData?.filter(
				(product) => product._id !== item?._id
			);

			const otherProductHaveThisSlug = otherProducts?.some((product) => {
				return product.slug.toString() === value;
			});

			if (otherProductHaveThisSlug) {
				console.log("invalid1");
				setValidSlugData();
			} else {
				console.log("valid 1");
				setInvalidSlugData();
			}
		} else {
			if (finalProductsData?.some((product) => product.slug == value)) {
				console.log("invalid 2");
				setInvalidSlugData();
			} else {
				console.log("valid 2");
				setValidSlugData();
			}
		}
	}

	function handleSetSlug(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");

		setSlug(value);
		handleIsSlugAllowed(value);
	}

	function handleSetImageIndex(
		index: number,
		e: ChangeEvent<HTMLInputElement>
	) {
		setImages((prevImages) => {
			const newImages = [...prevImages];
			newImages[index] = e.target.value;

			const anyNotEmptyImageURL = newImages.some(
				(imageURL) => imageURL.length > 0
			);

			if (anyNotEmptyImageURL) {
				setValidImagesData();
			} else {
				setInvalidImagesData();
			}
			return newImages;
		});
	}

	function handleSetPrice(e: ChangeEvent<HTMLInputElement>) {
		setPrice(Number(e.target.value));
		if (price) {
			setValidPriceData();
		} else {
			setInvalidPriceData();
		}
	}

	function handleSetDescription(e: ChangeEvent<HTMLInputElement>) {
		setDesc(e.target.value);
	}

	function handleSetTagIndex(index: number, e: ChangeEvent<HTMLInputElement>) {
		const tagsData = [...tags];
		tagsData[index] = e.target.value;

		setTags(tagsData);
	}

	function handleAddSizeOptionsInput() {
		setSizeOptions((prevSizeOptions) => [
			...prevSizeOptions,
			{
				usSize: 0,
				color: "",
				quantity: 0,
				arg: undefined,
				cm: undefined,
				eu: undefined,
			},
		]);
	}

	function handleAddTagsInput() {
		setTags((prevTags) => [...prevTags, ""]);
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent minWidth={"80%"}>
				<ModalHeader>{`${
					editingProduct ? "Editar" : "Crear nuevo"
				} producto`}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box
						as="form"
						w={["100%", "100%", "100%", "80%", "56%"]}
						px="4rem"
						onSubmit={handleSubmit(handleUploadProduct)}
					>
						<NameInput
							name={name}
							handleSetName={handleSetName}
							showFormErrors={showFormErrors}
							isValidNameData={isValidNameData}
						/>

						<BrandSelector brand={brand} setBrand={setBrand} />

						<ProductStockEdited
							sizeOptions={sizeOptions}
							brand={brand}
							setSizeOptions={setSizeOptions}
							handleAddSizeOptionsInput={handleAddSizeOptionsInput}
							showFormErrors={showFormErrors}
							isValidsizeOptionsData={isValidsizeOptionsData}
						/>

						<SlugInput
							slug={slug}
							handleSetSlug={handleSetSlug}
							showFormErrors={showFormErrors}
							isSlugAllowed={isValidSlugData}
						/>

						<ImagesInputsContainer
							images={images}
							handleSetImageIndex={handleSetImageIndex}
							amountOfImages={amountOfImages}
							setAmountOfImages={setAmountOfImages}
							showFormErrors={showFormErrors}
							isValidImagesData={isValidImagesData}
						/>
						<PriceInput
							price={price}
							handleSetPrice={handleSetPrice}
							showFormErrors={showFormErrors}
							isValidPriceData={isValidPriceData}
						/>

						<DescriptionInput
							desc={desc}
							handleSetDescription={handleSetDescription}
						/>
						<TagsInputs
							tags={tags}
							handleSetTagIndex={handleSetTagIndex}
							handleAddTagsInput={handleAddTagsInput}
						/>

						<CustomButton
							{...{ text: "Cargar producto" }}
							handleShowFormErrors={handleShowErrors}
							isValidData={
								isValidNameData &&
								isValidSlugData &&
								isValidImagesData &&
								isValidPriceData &&
								isValidsizeOptionsData
							}
						/>
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
