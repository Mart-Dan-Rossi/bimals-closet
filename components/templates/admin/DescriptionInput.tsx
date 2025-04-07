import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	desc: string;
	handleSetDescription: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DescriptionInput = ({ desc, handleSetDescription }: Props) => {
	return (
		<Box my="2rem">
			<Text fontSize="1.7rem" fontWeight="600" color={"brand.black"}>
				Descripción (Optativo):
			</Text>
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
