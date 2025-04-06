import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	name: string;
	handleSetName: (e: ChangeEvent<HTMLInputElement>) => void;
	showFormErrors: boolean;
	isValidNameData: boolean;
}

export const NameInput = ({
	name,
	handleSetName,
	showFormErrors,
	isValidNameData,
}: Props) => {
	return (
		<Box my="2rem">
			<Text fontSize="1.7rem" fontWeight="600" color={"brand.secondaryColor1"}>
				Nombre:
			</Text>
			<Input
				id={"productName"}
				value={name || ""}
				placeholder={"Nombre"}
				type="text"
				onChange={handleSetName}
				{...inputStyles}
			/>
			{showFormErrors && !isValidNameData && (
				<Text color="red" fontSize={"sm"}>
					Este campo es requerido!
				</Text>
			)}
		</Box>
	);
};
