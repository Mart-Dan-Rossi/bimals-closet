import { Button, Flex, TabPanel, useDisclosure } from "@chakra-ui/react";
import { FiltersButton } from "../main/FiltersButton";
import { AdminProductCard } from "./AdminProductCard";
import { ProductEditionModal } from "./ProductEditionModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/types/product";
import { useDeleteProduct } from "@/hooks/products/useProduct";
import { useRouter } from "next/router";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { applyFilters, getAdminsIds } from "@/utils/functions";

const AdminProductsSection = () => {
	const { finalProductsData, filter, onOpenAddNewProduct, isDarkMode } =
		useGlobalContext();

	const {
		isOpen: isConfirmDeleteModalOpen,
		onOpen: onOpenConfirmDeleteModal,
		onClose: onCloseConfirmDeleteModal,
	} = useDisclosure();

	const [productToInteractWith, setProductToInteractWith] = useState<
		Product | undefined
	>();
	const [isDeleteProduct, setIsDeleteProduct] = useState(false);
	const [editingProduct, setEditingProduct] = useState(false);

	const [filteredProductsData, setFilteredProductsData] = useState<
		Product[] | undefined
	>(finalProductsData);

	const { mutateAsync: removeMutateAsync } = useDeleteProduct();

	const router = useRouter();
	const token = useHydratedStoreState("token");

	const adminIds = useRef(getAdminsIds()).current as string[];

	useEffect(() => {
		setFilteredProductsData(applyFilters(finalProductsData, filter));
	}, [finalProductsData, filter]);

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : undefined;
		const userId = user ? user.id : undefined;

		if (userId && !adminIds.includes(userId)) {
			console.log(
				"El panel de admin es sólo accesible para administradores. Logueate con una cuenta admin para poder entrar."
			);
			router.push("/");
		}
	}, [token]);

	function handleDeleteProduct() {
		if (productToInteractWith) {
			removeMutateAsync(productToInteractWith);
		}
	}

	function handleOpenCreateProduct() {
		setEditingProduct(false);
		onOpenAddNewProduct();
	}

	return (
		<TabPanel
			bg={isDarkMode ? "darkBrand.color1" : "brand.color1"}
			minH={"70vh"}
		>
			<FiltersButton />
			{filteredProductsData?.map((item, index) => (
				<AdminProductCard
					key={`admin-product-card-${item.slug}-${index}`}
					item={item}
					setIsDeleteProduct={setIsDeleteProduct}
					onOpenConfirmDeleteModal={onOpenConfirmDeleteModal}
					onOpenAddNewProduct={onOpenAddNewProduct}
					setProductToInteractWith={setProductToInteractWith}
					setEditingProduct={setEditingProduct}
				/>
			))}
			<Flex justifyContent={"center"} mb={"2rem"}>
				<Button
					bg={isDarkMode ? "darkBrand.white200" : "brand.color2"}
					padding={"2rem"}
					onClick={handleOpenCreateProduct}
					color={isDarkMode ? "white" : "black"}
					_hover={{
						backgroundColor: isDarkMode
							? "darkBrand.white100"
							: "brand.secondaryColor4",
						color: "black",
					}}
				>
					Agregar producto +
				</Button>
			</Flex>
			<ProductEditionModal
				editingProduct={editingProduct}
				item={productToInteractWith}
			/>
			<ConfirmDeleteModal
				isOpen={isConfirmDeleteModalOpen}
				onClose={onCloseConfirmDeleteModal}
				handler={handleDeleteProduct}
				text={`Desea borrar de forma permanente ${
					isDeleteProduct ? "este producto" : "este talle"
				}?`}
			/>
		</TabPanel>
	);
};

export default AdminProductsSection;
