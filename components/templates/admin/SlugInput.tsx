import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	slug: string;
	handleSetSlug: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SlugInput = ({ slug, handleSetSlug }: Props) => {
	return (
		<Box my="2rem">
			<Text>Slug:</Text>
			<Input
				id={"productSlug"}
				value={slug || ""}
				placeholder={"Slug"}
				type="text"
				onChange={handleSetSlug}
				{...inputStyles}
			/>
		</Box>
	);
};
