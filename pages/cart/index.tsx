import { CartItems } from "@/components/templates/cart";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@chakra-ui/react";

const Cart = () => {
	return (
		<Box>
			<MainLayout {...{ subHeaderName: "Carrito de compras" }}>
				<CartItems />
			</MainLayout>
		</Box>
	);
};

export default Cart;
