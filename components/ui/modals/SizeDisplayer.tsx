// import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { getProperSizeEquivalencies } from "@/utils/productCaracteristics";
import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";

interface Props {
	keyHelper: string;
	allSizes: number[] | undefined;
	product: Product;
}

export const SizeDisplayer = ({ keyHelper, allSizes, product }: Props) => {
	return (
		<Flex
			border={"1px solid black"}
			gap={2}
			padding={"0 1rem 0 1rem"}
			borderRadius={"20px"}
			maxW={"100%"}
			wrap={"wrap"}
		>
			{allSizes &&
				allSizes.map((sizeOption, index) => {
					return (
						<Tooltip
							key={`size-displayer-tooltip-size-option-${index}`}
							fontSize={"small"}
							hasArrow
							placement="auto"
							label={getProperSizeEquivalencies(
								product.brand,
								sizeOption,
								product.sizeOptions[index]
							)}
						>
							<Flex
								key={`size-options-${keyHelper}-${sizeOption}-${index}`}
								justify={"space-between"}
								gap={2}
								cursor={"pointer"}
							>
								<Text color={"brand.secondaryColor1"}>{sizeOption}</Text>
								{allSizes.length !== index + 1 && (
									<Box
										height="auto"
										mx={1}
										borderLeft="1px solid"
										borderColor="gray.300"
									/>
								)}
							</Flex>
						</Tooltip>
					);
				})}
		</Flex>
	);
};
