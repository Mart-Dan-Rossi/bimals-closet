import { useGlobalContext } from "@/context/GlobalContext";
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
import { FilterSizeDisplayer } from "./ui/modals/FilterSizeDisplayer";
import { FilterTagsDisplayer } from "./ui/modals/FilterTagsDisplayer";

export const FiltersDrawer = () => {
	const {
		isFiltersDrawerOpen,
		onCloseFiltersDrawer,
		finalProductsData,
		isDarkMode,
	} = useGlobalContext();

	const [allSizes, setAllSizes] = useState<number[] | undefined>();
	const [allTags, setAllTags] = useState<string[]>();

	useEffect(() => {
		let stackAllSizes: number[] = [];
		let stackAllTags: string[] = [];

		finalProductsData?.forEach((product) => {
			const productSizeOptions = product.sizeOptions?.map(
				(option) => option.usSize
			);
			const emptyTagsFiltered = product.tags
				? product.tags.filter((tag) => tag !== "")
				: [];

			if (productSizeOptions) {
				stackAllSizes = [...stackAllSizes, ...productSizeOptions];
			}
			if (emptyTagsFiltered) {
				stackAllTags = [...stackAllTags, ...emptyTagsFiltered];
			}
		});

		stackAllSizes = stackAllSizes.filter(
			(value, index, array) => array.indexOf(value) === index
		);
		stackAllTags = stackAllTags.filter(
			(value, index, array) => array.indexOf(value) === index
		);

		setAllSizes(stackAllSizes);
		setAllTags([...stackAllTags].sort());
	}, [finalProductsData]);

	return (
		<Drawer
			isOpen={isFiltersDrawerOpen}
			placement="right"
			onClose={onCloseFiltersDrawer}
			size={"lg"}
		>
			<DrawerOverlay />
			<DrawerContent bg={isDarkMode ? "darkBrand.color2" : "brand.color2"}>
				<DrawerCloseButton
					color={isDarkMode ? "darkBrand.white100" : "brand.secondaryColor1"}
				/>

				<DrawerHeader
					fontSize={"x-large"}
					color={isDarkMode ? "darkBrand.white100" : "brand.white100"}
				>
					Filtros
				</DrawerHeader>

				<DrawerBody>
					<VStack align={"start"} width={"100%"}>
						<Flex flexDirection={"column"} gap={1} width={"100%"}>
							<Flex justify={"start"} gap={2} align={"end"}>
								<Text
									color={isDarkMode ? "darkBrand.white100" : "brand.white100"}
								>
									Talles (US)
								</Text>
							</Flex>
							<FilterSizeDisplayer allSizes={allSizes} />
						</Flex>
						<VStack mt={"2rem"} alignItems={"flex-start"}>
							<Text
								color={isDarkMode ? "darkBrand.white100" : "brand.white100"}
							>
								Etiquetas:
							</Text>
							<FilterTagsDisplayer allTags={allTags} />
						</VStack>
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
