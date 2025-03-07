import { Box, Input, Text } from "@chakra-ui/react";
import { inputStyles } from "./ProductEditionModal";
import { ChangeEvent } from "react";

interface Props {
	desc: string;
	handleSetDescription: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DescriptionInput = ({ desc, handleSetDescription }: Props) => {
	return (
		<Box my="2rem">
			<Text>Descripción (Optativo):</Text>
			<Input
				id={"productDesc"}
				value={desc || ""}
				onChange={handleSetDescription}
				placeholder={"Descripción"}
				type="text"
				{...inputStyles}
			/>
		</Box>
	);
};
