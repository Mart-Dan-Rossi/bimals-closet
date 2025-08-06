import { Box, Input, Text, Tooltip } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	slug: string;
	editingProduct: boolean | undefined;
	handleSetSlug: (e: ChangeEvent<HTMLInputElement>) => void;
	showFormErrors: boolean;
	isSlugAllowed: boolean;
}

export const SlugInput = ({
	slug,
	editingProduct,
	handleSetSlug,
	showFormErrors,
	isSlugAllowed,
}: Props) => {
	return (
		<Box my="2rem">
			<Tooltip
				fontSize={"small"}
				hasArrow
				placement="top-start"
				label={
					"Es la URL que va a tener el producto (Ej: 'adidas-pepito23'). ¡No se puede repetir, es única por producto!"
				}
			>
				<Text fontSize="1.7rem" fontWeight="600" color={"brand.black"}>
					Slug:
				</Text>
			</Tooltip>
			<Input
				id={"productSlug"}
				value={slug || ""}
				placeholder={"Slug"}
				disabled={editingProduct}
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
