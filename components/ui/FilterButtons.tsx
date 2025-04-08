import {
	Button,
	Box,
	Flex,
	Menu,
	MenuButton,
	MenuList,
	Text,
	MenuItem,
} from "@chakra-ui/react";
import { BsFilterLeft } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import { FilterSizeDisplayer } from "./modals/FilterSizeDisplayer";
import { FilterColorDisplayer } from "./modals/FilterColorDisplayer";
import { FilterTagsDisplayer } from "./modals/FilterTagsDisplayer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { SiteMainSections } from "@/utils/helpers";
import { Product } from "@/types/product";

interface Props {
	filteredProductsData: Product[] | undefined;
	section?: SiteMainSections | undefined;
	sectionFilter?: SiteMainSections | undefined;
	setSectionFilter?: Dispatch<SetStateAction<SiteMainSections | undefined>>;
}

const FilterButtons = ({
	section,
	filteredProductsData,
	sectionFilter,
	setSectionFilter,
}: Props) => {
	const { finalProductsData } = useGlobalContext();
	const [allTags, setAllTags] = useState<string[]>([]);

	useEffect(() => {
		let stackAllTags: string[] = [];

		finalProductsData?.forEach((product) => {
			const emptyTagsFiltered = product.tags
				? product.tags.filter((tag) => tag !== "")
				: [];

			if (emptyTagsFiltered) {
				stackAllTags = [...stackAllTags, ...emptyTagsFiltered];
			}
		});
		stackAllTags = stackAllTags.filter(
			(value, index, array) => array.indexOf(value) === index
		);

		setAllTags([...stackAllTags].sort());
	}, [finalProductsData, section]);

	function getAllSizes() {
		return filteredProductsData
			?.map((product) => {
				return product.sizeOptions.map((sizeOption) => {
					return sizeOption.usSize;
				});
			})
			.flat();
	}

	return (
		<Flex gap={"2rem"}>
			<BsFilterLeft color="white" />
			{section === "todo" && setSectionFilter && (
				<Menu>
					<MenuButton as={Button} rightIcon={<GoChevronDown />}>
						Tipo de producto
					</MenuButton>
					<MenuList>
						<MenuItem
							onClick={() => {
								setSectionFilter("calzado");
							}}
						>
							Calzado
						</MenuItem>
						<MenuItem
							onClick={() => {
								setSectionFilter("indumentaria");
							}}
						>
							Indumentaria
						</MenuItem>
						<MenuItem
							onClick={() => {
								setSectionFilter("todo");
							}}
						>
							Todo
						</MenuItem>
					</MenuList>
				</Menu>
			)}
			{section !== "todo" ||
			sectionFilter === "calzado" ||
			sectionFilter === "indumentaria" ? (
				<Menu>
					<MenuButton as={Button} rightIcon={<GoChevronDown />}>
						Talle
					</MenuButton>
					<MenuList>
						<Flex flexDirection={"column"} gap={1} width={"100%"}>
							<Flex justify={"start"} gap={2} align={"end"} m={"0 1rem"}>
								<Text fontWeight={"600"}>Talles (US)</Text>
							</Flex>
							<Box margin={"0 2rem"}>
								<FilterSizeDisplayer allSizes={getAllSizes()} />
							</Box>
						</Flex>
					</MenuList>
				</Menu>
			) : (
				<Menu>
					<MenuButton as={Button} rightIcon={<GoChevronDown />}>
						Talle
					</MenuButton>
					<MenuList>
						<Text padding={".5rem"}>
							Elije un tipo de producto para filtrar por talle
						</Text>
					</MenuList>
				</Menu>
			)}
			<Menu>
				<MenuButton as={Button} rightIcon={<GoChevronDown />}>
					Color
				</MenuButton>
				<MenuList>
					<FilterColorDisplayer />
				</MenuList>
			</Menu>
			<Menu>
				<MenuButton as={Button} rightIcon={<GoChevronDown />}>
					Etiqueta
				</MenuButton>
				<MenuList padding={".5rem"}>
					<FilterTagsDisplayer allTags={allTags} />
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default FilterButtons;
