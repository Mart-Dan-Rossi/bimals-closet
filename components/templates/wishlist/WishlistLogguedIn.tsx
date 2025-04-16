import { RectangularCardLoader } from "@/components/animations/CustomLoader";
import { useGetMyFavorites } from "@/hooks/favorite/useFavorite";
import { Product } from "@/types/product";
import { Center, Icon, Text } from "@chakra-ui/react";
import { Fragment, useEffect, useState } from "react";
import { FaGhost } from "react-icons/fa";
import { WishlistProductCard } from "./WishlistProductCard";

export const WishlistLogguedIn = () => {
	const { data: wishlistData, isLoading: isLoadingWishlistData } =
		useGetMyFavorites();

	const [finalWishlistData, setFinalWishlistData] = useState<Product[]>([]);

	useEffect(() => {
		if (wishlistData) {
			setFinalWishlistData(wishlistData?.filter((item) => !!item));
		}
	}, [wishlistData]);

	return (
		<>
			<Fragment>
				{wishlistData?.length == 0 && (
					<Center flexDir="column" h="42vh">
						<Icon
							as={FaGhost}
							fontSize="10rem"
							color={"brand.color1"}
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
						{finalWishlistData.length > 0 ? (
							finalWishlistData?.map((product: Product) => (
								<WishlistProductCard key={product?._id} product={product} />
							))
						) : (
							<Text width="100vw" textAlign="center" fontWeight={"600"}>
								Aún no tienes productos en favoritos!
							</Text>
						)}
					</Fragment>
				)}
			</Fragment>
		</>
	);
};
