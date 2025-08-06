import {
	Box,
	Button,
	CloseButton,
	HStack,
	Icon,
	Input,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	tags: string[];
	handleSetTagIndex: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
	handleAddTagsInput: () => void;
	handleDeleteTagInput: (index: number) => void;
}

export const TagsInputs = ({
	tags,
	handleSetTagIndex,
	handleAddTagsInput,
	handleDeleteTagInput,
}: Props) => {
	return (
		<Box my="2rem">
			<Tooltip
				fontSize={"small"}
				hasArrow
				placement="top-start"
				label={
					"Etiquetas que pueden ser usadas para facilitar la búsqueda del producto"
				}
			>
				<Text fontSize="1.7rem" fontWeight="600" color={"brand.black"}>
					Tags (Optativo):
				</Text>
			</Tooltip>
			{tags.map((tag, index) => {
				return (
					<HStack key={`create-product-tags-${index}`} mt={"1rem"}>
						<Input
							id={`productTags-${index}`}
							value={tag || ""}
							placeholder={"Tag"}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleSetTagIndex(index, e)
							}
							type="text"
							{...inputStyles}
						/>
						<CloseButton onClick={() => handleDeleteTagInput(index)} />
					</HStack>
				);
			})}
			<Button
				colorScheme="blue"
				margin={"1rem auto"}
				onClick={handleAddTagsInput}
			>
				<Text mr="0.5rem">Nuevo tag</Text>
				<Icon as={RiAddCircleLine} fontSize="2rem" />
			</Button>
		</Box>
	);
};
