import {
	Box,
	Button,
	CloseButton,
	HStack,
	Icon,
	Input,
	Text,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";
import { RiAddCircleLine } from "react-icons/ri";

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
			<Text fontSize="1.7rem" fontWeight="600" color="brand.secondaryColor1">
				Tags (Optativo):
			</Text>
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
				<Icon as={RiAddCircleLine} fontSize="2rem" />
			</Button>
		</Box>
	);
};
