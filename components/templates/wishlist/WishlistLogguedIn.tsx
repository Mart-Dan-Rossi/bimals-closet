import { RectangularCardLoader } from "@/components/animations/CustomLoader";
import { useGetMyFavorites } from "@/hooks/favorite/useFavorite";
import { Product } from "@/types/product";
import { Center, Icon, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { FaGhost } from "react-icons/fa";
import { WishlistProductCard } from "./WishlistProductCard";
import { useGlobalContext } from "@/context/GlobalContext";

export const WishlistLogguedIn = () => {
	const { data: wishlistData, isLoading: isLoadingWishlistData } =
		useGetMyFavorites();

	const { isDarkMode } = useGlobalContext();

	return (
		<>
			<Fragment>
				{wishlistData?.length == 0 && (
					<Center flexDir="column" h="42vh">
						<Icon
							as={FaGhost}
							fontSize="10rem"
							color={isDarkMode ? "darkBrand.color1" : "brand.color1"}
							opacity="0.4"
						/>
						<Text mt="1rem" fontWeight="300" textAlign="center">
							Lista de deseos vacía? Comienza a agregar produtos ahora!
						</Text>
					</Center>
				)}
			</Fragment>
			<Fragment>
				{isLoadingWishlistData ? (
					<Fragment>
						{Array(3)
							.fill(0)
							.map((_, idx) => (
								<RectangularCardLoader
									key={idx}
									rounded=".6rem"
									h="160px"
									mt="1rem"
								/>
							))}
					</Fragment>
				) : (
					<Fragment>
						{wishlistData?.map((product: Product) => (
							<WishlistProductCard key={product?._id} product={product} />
						))}
					</Fragment>
				)}
			</Fragment>
		</>
	);
};
