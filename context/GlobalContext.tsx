import { useGetMyFavorites } from "@/hooks/favorite/useFavorite";
import { useGetAllBEOrders } from "@/hooks/orders/useBEOrders";
import { useGetAllProducts } from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { useStoreState } from "@/hooks/state/storage";
import { ProductsFilter } from "@/types/filters";
import { OrderDataBEFormat } from "@/types/order";
import { Product } from "@/types/product";
import { QueryData } from "@/types/Query";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface GlobalContextProps {
	isFiltersDrawerOpen: boolean;
	onOpenFiltersDrawer: () => void;
	onCloseFiltersDrawer: () => void;
	isAddNewProductOpen: boolean;
	onOpenAddNewProduct: () => void;
	onCloseAddNewProduct: () => void;
	filter: ProductsFilter | undefined;
	setFilter: React.Dispatch<React.SetStateAction<ProductsFilter | undefined>>;
	handleLogout: () => void;
	finalProductsData: Product[] | undefined;
	isLoadingProductData: boolean;
	ordersData: OrderDataBEFormat[] | undefined;
	isLoadingOrderData: boolean;
	handleClearFilters: () => void;
	selectedTags: string[];
	setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
	queryData: QueryData | undefined;
	setQueryData: React.Dispatch<React.SetStateAction<QueryData | undefined>>;
}

const GlobalContext = React.createContext({} as GlobalContextProps);

export const GlobalContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const {
		isOpen: isFiltersDrawerOpen,
		onOpen: onOpenFiltersDrawer,
		onClose: onCloseFiltersDrawer,
	} = useDisclosure();

	const {
		isOpen: isAddNewProductOpen,
		onOpen: onOpenAddNewProduct,
		onClose: onCloseAddNewProduct,
	} = useDisclosure();

	const { data: productsData, isLoading: isLoadingProductData } =
		useGetAllProducts();

	const { data: ordersData, isLoading: isLoadingOrderData } =
		useGetAllBEOrders();

	const { data: wishlistData } = useGetMyFavorites();

	const [queryData, setQueryData] = useState<QueryData | undefined>();

	const [token, setToken] = useState(useHydratedStoreState("token"));

	const [filter, setFilter] = useState<ProductsFilter | undefined>();

	const [selectedTags, setSelectedTags] = useState<string[]>(
		filter?.tags ?? []
	);

	const [finalProductsData, setFinalProductsData] = useState<
		Product[] | undefined
	>();

	function handleClearFilters() {
		localStorage.removeItem("mateosShoes-shoesSizeFilterRange");
		setFilter(undefined);
		setSelectedTags([]);
	}

	useEffect(() => {
		if (token) {
			const payload = JSON.parse(
				Buffer.from(token.split(".")[1], "base64").toString("utf8")
			);

			const now = Math.floor(Date.now() / 1000);

			if (payload.exp < now) {
				setToken(null);
				handleLogout();
			}
		}
	}, [token]);

	useEffect(() => {
		if (productsData) {
			if (wishlistData && wishlistData !== null) {
				const mapProducts: Product[] = productsData.map((item) => {
					const isFavorite = wishlistData?.some((wishlistItem) => {
						if (wishlistItem) {
							return wishlistItem._id === item._id;
						} else {
							return false;
						}
					});
					const itemCopy = { ...item };
					itemCopy.isFavorite = !!isFavorite;
					return itemCopy;
				});

				setFinalProductsData(mapProducts);
			} else {
				setFinalProductsData(productsData);
			}
		}
	}, [productsData, wishlistData, filter]);

	const { removeToken } = useStoreState((state) => state);
	const router = useRouter();

	const handleLogout = () => {
		removeToken();

		router.push("/auth/login");
	};

	return (
		<GlobalContext.Provider
			value={{
				isFiltersDrawerOpen,
				onOpenFiltersDrawer,
				onCloseFiltersDrawer,
				isAddNewProductOpen,
				onOpenAddNewProduct,
				onCloseAddNewProduct,
				filter,
				setFilter,
				handleLogout,
				finalProductsData,
				isLoadingProductData,
				ordersData,
				isLoadingOrderData,
				handleClearFilters,
				selectedTags,
				setSelectedTags,
				queryData,
				setQueryData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export function useGlobalContext() {
	return useContext(GlobalContext);
}
