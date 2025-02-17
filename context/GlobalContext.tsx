import { useGetMyFavorites } from "@/hooks/favorite/useFavorite";
import { useGetAllProducts } from "@/hooks/products/useProduct";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { useStoreState } from "@/hooks/state/storage";
import { SizeFilter } from "@/types/filters";
import { Product } from "@/types/product";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, {
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

export type ValidSizeOptions = {
	us?: number[];
	eu?: number[];
};

interface GlobalContextProps {
	currentSizeType: "any" | "us" | "eu";
	useSetCurrentSizeType: (sizeType: "any" | "us" | "eu") => void;
	sizeTypes: ("any" | "us" | "eu")[];
	isSizeTypesDrawerOpen: boolean;
	onOpenSizeTypesDrawer: () => void;
	onCloseSizeTypesDrawer: () => void;
	isFiltersDrawerOpen: boolean;
	onOpenFiltersDrawer: () => void;
	onCloseFiltersDrawer: () => void;
	filter: SizeFilter | undefined;
	setFilter: React.Dispatch<React.SetStateAction<SizeFilter | undefined>>;
	handleLogout: () => void;
	finalProductsData: Product[] | undefined;
	isLoadingProductData: boolean;
}

const GlobalContext = React.createContext({} as GlobalContextProps);

export const GlobalContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const {
		isOpen: isSizeTypesDrawerOpen,
		onOpen: onOpenSizeTypesDrawer,
		onClose: onCloseSizeTypesDrawer,
	} = useDisclosure();

	const {
		isOpen: isFiltersDrawerOpen,
		onOpen: onOpenFiltersDrawer,
		onClose: onCloseFiltersDrawer,
	} = useDisclosure();

	const { data: productsData, isLoading: isLoadingProductData } =
		useGetAllProducts();

	const { data: wishlistData } = useGetMyFavorites();

	const [currentSizeType, setCurrentSizeType] = useState<"any" | "us" | "eu">(
		"any"
	);
	const [token, setToken] = useState(useHydratedStoreState("token"));
	const [filter, setFilter] = useState<SizeFilter | undefined>();
	const [finalProductsData, setFinalProductsData] = useState<
		Product[] | undefined
	>();

	function useSetCurrentSizeType(sizeType: "any" | "us" | "eu") {
		localStorage.setItem("mateoShooes-sizeType-stored", sizeType);
		setCurrentSizeType(sizeType);
	}

	const sizeTypes = useRef(["any", "us", "eu"]).current as (
		| "any"
		| "us"
		| "eu"
	)[];

	useEffect(() => {
		const storedSizeType = localStorage.getItem("mateoShooes-sizeType-stored");

		if (
			storedSizeType &&
			(storedSizeType === "any" ||
				storedSizeType === "us" ||
				storedSizeType === "eu")
		) {
			setCurrentSizeType(storedSizeType);
		}
	}, []);

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
			const mapProducts: Product[] = productsData.map((item) => {
				const isFavorite = wishlistData?.some(
					(wishlistItem) => wishlistItem._id === item._id
				);
				const itemCopy = {
					...item,
				};
				itemCopy.isFavorite = !!isFavorite;
				return itemCopy;
			});

			setFinalProductsData(mapProducts);
		}
	}, [productsData, wishlistData]);

	const { removeToken } = useStoreState((state) => state);
	const router = useRouter();

	const handleLogout = () => {
		removeToken();

		router.push("/auth/login");
	};

	return (
		<GlobalContext.Provider
			value={{
				currentSizeType,
				useSetCurrentSizeType,
				sizeTypes,
				isSizeTypesDrawerOpen,
				onOpenSizeTypesDrawer,
				onCloseSizeTypesDrawer,
				isFiltersDrawerOpen,
				onOpenFiltersDrawer,
				onCloseFiltersDrawer,
				filter,
				setFilter,
				handleLogout,
				finalProductsData,
				isLoadingProductData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export function useGlobalContext() {
	return useContext(GlobalContext);
}
