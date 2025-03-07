import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	name: string;
	handleSetName: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const NameInput = ({ name, handleSetName }: Props) => {
	return (
		<Box my="2rem">
			<Text>Nombre:</Text>
			<Input
				id={"productName"}
				value={name || ""}
				placeholder={"Nombre"}
				type="text"
				onChange={handleSetName}
				{...inputStyles}
			/>
		</Box>
	);
};
