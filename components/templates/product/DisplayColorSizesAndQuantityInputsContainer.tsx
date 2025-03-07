import { Product, SizeOptions } from "@/types/product";
import { getProperSizeEquivalencies } from "@/utils/sizesEquivalencies";
import { Box, Button, Text, Tooltip, VStack, Wrap } from "@chakra-ui/react";

interface Props {
	item: Product;
}

export const DisplayColorSizesAndQuantityInputsContainer = ({
	item,
}: Props) => {
	const groupedSizeOptionsByColor = item.sizeOptions.reduce(
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
							<Text
								fontSize="1.7rem"
								fontWeight="600"
								color="brand.secondaryColor1"
							>
								Color {color}:
							</Text>
							<VStack ml={"2rem"}>
								{sizes.map((sizeOption) => {
									return (
										<Box
											key={`groupedSizeOption-${color}-sizeOption${sizeOption.usSize}`}
											mb={"2rem"}
										>
											<Text
												ml={"2rem"}
												fontSize="1.4rem"
												fontWeight="600"
												color="brand.secondaryColor1"
											>
												Talle:{" "}
												<Button
													disabled={true}
													fontSize="1.4rem"
													fontWeight="600"
													color="brand.secondaryColor1"
												>
													<Tooltip
														fontSize={"small"}
														hasArrow
														placement="top-start"
														label={getProperSizeEquivalencies(
															item.brand,
															sizeOption
														)}
													>
														<Text>{sizeOption.usSize} (US)</Text>
													</Tooltip>
												</Button>
											</Text>
											<Text
												ml={"2rem"}
												fontSize="1.4rem"
												fontWeight="600"
												color="brand.secondaryColor1"
											>
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
