import { Box, Button, Icon, Input, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { inputStyles } from "./ProductEditionModal";
import { RiAddCircleLine } from "react-icons/ri";

interface Props {
	tags: string[];
	handleSetTagIndex: (index: number, e: ChangeEvent<HTMLInputElement>) => void;
	handleAddTagsInput: () => void;
}

export const TagsInputs = ({
	tags,
	handleSetTagIndex,
	handleAddTagsInput,
}: Props) => {
	return (
		<Box my="2rem">
			<Text>Tags (Optativo):</Text>
			{tags.map((tag, index) => {
				return (
					<Box key={`create-product-tags-${index}`} mt={"1rem"}>
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
					</Box>
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
