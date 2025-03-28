import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { Box, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
	isLoadingParticulaProductData: boolean;
	product?: Product;
}

export const ProductDetailImages = ({
	isLoadingParticulaProductData,
	product,
}: Props) => {
	const { isDarkMode } = useGlobalContext();

	const [selectedImage, setSelectedImage] = useState<string>("");

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
						<Image
							src={`/assets/images/${
								!selectedImage && product ? product.images[0] : selectedImage
							}`}
							height={500}
							width={500}
							alt="Imágen del producto"
						/>
					</Box>

					<Flex my="2rem" w="65%" mx="auto">
						{product?.images.map((item: string, idx: number) => (
							<Box
								key={idx}
								onClick={() =>
									setSelectedImage(product ? product.images[0] : "")
								}
								p=".8rem 1.5rem"
								fontSize="1.5rem"
								fontWeight="500"
								bg="transparent"
								border="1px solid"
								cursor="pointer"
								borderColor={
									product &&
									(selectedImage === item || (!selectedImage && idx === 0))
										? isDarkMode
											? "darkBrand.secondaryColor4"
											: "brand.secondaryColor1"
										: "transparent"
								}
								borderRadius=".5rem"
							>
								<Image
									src={`/assets/images/${item}`}
									height={70}
									width={70}
									alt="Imágen del producto"
								/>
							</Box>
						))}
					</Flex>
				</Box>
			)}
		</>
	);
};
