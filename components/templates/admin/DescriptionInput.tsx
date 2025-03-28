import { Box, Input, Text } from "@chakra-ui/react";
import { inputStyles } from "./ProductEditionModal";
import { ChangeEvent } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

interface Props {
	desc: string;
	handleSetDescription: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DescriptionInput = ({ desc, handleSetDescription }: Props) => {
	const { isDarkMode } = useGlobalContext();

	return (
		<Box my="2rem">
			<Text
				fontSize="1.7rem"
				fontWeight="600"
				color={
					isDarkMode ? "darkBrand.secondaryColor1" : "brand.secondaryColor1"
				}
			>
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
