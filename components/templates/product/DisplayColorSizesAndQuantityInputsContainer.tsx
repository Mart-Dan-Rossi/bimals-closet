import { SizeOptions } from "@/types/product";
import {
	Brand,
	getProperSizeEquivalencies,
} from "@/utils/productCaracteristics";
import { Box, Button, Text, Tooltip, VStack, Wrap } from "@chakra-ui/react";

interface Props {
	sizeOptions: SizeOptions;
	brand?: Brand;
}

export const DisplayColorSizesAndQuantityInputsContainer = ({
	sizeOptions,
	brand,
}: Props) => {
	const groupedSizeOptionsByColor = sizeOptions.reduce(
		(acc, sizeOption) => {
			const { color } = sizeOption;

			if (!acc[color]) {
				acc[color] = [];
			}

			acc[color].push(sizeOption);
			return acc;
		},
		{} as Record<string, SizeOptions>
	);

	return (
		<Wrap>
			{Object.entries(groupedSizeOptionsByColor).map(
				([color, sizes], index1) => {
					return (
						<VStack
							key={`groupedSizeOption-${color}-${index1}`}
							alignItems={"left"}
							m={"0 2rem 2rem 0	"}
						>
							<Text fontSize="1.7rem" fontWeight="600">
								Color {color}:
							</Text>
							<VStack ml={"2rem"}>
								{sizes.map((sizeOption) => {
									return (
										<Box
											key={`groupedSizeOption-${color}-sizeOption${sizeOption.usSize}`}
											mb={"2rem"}
										>
											<Text ml={"2rem"} fontSize="1.4rem" fontWeight="600">
												Talle:{" "}
												<Button
													disabled={true}
													fontSize="1.4rem"
													fontWeight="600"
													cursor={"auto"}
													bg={"brand.white500"}
													_hover={{ backgroundColor: "brand.color2" }}
												>
													{brand ? (
														<Tooltip
															fontSize={"small"}
															hasArrow
															placement="top-start"
															label={getProperSizeEquivalencies(
																brand,
																sizeOption.usSize,
																sizeOption
															)}
														>
															<Text>{sizeOption.usSize} (US)</Text>
														</Tooltip>
													) : (
														<Text>{sizeOption.usSize} (US)</Text>
													)}
												</Button>
											</Text>
											<Text ml={"2rem"} fontSize="1.4rem" fontWeight="600">
												Cantidad: {sizeOption.quantity}
											</Text>
										</Box>
									);
								})}
							</VStack>
						</VStack>
					);
				}
			)}
		</Wrap>
	);
};
