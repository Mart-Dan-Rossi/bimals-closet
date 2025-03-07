import { useGlobalContext } from "@/context/GlobalContext";
import { useDeleteProduct } from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Product } from "@/types/product";
import { applyFilters } from "@/utils/functions";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FiltersButton } from "../main/FiltersButton";
import { AdminProductCard } from "./AdminProductCard";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { ProductEditionModal } from "./ProductEditionModal";

export const AdminHome = () => {
	const { finalProductsData, filter } = useGlobalContext();

	const {
		isOpen: isConfirmDeleteModalOpen,
		onOpen: onOpenConfirmDeleteModal,
		onClose: onCloseConfirmDeleteModal,
	} = useDisclosure();

	const {
		isOpen: isAddNewProductOpen,
		onOpen: onOpenAddNewProduct,
		onClose: onCloseAddNewProduct,
	} = useDisclosure();

	const [isDeleteProduct, setIsDeleteProduct] = useState(false);
	const [productToInteractWith, setProductToInteractWith] = useState<
		Product | undefined
	>();
	const [editingProduct, setEditingProduct] = useState(false);

	const [filteredProductsData, setFilteredProductsData] = useState<
		Product[] | undefined
	>(finalProductsData);

	const { mutateAsync: removeMutateAsync } = useDeleteProduct();

	const router = useRouter();
	const token = useHydratedStoreState("token");

	function getAdminsIds() {
		const allIds = process.env.NEXT_PUBLIC_ADMINS_IDS || "0";
		return allIds?.split("/");
	}

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
		<Box position="relative" pt="15rem">
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
					bg={"brand.color2"}
					padding={"2rem"}
					onClick={handleOpenCreateProduct}
				>
					Agregar producto +
				</Button>
			</Flex>
			<ProductEditionModal
				isOpen={isAddNewProductOpen}
				onClose={onCloseAddNewProduct}
				editingProduct={editingProduct}
				item={productToInteractWith}
			/>
			<ConfirmDeleteModal
				isOpen={isConfirmDeleteModalOpen}
				onClose={onCloseConfirmDeleteModal}
				deletingProduct={isDeleteProduct}
				handler={handleDeleteProduct}
			/>
		</Box>
	);
};
