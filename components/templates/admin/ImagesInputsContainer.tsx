import { ImageData } from "@/types/product";
import { capitalize } from "@/utils/functions";
import { colorOptionDataArray } from "@/utils/productCaracteristics";
import {
	Box,
	Button,
	CloseButton,
	Flex,
	HStack,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { RiAddCircleLine } from "react-icons/ri";
import { inputStyles } from "./ProductEditionModal";
interface Props {
	images: ImageData;
	handleSetImageIndex: (
		color: keyof ImageData,
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => void;
	showFormErrors: boolean;
	isValidImagesData: boolean;
	handleDeleteImageInput: (color: keyof ImageData, index: number) => void;
	handleAddImageInput: (color: keyof ImageData) => void;
}

export const ImagesInputsContainer = ({
	images,
	handleSetImageIndex,
	showFormErrors,
	isValidImagesData,
	handleDeleteImageInput,
	handleAddImageInput,
}: Props) => {
	const [selectedColor, setSelectedColor] = useState<keyof ImageData>(
		"negro" as keyof ImageData
	);

	return (
		<Box my="2rem" p="1rem" borderRadius="10px" border="1px solid black">
			<Text fontSize="1.7rem" fontWeight="600" color="brand.black" mb="1rem">
				Imágenes por color:
			</Text>

			<Menu>
				<MenuButton as={Button} rightIcon={<AiOutlineCaretDown />}>
					{capitalize(selectedColor)}
				</MenuButton>
				<MenuList>
					{colorOptionDataArray.map((colorData, index) => (
						<MenuItem
							key={`product-edition-color-${index}`}
							onClick={() =>
								setSelectedColor(colorData.name as keyof ImageData)
							}
							bg={
								selectedColor?.toLocaleLowerCase() ===
								colorData.name.toLocaleLowerCase()
									? "lightGrey"
									: ""
							}
							_hover={{ backgroundColor: "lightGrey" }}
						>
							<Flex align="center" gap={2}>
								<Box
									w="16px"
									h="16px"
									borderRadius="full"
									bg={colorData.hash}
									border={"1px solid #ccc"}
								/>
								{capitalize(colorData.name)}
							</Flex>
						</MenuItem>
					))}
				</MenuList>
			</Menu>

			<Box mt="1.5rem">
				<Text
					fontSize="1.5rem"
					fontWeight="500"
					mb="0.5rem"
					textTransform="capitalize"
				>
					{selectedColor}
				</Text>
				{images[selectedColor].length === 0 && (
					<Text>
						Agrega las URL de las imágenes (Sin &quot;/&quot; al comienzo)
					</Text>
				)}
				{images[selectedColor].map((_, index) => (
					<HStack key={`image-${selectedColor}-${index}`} mb="0.5rem">
						<Input
							value={images[selectedColor][index] || ""}
							placeholder="URL imágen"
							type="text"
							onChange={(e) => handleSetImageIndex(selectedColor, index, e)}
							{...inputStyles}
						/>
						<CloseButton
							onClick={() => handleDeleteImageInput(selectedColor, index)}
						/>
					</HStack>
				))}
				<Button
					mt="1rem"
					leftIcon={<RiAddCircleLine />}
					size="sm"
					colorScheme="blue"
					onClick={() => handleAddImageInput(selectedColor)}
				>
					Agregar URL
				</Button>
			</Box>

			{showFormErrors && !isValidImagesData && (
				<Text color="red" fontSize="sm" mt="1rem">
					Al menos una URL de imagen es requerida!
				</Text>
			)}
		</Box>
	);
};
