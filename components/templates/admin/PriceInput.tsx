import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	price: number;
	handleSetPrice: (e: ChangeEvent<HTMLInputElement>) => void;
	showFormErrors: boolean;
	isValidPriceData: boolean;
}

export const PriceInput = ({
	price,
	handleSetPrice,
	showFormErrors,
	isValidPriceData,
}: Props) => {
	return (
		<Box my="2rem">
			<Text fontSize="1.7rem" fontWeight="600">
				Precio (AR$):
			</Text>
			<Input
				id={"productPrice"}
				value={price || ""}
				placeholder={"Precio"}
				type="number"
				onChange={handleSetPrice}
				{...inputStyles}
				min={1}
			/>
			{showFormErrors && !isValidPriceData && (
				<Text color="red" fontSize={"sm"}>
					El precio no puede ser igual a 0
				</Text>
			)}
		</Box>
	);
};
