import { useHydratedCartState } from "@/hooks/state/hydrated";
import { Center, Icon, Text } from "@chakra-ui/react";
import { FaGhost } from "react-icons/fa";

const EmptyCartMessage = () => {
	const cart = useHydratedCartState("cart");

	return (
		<>
			{cart?.length === 0 && (
				<Center flexDir="column">
					<Icon
						as={FaGhost}
						fontSize="10rem"
						color={"brand.color1"}
						opacity="0.4"
					/>
					<Text mt="1rem" fontWeight="300" textAlign="center">
						Tu carrito está vacío! Comienza a llenarlo ahora!
					</Text>
				</Center>
			)}
		</>
	);
};

export default EmptyCartMessage;
