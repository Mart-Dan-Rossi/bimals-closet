import { useGlobalContext } from "@/context/GlobalContext";
import { useDeleteProduct } from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Product } from "@/types/product";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AddNewProductModal } from "./AddNewProductModal";
import { AdminProductCard } from "./AdminProductCard";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

export const AdminHome = () => {
	const { finalProductsData } = useGlobalContext();

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
	const [productToDelete, setProductToDelete] = useState<Product | undefined>();
	const [sizeToDelete, setSizeToDelete] = useState<
		{ sizeOption: string; sizeToDelete: number } | undefined
	>();

	useEffect(() => {
		console.log(sizeToDelete);
	}, []);

	const { mutateAsync: removeMutateAsync } = useDeleteProduct();

	const router = useRouter();
	const token = useHydratedStoreState("token");

	function getAdminsIds() {
		const allIds = process.env.NEXT_PUBLIC_ADMINS_IDS || "0";
		return allIds?.split("/");
	}

	const adminIds = useRef(getAdminsIds()).current as string[];

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
		if (productToDelete) {
			removeMutateAsync(productToDelete);
		}
	}

	function handleDeleteSize() {
		console.log("Delete size");
	}

	return (
		<Box position="relative" pt="15rem">
			{finalProductsData?.map((item, index) => (
				<AdminProductCard
					key={`admin-product-card-${item.slug}-${index}`}
					item={item}
					setIsDeleteProduct={setIsDeleteProduct}
					onOpen={onOpenConfirmDeleteModal}
					setProductToDelete={setProductToDelete}
					setSizeToDelete={setSizeToDelete}
				/>
			))}
			<Button onClick={onOpenAddNewProduct}>Agregar producto +</Button>
			<AddNewProductModal
				isOpen={isAddNewProductOpen}
				onClose={onCloseAddNewProduct}
			/>
			<ConfirmDeleteModal
				isOpen={isConfirmDeleteModalOpen}
				onClose={onCloseConfirmDeleteModal}
				deletingProduct={isDeleteProduct}
				handler={isDeleteProduct ? handleDeleteProduct : handleDeleteSize}
			/>
		</Box>
	);
};
