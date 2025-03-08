import { Box, Button, Icon, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { inputStyles } from "./ProductEditionModal";
import { RiAddCircleLine } from "react-icons/ri";

interface Props {
	images: string[];
	handleSetImageIndex: (
		index: number,
		e: ChangeEvent<HTMLInputElement>
	) => void;
	amountOfImages: number;
	setAmountOfImages: Dispatch<SetStateAction<number>>;
	showFormErrors: boolean;
	isValidImagesData: boolean;
}

export const ImagesInputsContainer = ({
	images,
	handleSetImageIndex,
	amountOfImages,
	setAmountOfImages,
	showFormErrors,
	isValidImagesData,
}: Props) => {
	return (
		<Box
			my="2rem"
			padding={"1rem"}
			borderRadius={"10px"}
			border={"1px solid black"}
		>
			<Text fontSize="1.7rem" fontWeight="600" color="brand.secondaryColor1">
				Imágenes:
			</Text>
			{Array.from({ length: amountOfImages }).map((__, index) => {
				return (
					<Box key={`create-product-image-${index}`} mt={"1rem"}>
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
					</Box>
				);
			})}
			{showFormErrors && isValidImagesData && (
				<Text color="red" fontSize={"sm"}>
					Al menos una URL de imágen es requerida!
				</Text>
			)}
			<Button
				mt={"1rem"}
				colorScheme="blue"
				onClick={() => {
					setAmountOfImages((prev) => prev + 1);
				}}
			>
				<Icon as={RiAddCircleLine} fontSize="2rem" />
			</Button>
		</Box>
	);
};
