import { useGlobalContext } from "@/context/GlobalContext";
import { capitalize } from "@/utils/functions";
import {
	colorOptionDataArray,
	ColorOptions,
} from "@/utils/productCaracteristics";
import { Box, Flex, MenuItem } from "@chakra-ui/react";
import { useState } from "react";

export const FilterColorDisplayer = () => {
	const { filter, setFilter } = useGlobalContext();

	const [color, setColor] = useState<ColorOptions | undefined>();

	function handleColorSelection(colorData: { name: string; hash: string }) {
		setColor(colorData.name as ColorOptions);

		const filterToAdd = {
			sizeOptions: { color: colorData.name as ColorOptions },
		};

		const newFilter = { ...filter, ...filterToAdd };

		setFilter(newFilter);

		localStorage.setItem(
			"mateosShoes-shoesSizeFilterColor",
			JSON.stringify(colorData.name)
		);
	}

	return (
		<>
			{colorOptionDataArray.map((colorData, index) => (
				<MenuItem
					key={`color-${index}`}
					onClick={() => handleColorSelection(colorData)}
					bg={
						color?.toLocaleLowerCase() === colorData.name.toLocaleLowerCase()
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
		</>
	);
};
