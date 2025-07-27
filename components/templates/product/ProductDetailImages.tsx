import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { ImageData, Product } from "@/types/product";
import { Box, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
	isLoadingParticulaProductData: boolean;
	selectedColor?: string;
	product?: Product;
}

export const ProductDetailImages = ({
	isLoadingParticulaProductData,
	selectedColor,
	product,
}: Props) => {
	const [selectedImage, setSelectedImage] = useState<number>(0);

	return (
		<>
			{isLoadingParticulaProductData ? (
				<Box>
					<BoxCardLoader rounded=".6rem" h="450px" />
					<HStack mt="2rem" spacing="2rem" mx="4rem">
						{Array(3)
							.fill(0)
							.map((_, idx) => (
								<BoxCardLoader key={idx} rounded=".6rem" h="70px" />
							))}
					</HStack>
				</Box>
			) : (
				<Box>
					<Box w="100%" borderRadius="1rem" overflow="hidden">
						{selectedColor && (
							<Image
								src={`/assets/images/${
									product
										? product.images[selectedColor as keyof ImageData][
												selectedImage
										  ]
										: ""
								}`}
								height={500}
								width={500}
								alt="Imágen del producto"
							/>
						)}
					</Box>

					<Flex my="2rem" w="65%" mx="auto">
						{selectedColor &&
							product?.images[selectedColor as keyof ImageData].map(
								(imageUrl: string, idx: number) => (
									<Box
										key={`image-selecor-${product?._id}-${idx}`}
										onClick={() => setSelectedImage(idx)}
										p=".8rem 1.5rem"
										fontSize="1.5rem"
										fontWeight="500"
										bg="transparent"
										border="1px solid"
										cursor="pointer"
										borderColor={
											product &&
											(selectedImage === idx || (!selectedImage && idx === 0))
												? "brand.secondaryColor1"
												: "transparent"
										}
										borderRadius=".5rem"
									>
										<Image
											src={`/assets/images/${imageUrl}`}
											height={70}
											width={70}
											alt="Imágen del producto"
										/>
									</Box>
								)
							)}
					</Flex>
				</Box>
			)}
		</>
	);
};
