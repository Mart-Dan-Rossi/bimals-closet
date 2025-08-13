import { SizeOptions } from "@/types/product";
import {
	Brand,
	getProperSizeEquivalencies,
} from "@/utils/productCaracteristics";
import { Box, Button, Text, Tooltip, VStack, Wrap } from "@chakra-ui/react";

interface Props {
	slug: string | undefined;
	sizeOptions: SizeOptions;
	brand?: Brand;
}

export const DisplayColorSizesAndQuantityInputsContainer = ({
	slug,
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
							key={`${slug}-groupedSizeOption-${color}-${index1}-${JSON.stringify(
								sizes
							)}`}
							alignItems={"left"}
							m={"0 2rem 2rem 0	"}
							p={"1rem 1rem 0 1rem"}
							borderRadius={"1rem"}
							bg={"brand.white400"}
							boxShadow={"0px 0px 8px 2px lightGrey"}
							width={"210px"}
						>
							<Text fontSize="1.7rem" fontWeight="600">
								Color {color}:
							</Text>
							<VStack ml={"2rem"}>
								{sizes.map((sizeOption, index2) => {
									return (
										<Box
											key={`${slug}-groupedSizeOption-${color}-${index1}-${index2}-${JSON.stringify(
												sizes
											)}`}
											mb={"1rem"}
											minWidth={"90%"}
											bg={"brand.footerBG"}
											padding={".5rem"}
											borderRadius={"1rem"}
											boxShadow={"0px 0px 5px 1px lightGrey inset"}
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
													{brand && typeof sizeOption.usSize === "number" ? (
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
														<Text>{`${sizeOption.usSize} ${
															typeof sizeOption.usSize === "number"
																? "(US)"
																: ""
														}`}</Text>
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
