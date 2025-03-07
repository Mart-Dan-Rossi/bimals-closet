import { Box, Input, Text } from "@chakra-ui/react";
import { inputStyles } from "./ProductEditionModal";
import { ChangeEvent } from "react";

interface Props {
	price: number;
	handleSetPrice: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PriceInput = ({ price, handleSetPrice }: Props) => {
	return (
		<Box my="2rem">
			<Text>Precio (AR$):</Text>
			<Input
				id={"productPrice"}
				value={price || ""}
				placeholder={"Precio"}
				type="number"
				onChange={handleSetPrice}
				{...inputStyles}
			/>
		</Box>
	);
};
