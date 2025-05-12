import { OrderDataBEFormat } from "@/types/order";
import { Box } from "@chakra-ui/react";
import { CartProductCard } from "./CartProductCard";

interface Props {
	userFinalOrders: OrderDataBEFormat[];
}

export const MyPurchases = ({ userFinalOrders }: Props) => {
	return (
		<>
			{userFinalOrders?.map((orderData, index) => {
				return (
					<Box key={`user-cart-final-order-${orderData._id}-${index}`}>
						{orderData.products.map((product, index) => {
							const optionsArray = product.sizeOptions.map((sizeOption) => {
								return {
									name: product.name,
									price: product.price,
									quantity: sizeOption.quantity,
									usSize: sizeOption.usSize,
									color: sizeOption.color,
								};
							});

							return (
								<Box key={`user-cart-product-order-${product.id}-${index}`}>
									{optionsArray.map((option, index2) => {
										return (
											<CartProductCard
												key={`user-cart-product-order-option-${product.id}-${index}-${index2}`}
												name={option.name}
												unit_price={Number(option.price)}
												quantity={option.quantity}
												usSize={option.usSize}
												color={option.color}
												showDeliveredIndicator={true}
												isDelivered={orderData.isDelivered}
											/>
										);
									})}
								</Box>
							);
						})}
					</Box>
				);
			})}
		</>
	);
};
