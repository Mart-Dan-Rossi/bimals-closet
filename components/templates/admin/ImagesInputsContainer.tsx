import { ImageData, SizeOptions } from "@/types/product";
import { capitalize } from "@/utils/functions";
import {
	colorOptionDataArray,
	ColorOptions,
} from "@/utils/productCaracteristics";
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
	Tag,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
	sizeOptions: SizeOptions;
}

export const ImagesInputsContainer = ({
	images,
	handleSetImageIndex,
	showFormErrors,
	isValidImagesData,
	handleDeleteImageInput,
	handleAddImageInput,
	sizeOptions,
}: Props) => {
	const [selectedColor, setSelectedColor] = useState<keyof ImageData>(
		"negro" as keyof ImageData
	);

	const handleChangeColor = (name: string) => {
		setSelectedColor(name as keyof ImageData);
	};

	const [existingProductsColors, setExistingProductsColors] = useState<
		ColorOptions[]
	>([]);

	const [colorsWithNoImage, setColorsWithNoImage] = useState<ColorOptions[]>(
		[]
	);

	useEffect(() => {
		const allColors: ColorOptions[] = [];

		sizeOptions.forEach((so) => {
			if (!allColors.includes(so.color)) {
				allColors.push(so.color);
			}
		});

		const finalColorsWithNoImage: ColorOptions[] = [];

		allColors.forEach((color) => {
			const existingImages = images[color].filter((image) => {
				return image.length;
			});

			if (existingImages.length === 0) {
				finalColorsWithNoImage.push(color);
			}
		});

		setExistingProductsColors(allColors);
		setColorsWithNoImage(finalColorsWithNoImage);
	}, [sizeOptions, images]);

	function properWarningText() {
		return `${colorsWithNoImage.length === 1 ? "El" : "Los"} siguiente${
			colorsWithNoImage.length > 1 ? "s" : ""
		} color${colorsWithNoImage.length > 1 ? "es" : ""} aún no tiene${
			colorsWithNoImage.length > 1 ? "n" : ""
		} imágen${colorsWithNoImage.length > 1 ? "es" : ""}:`;
	}

	return (
		<Box my="2rem" p="1rem" borderRadius="10px" border="1px solid black">
			<Text fontSize="1.7rem" fontWeight="600" color="brand.black" mb="1rem">
				Imágenes por color:
			</Text>

			<Menu>
				<Flex alignItems="center" gap="1rem">
					<MenuButton as={Button} rightIcon={<AiOutlineCaretDown />}>
						{capitalize(selectedColor)}
					</MenuButton>
					{colorsWithNoImage.length > 0 && (
						<Flex flexDirection="column">
							<Text color="red" fontSize="small">
								{properWarningText()}
							</Text>
							<Flex>
								{colorsWithNoImage.map((color, index) => {
									return (
										<Flex key={`product-edition-${color}-${index}-tag`}>
											<Tag
												cursor="pointer"
												onClick={() => handleChangeColor(color)}
												mr="1rem"
												colorScheme="blue"
												userSelect="none"
											>
												{capitalize(color)}
											</Tag>
										</Flex>
									);
								})}
							</Flex>
						</Flex>
					)}
				</Flex>
				<MenuList>
					{existingProductsColors.map((color, index) => {
						const colorData = colorOptionDataArray.find((co) => {
							return co.name === color;
						});

						const colorHash = colorData?.hash;

						return (
							<MenuItem
								key={`product-edition-color-${index}`}
								onClick={() => handleChangeColor(color)}
								bg={
									selectedColor?.toLocaleLowerCase() ===
									color.toLocaleLowerCase()
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
										bg={colorHash}
										border={"1px solid #ccc"}
									/>
									{capitalize(color)}
								</Flex>
							</MenuItem>
						);
					})}
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
				{images[selectedColor].map((_, index) => {
					return (
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
					);
				})}
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
