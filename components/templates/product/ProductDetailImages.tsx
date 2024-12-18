import { BoxCardLoader } from "@/components/animations/CustomLoader";
import { Box, Flex, HStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
	isLoadingParticulaProductData: boolean;
	particularProductData:
		| {
				_id: string;
				name: string;
				slug: string;
				image: string;
				price: number;
				isFavorite: boolean;
		  }
		| undefined;
}

export const ProductDetailImages = ({
	isLoadingParticulaProductData,
	particularProductData,
}: Props) => {
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
							src={
								!selectedImage && particularProductData
									? // ? particularProductData?.image[0]
									  particularProductData.image
									: selectedImage
							}
							height={500}
							width={500}
							alt="Imágen del producto"
						/>
					</Box>

					<Flex my="2rem" w="65%" mx="auto">
						{/* {particularProductData?.image.map( */}

						{/* // (item: string, idx: number) => ( */}
						<Box
							// key={idx}
							onClick={() =>
								setSelectedImage(
									particularProductData ? particularProductData.image : ""
								)
							}
							p=".8rem 1.5rem"
							fontSize="1.5rem"
							fontWeight="500"
							bg="transparent"
							border="1px solid"
							cursor="pointer"
							borderColor={
								// selectedImage === item
								particularProductData &&
								selectedImage === particularProductData.image
									? "brand.secondaryColor1"
									: "transparent"
							}
							borderRadius=".5rem"
						>
							<Image
								// src={item}
								src={particularProductData ? particularProductData.image : ""}
								height={70}
								width={70}
								alt="Imágen del producto"
							/>
						</Box>
						{/* ) */}
						{/* )} */}
					</Flex>
				</Box>
			)}
		</>
	);
};
