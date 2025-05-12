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
						name={item.name.split("-")[0]}
						unit_price={item.unit_price}
						id={item.id}
						quantity={item.quantity}
						usSize={item.size || 0}
						slug={item.slug}
						image={item.image}
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
