import { useHydratedCartState } from "@/hooks/state/hydrated";
import { useCartState } from "@/hooks/state/storage";
import { CartItemMPFormat } from "@/types/order";
import { CartProductCard } from "./CartProductCard";

const CartContent = () => {
	const cart = useHydratedCartState("cart");
	const { removeFromCart } = useCartState((state) => state);

	return (
		<>
			{cart?.map((item: CartItemMPFormat, index) => {
				return (
					<CartProductCard
						key={`cart-item-${index}-key`}
						item={item}
						color={item.name.split("-")[1]}
						// quantityCount={quantityCount}
						removeFromCart={removeFromCart}
					/>
				);
			})}
		</>
	);
};

export default CartContent;
