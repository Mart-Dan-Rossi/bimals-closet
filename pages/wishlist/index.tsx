import { Wishlist } from "@/components/templates/wishlist/Wishlist";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@chakra-ui/react";

const WishlistPage = () => {
	return (
		<Box>
			<MainLayout {...{ subHeaderName: "Lista de deseados" }}>
				<Wishlist />
			</MainLayout>
		</Box>
	);
};

export default WishlistPage;
