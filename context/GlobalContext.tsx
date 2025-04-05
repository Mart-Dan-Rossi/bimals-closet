import { useGetMyFavorites } from "@/hooks/favorite/useFavorite";
import { useGetAllBEOrders } from "@/hooks/orders/useBEOrders";
import {
	useGetAllProducts,
	useHideUserReservations,
} from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { useStoreState } from "@/hooks/state/storage";
import { ProductsFilter } from "@/types/filters";
import { OrderDataBEFormat } from "@/types/order";
import { Product } from "@/types/product";
import { QueryData } from "@/types/Query";
import { useBoolean, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

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
	isDarkMode: boolean;
	toggleDarkMode: () => void;
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
	const toast = useToast();
	const queryClient = useQueryClient();

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

	const [userId, setUserId] = useState<string | undefined>();
	const [filter, setFilter] = useState<ProductsFilter | undefined>();

	const [selectedTags, setSelectedTags] = useState<string[]>(
		filter?.tags ?? []
	);

	const [finalProductsData, setFinalProductsData] = useState<
		Product[] | undefined
	>();

	const [isDarkMode, { on: darkModeOn, off: darkModeOff }] = useBoolean(false);

	function toggleDarkMode() {
		const localStorageDarkMode = localStorage.getItem("mateosShoes-darkmode");

		if (localStorageDarkMode === "true") {
			darkModeOff();
			localStorage.removeItem("mateosShoes-darkmode");
		} else {
			darkModeOn();
			localStorage.setItem("mateosShoes-darkmode", "true");
		}
	}

	useEffect(() => {
		toggleDarkMode();
	}, []);

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
					const itemCopy = {
						...item,
					};
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

	const { mutateAsync: addMutateAsyncHideUserReservations } =
		useHideUserReservations();

	const refreshProducts = () => {
		queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
	};

	const handleHideUserReservations = async (userId: string) => {
		if (userId) {
			try {
				const result = await addMutateAsyncHideUserReservations(userId);

				return result;
			} catch (error) {
				console.error("Error ocultando reservaciones:", error);
				toast({
					title: "Error actualizando lista de reservados",
					description:
						"Hubo un error al ocultar de tu lista de reservados tus productos. Por favor informa a nuestro stuff.",
					status: "error",
					isClosable: true,
					duration: 120000,
				});
			}
		}
	};

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser ? JSON.parse(storedUser) : null;

		if (user && queryData) {
			if (user.id !== userId) {
				setUserId(user.id);
			}

			if (typeof user.id === "string" && queryData.payment_id) {
				console.log("hiding");
				handleHideUserReservations(user.id).then(() => {
					refreshProducts();
					setQueryData(() => {
						return undefined;
					});
				});
			}
		}
	}, [token, userId, queryData]);

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
				isDarkMode,
				toggleDarkMode,
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
