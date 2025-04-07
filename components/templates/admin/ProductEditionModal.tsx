import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useGlobalContext } from "@/context/GlobalContext";
import {
	useCreateProduct,
	useUpdateProduct,
} from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Product } from "@/types/product";
import { getAdminsIds } from "@/utils/functions";
import { Brand, ColorOptions } from "@/utils/productCaracteristics";
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
import ProductTypeSelector from "./ProductTypeSelector";

interface Props {
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

export const ProductEditionModal = ({ editingProduct, item }: Props) => {
	const { finalProductsData, isAddNewProductOpen, onCloseAddNewProduct } =
		useGlobalContext();

	const token = useHydratedStoreState("token");

	const defaultItem = useMemo(
		() =>
			item || {
				productType: "calzado",
				name: "",
				slug: "",
				images: [],
				price: 0,
				brand: "other",
				sizeOptions: [{}],
				desc: "",
				tags: "",
			},
		[item]
	) as Product;

	const [productType, setProductType] = useState(
		defaultItem?.productType || "calzado"
	);
	const [name, setName] = useState(defaultItem?.name || "");
	const [slug, setSlug] = useState(defaultItem?.slug || "");
	const [images, setImages] = useState(defaultItem?.images || [""]);
	const [price, setPrice] = useState(defaultItem?.price || 0);
	const [brand, setBrand] = useState<Brand | "other">(
		defaultItem?.brand || "other"
	);
	const [sizeOptions, setSizeOptions] = useState(
		defaultItem?.sizeOptions || [{}]
	);
	const [desc, setDesc] = useState(defaultItem?.desc || "");
	const [tags, setTags] = useState(defaultItem?.tags || []);

	const [isValidNameData, { on: setValidNameData, off: setInvalidNameData }] =
		useBoolean(editingProduct);

	const [isValidSlugData, { on: setValidSlugData, off: setInvalidSlugData }] =
		useBoolean(editingProduct);

	const [
		isValidImagesData,
		{ on: setValidImagesData, off: setInvalidImagesData },
	] = useBoolean(editingProduct);

	const [
		isValidPriceData,
		{ on: setValidPriceData, off: setInvalidPriceData },
	] = useBoolean(editingProduct);

	const [
		isValidsizeOptionsData,
		{ on: setValidsizeOptionsData, off: setInvalidsizeOptionsData },
	] = useBoolean(editingProduct);

	const [showFormErrors, { on: handleShowErrors, off: handleHideErrors }] =
		useBoolean(false);

	useEffect(() => {
		setName((editingProduct && defaultItem?.name) || "");
		setSlug((editingProduct && defaultItem?.slug) || "");
		setImages((editingProduct && defaultItem?.images) || [""]);
		setPrice((editingProduct && defaultItem?.price) || 0);
		setBrand((editingProduct && defaultItem?.brand) || "other");
		setSizeOptions(
			(editingProduct && defaultItem?.sizeOptions) || [
				{ usSize: 0, color: "negro", quantity: 0 },
			]
		);
		setDesc((editingProduct && defaultItem?.desc) || "");
		setTags((editingProduct && defaultItem?.tags) || []);
		handleHideErrors();
	}, [defaultItem, editingProduct]);

	useEffect(() => {
		function areAllSizeOptionsDataValid() {
			const anyInvalid = sizeOptions.some((sizeOption) => {
				const { usSize, quantity, arg, cm, eu } = sizeOption;

				const hasInvalidSize = !arg || !cm || !eu;

				const isInvalid =
					!usSize ||
					!quantity ||
					(brand === "other" && (usSize || quantity) && hasInvalidSize);

				return isInvalid;
			});

			return !anyInvalid;
		}

		const allValid = areAllSizeOptionsDataValid();

		if (allValid) {
			setValidsizeOptionsData();
		} else {
			setInvalidsizeOptionsData();
		}
	}, [sizeOptions]);

	const { mutateAsync: addMutateAsyncCreateProduct } = useCreateProduct();
	const { mutateAsync: addMutateAsynceEditProduct } = useUpdateProduct();

	const { handleSubmit } = useForm<Product>();

	const toast = useToast();

	async function handleUploadProduct() {
		try {
			const storedUser = localStorage.getItem("MateoShoesUser");
			const user = storedUser && token ? JSON.parse(storedUser) : undefined;
			const userId = user ? user.id : undefined;

			const product: Product = {
				productType,
				name,
				slug,
				images: images.filter((urlImg) => urlImg.length > 0),
				price,
				sizeOptions: sizeOptions.filter(
					(sizeOption) =>
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

			if (res?.status === "success" && getAdminsIds().includes(userId)) {
				toast({ status: "success", title: "Producto cargado correctamente" });
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log("Error:", error);
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
		if (e.target.value !== "") {
			setValidNameData();
		} else {
			setInvalidNameData();
		}
	}

	function isSlugAllowed(value: string) {
		if (editingProduct) {
			const otherProducts = finalProductsData?.filter(
				(product) => product._id !== item?._id
			);

			const otherProductHaveThisSlug = otherProducts?.some((product) => {
				return product.slug.toString() === value;
			});

			if (otherProductHaveThisSlug) {
				setInvalidSlugData();
			} else {
				setValidSlugData();
			}
		} else {
			const anyProductHaveThisSlug = finalProductsData?.some(
				(product) => product.slug == value
			);

			if (anyProductHaveThisSlug) {
				setInvalidSlugData();
			} else {
				setValidSlugData();
			}
		}
	}

	function handleSetSlug(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");

		setSlug(value);
		isSlugAllowed(value);
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
		const newPrice = Number(e.target.value);

		setPrice(newPrice);

		if (newPrice && newPrice > 0) {
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
				color: "negro",
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

	function handleDeleteSizeOptionsInputsLine(index: number) {
		setSizeOptions((prevSizeOptions) => {
			let newSizeOptions;
			if (prevSizeOptions.length === 1) {
				newSizeOptions = [
					{ usSize: 0, quantity: 0, color: "negro" as ColorOptions },
				];
			} else {
				newSizeOptions = prevSizeOptions.filter((__, i) => i !== index);
			}
			return newSizeOptions;
		});
	}

	function handleDeleteImageInput(index: number) {
		setImages((prevImagesData) => {
			let newImagesData;
			if (prevImagesData.length === 1) {
				newImagesData = [""];
			} else {
				newImagesData = [...prevImagesData].filter((__, i) => i !== index);
			}
			return newImagesData;
		});
	}

	function handleAddImageInput() {
		setImages((prevImagesData) => {
			const newImagesData = [...prevImagesData, ""];
			return newImagesData;
		});
	}

	function handleDeleteTagInput(index: number) {
		setTags((prevTags) => {
			return [...prevTags].filter((__, i) => i !== index);
		});
	}

	return (
		<Modal isOpen={isAddNewProductOpen} onClose={onCloseAddNewProduct}>
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
						<ProductTypeSelector
							productType={productType}
							setProductType={setProductType}
						/>

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
							handleDeleteSizeOptionsInputsLine={
								handleDeleteSizeOptionsInputsLine
							}
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
							showFormErrors={showFormErrors}
							isValidImagesData={isValidImagesData}
							handleDeleteImageInput={handleDeleteImageInput}
							handleAddImageInput={handleAddImageInput}
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
							handleDeleteTagInput={handleDeleteTagInput}
						/>

						<CustomButton
							{...{ text: "Cargar producto" }}
							onClickFunction={handleShowErrors}
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
