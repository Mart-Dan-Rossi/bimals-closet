import { Box, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	slug: string;
	handleSetSlug: (e: ChangeEvent<HTMLInputElement>) => void;
	showFormErrors: boolean;
	isSlugAllowed: boolean;
}

export const SlugInput = ({
	slug,
	handleSetSlug,
	showFormErrors,
	isSlugAllowed,
}: Props) => {
	return (
		<Box my="2rem">
			<Text fontSize="1.7rem" fontWeight="600" color={"brand.secondaryColor1"}>
				Slug:
			</Text>
			<Input
				id={"productSlug"}
				value={slug || ""}
				placeholder={"Slug"}
				type="text"
				onChange={handleSetSlug}
				{...inputStyles}
			/>
			{showFormErrors &&
				(slug === "" ? (
					<Text color="red" fontSize={"sm"}>
						Este campo es requerido!
					</Text>
				) : (
					!isSlugAllowed && (
						<Text color="red" fontSize={"sm"}>
							Este slug ya es usado por otro producto
						</Text>
					)
				))}
		</Box>
	);
};
