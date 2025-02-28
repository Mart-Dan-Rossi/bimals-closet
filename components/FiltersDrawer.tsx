import { useGlobalContext } from "@/context/GlobalContext";
import { getPropperSizeType } from "@/utils/functions";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ConfigSizeFormatButton } from "./templates/main/ConfigSizeFormatButton";
import { FilterSizeDisplayer } from "./ui/modals/FilterSizeDisplayer";

export const FiltersDrawer = () => {
	const {
		sizeTypes,
		currentSizeType,
		isFiltersDrawerOpen,
		onCloseFiltersDrawer,
		finalProductsData,
	} = useGlobalContext();

	const [allSizes, setAllSizes] = useState<number[] | undefined>();

	useEffect(() => {
		let stackAllSizes: number[] = [];

		finalProductsData?.forEach((product) => {
			const productSizeOptions = product.sizeOptions[
				getPropperSizeType(currentSizeType, sizeTypes, true)
			]?.map((option) => option.size);

			if (productSizeOptions) {
				stackAllSizes = [...stackAllSizes, ...productSizeOptions];
			}
		});

		stackAllSizes = stackAllSizes.filter(
			(value, index, array) => array.indexOf(value) === index
		);

		setAllSizes(stackAllSizes);
	}, [finalProductsData, currentSizeType]);

	return (
		<Drawer
			isOpen={isFiltersDrawerOpen}
			placement="right"
			onClose={onCloseFiltersDrawer}
			size={"lg"}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader fontSize={"x-large"}>Filtros</DrawerHeader>

				<DrawerBody>
					<VStack align={"start"} width={"100%"}>
						<Flex flexDirection={"column"} gap={1} width={"100%"}>
							<Flex justify={"start"} gap={2} align={"end"}>
								<Text>
									Talles ({getPropperSizeType(currentSizeType, sizeTypes)})
								</Text>
								<ConfigSizeFormatButton />
							</Flex>
							<FilterSizeDisplayer allSizes={allSizes} />
						</Flex>
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
