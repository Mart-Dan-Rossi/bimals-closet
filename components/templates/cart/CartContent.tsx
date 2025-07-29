import { useHydratedCartState } from "@/hooks/state/hydrated";
import { CartItemMPFormat } from "@/types/order";
import { Dispatch, SetStateAction } from "react";
import { CartProductCard } from "./CartProductCard";

interface Props {
	setPreferenceId: Dispatch<SetStateAction<null | any>>;
	setBuyButtonClicked: Dispatch<SetStateAction<boolean>>;
}

const CartContent = ({ setPreferenceId, setBuyButtonClicked }: Props) => {
	const cart = useHydratedCartState("cart");

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
						setPreferenceId={setPreferenceId}
						setBuyButtonClicked={setBuyButtonClicked}
					/>
				);
			})}
		</>
	);
};

export default CartContent;
