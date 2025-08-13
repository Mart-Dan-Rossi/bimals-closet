import FilterButtons from "@/components/ui/FilterButtons";
import { useGlobalContext } from "@/context/GlobalContext";
import { useDeleteProduct } from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Product } from "@/types/product";
import { applyFilters } from "@/utils/functions";
import {
	Box,
	Button,
	Flex,
	TabPanel,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AdminProductCard } from "./AdminProductCard";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { ProductEditionModal } from "./ProductEditionModal";
import axios from "axios";

const AdminProductsSection = () => {
	const { finalProductsData, filter, onOpenAddNewProduct } = useGlobalContext();

	const token = useHydratedStoreState("token");

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
	const toast = useToast();

	const router = useRouter();

	useEffect(() => {
		setFilteredProductsData(applyFilters(finalProductsData, filter));
	}, [finalProductsData, filter]);

	useEffect(() => {
		const base64Url = token && token.split(".")[1];
		const base64 = base64Url && base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const tokenData = base64 && JSON.parse(atob(base64));

		if (tokenData && tokenData.role !== "admin") {
			console.log(
				"El panel de admin es sólo accesible para administradores. Logueate con una cuenta admin para poder entrar."
			);
			router.push("/");
		}
	}, [token]);

	function handleDeleteProduct() {
		try {
			if (productToInteractWith && token) {
				removeMutateAsync({ payload: productToInteractWith, token });
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast({
					status: "error",
					title:
						error?.response?.data?.error.message ||
						"Ha ocurrido un error! Intenta nuevamente más tarde",
				});
			}
		}
	}

	function handleOpenCreateProduct() {
		setEditingProduct(false);
		onOpenAddNewProduct();
	}

	return (
		<TabPanel bg={"brand.color1"} minH={"70vh"}>
			<Box marginBottom={"2rem"}>
				<FilterButtons
					filteredProductsData={filteredProductsData}
					section="todo"
				/>
			</Box>
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
					color={"brand.black"}
					_hover={{ backgroundColor: "brand.secondaryColor4", color: "black" }}
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
