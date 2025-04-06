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
import { RiAddCircleLine } from "react-icons/ri";
import { inputStyles } from "./ProductEditionModal";

interface Props {
	images: string[];
	handleSetImageIndex: (
		index: number,
		e: ChangeEvent<HTMLInputElement>
	) => void;
	showFormErrors: boolean;
	isValidImagesData: boolean;
	handleDeleteImageInput: (index: number) => void;
	handleAddImageInput: () => void;
}

export const ImagesInputsContainer = ({
	images,
	handleSetImageIndex,
	showFormErrors,
	isValidImagesData,
	handleDeleteImageInput,
	handleAddImageInput,
}: Props) => {
	return (
		<Box
			my="2rem"
			padding={"1rem"}
			borderRadius={"10px"}
			border={"1px solid black"}
		>
			<Text fontSize="1.7rem" fontWeight="600" color={"brand.secondaryColor1"}>
				Imágenes:
			</Text>
			{images.map((__, index) => {
				return (
					<HStack key={`create-product-image-${index}`} mt={"1rem"}>
						<Input
							id={`productImagesURL${index}`}
							value={images[index] || ""}
							placeholder={"URL imágen"}
							type="text"
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleSetImageIndex(index, e)
							}
							{...inputStyles}
						/>
						<CloseButton onClick={() => handleDeleteImageInput(index)} />
					</HStack>
				);
			})}
			{showFormErrors && !isValidImagesData && (
				<Text color="red" fontSize={"sm"}>
					Al menos una URL de imágen es requerida!
				</Text>
			)}
			<Button mt={"1rem"} colorScheme="blue" onClick={handleAddImageInput}>
				<Icon as={RiAddCircleLine} fontSize="2rem" />
			</Button>
		</Box>
	);
};
