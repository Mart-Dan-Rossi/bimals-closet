import { useGlobalContext } from "@/context/GlobalContext";
import { useDeleteProduct } from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Product } from "@/types/product";
import { applyFilters, getAdminsIds } from "@/utils/functions";
import { Box, Button, Flex, TabPanel, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AdminProductCard } from "./AdminProductCard";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { ProductEditionModal } from "./ProductEditionModal";
import FilterButtons from "@/components/ui/FilterButtons";
import { SiteMainSections } from "@/utils/helpers";

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

	const [sectionFilter, setSectionFilter] = useState<
		SiteMainSections | undefined
	>("todo");

	const [filteredProductsData, setFilteredProductsData] = useState<
		Product[] | undefined
	>(finalProductsData);

	const { mutateAsync: removeMutateAsync } = useDeleteProduct();

	const router = useRouter();

	const adminIds = useRef(getAdminsIds()).current as string[];

	useEffect(() => {
		setFilteredProductsData(
			applyFilters(finalProductsData, filter, sectionFilter)
		);
	}, [finalProductsData, filter, sectionFilter]);

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
		<TabPanel bg={"brand.color1"} minH={"70vh"}>
			<Box marginBottom={"2rem"}>
				<FilterButtons
					filteredProductsData={filteredProductsData}
					sectionFilter={sectionFilter}
					setSectionFilter={setSectionFilter}
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
