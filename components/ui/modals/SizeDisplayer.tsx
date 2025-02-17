// import { useGlobalContext } from "@/context/GlobalContext";
import { Box, Flex, Text } from "@chakra-ui/react";

interface Props {
	keyHelper: string;
	allSizes: number[] | undefined;
	// isFilter?: boolean;
}

export const SizeDisplayer = ({
	keyHelper,
	allSizes /*, isFilter*/,
}: Props) => {
	// const { sizeTypes, filter, setFilter, currentSizeType } = useGlobalContext();

	// function applyFilterHandler(sizeOption: number) {
	// 	if (isFilter) {
	// 		type SizeOptions = {
	// 			[key: string]: number;
	// 		};

	// 		const filterToAdd: { sizeOptions: SizeOptions } = { sizeOptions: {} };
	// 		const key = getPropperSizeType(currentSizeType, sizeTypes, true);

	// 		filterToAdd.sizeOptions[key] = sizeOption;

	// 		const filterCopy = filter;

	// 		if (filterCopy?.sizeOptions) {
	// 			filterCopy.sizeOptions = undefined;
	// 		}

	// 		const newFilter = { ...filter, ...filterToAdd };

	// 		setFilter(newFilter);
	// 	}
	// }

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
						<Flex
							key={`size-options-${keyHelper}-${sizeOption}-${index}`}
							justify={"space-between"}
							gap={2}
							cursor={"pointer"}
							// onClick={() => applyFilterHandler(sizeOption)}
						>
							<Text>{sizeOption}</Text>
							{allSizes.length !== index + 1 && (
								<Box
									height="auto"
									mx={1}
									borderLeft="1px solid"
									borderColor="gray.300"
								/>
							)}
						</Flex>
					);
				})}
		</Flex>
	);
};
