import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { SiteMainSections } from "@/utils/helpers";
import {
	Box,
	Button,
	CloseButton,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import { FilterColorDisplayer } from "./modals/FilterColorDisplayer";
import { FilterSizeDisplayer } from "./modals/FilterSizeDisplayer";
import { FilterTagsDisplayer } from "./modals/FilterTagsDisplayer";

interface Props {
	filteredProductsData: Product[] | undefined;
	section?: SiteMainSections | undefined;
	sectionFilter?: SiteMainSections | undefined;
	setSectionFilter?: Dispatch<SetStateAction<SiteMainSections | undefined>>;
}

const FilterButtons = ({ section, sectionFilter, setSectionFilter }: Props) => {
	const { finalProductsData, filter, setFilter } = useGlobalContext();
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
		return finalProductsData
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
			{(section === "todo" || section === "sale") && setSectionFilter && (
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
			{sectionFilter === "calzado" || sectionFilter === "indumentaria" ? (
				<Flex>
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

					{filter?.sizeOptions?.usSize &&
						filter?.sizeOptions?.usSize.min !== 0 &&
						filter?.sizeOptions?.usSize.max !== 9999 && (
							<Box
								width={"15px"}
								height={"15px"}
								margin="2px"
								bg={"brand.white500"}
								padding={"0 .2px"}
								borderRadius={"2rem"}
								onClick={() => {
									setFilter((prev) => {
										return {
											tags: prev?.tags ?? [],
											sizeOptions: {
												usSize: { min: 0, max: 9999 },
												color: prev?.sizeOptions?.color,
											},
										};
									});
								}}
							>
								<CloseButton size={"sm"} />
							</Box>
						)}
				</Flex>
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
			<Flex>
				<Menu>
					<MenuButton as={Button} rightIcon={<GoChevronDown />}>
						Color
					</MenuButton>
					<MenuList>
						<FilterColorDisplayer />
					</MenuList>
				</Menu>
				{filter?.sizeOptions?.color &&
					filter?.sizeOptions?.color !== "negro" && (
						<Box
							width={"15px"}
							height={"15px"}
							margin="2px"
							bg={"brand.white500"}
							padding={"0 .2px"}
							borderRadius={"2rem"}
							onClick={() => {
								setFilter((prev) => {
									return {
										tags: prev?.tags ?? [],
										sizeOptions: {
											usSize: prev?.sizeOptions?.usSize,
											color: "negro",
										},
									};
								});
							}}
						>
							<CloseButton size={"sm"} />
						</Box>
					)}
			</Flex>
			<Flex>
				<Menu>
					<MenuButton as={Button} rightIcon={<GoChevronDown />}>
						Etiqueta
					</MenuButton>
					<MenuList padding={".5rem"}>
						<FilterTagsDisplayer allTags={allTags} />
					</MenuList>
				</Menu>
				{filter?.tags && filter.tags.length > 0 && (
					<Box
						width={"15px"}
						height={"15px"}
						margin="2px"
						bg={"brand.white500"}
						padding={"0 .2px"}
						borderRadius={"2rem"}
						onClick={() => {
							setFilter((prev) => {
								return {
									tags: [],
									sizeOptions: { ...prev?.sizeOptions },
								};
							});
						}}
					>
						<CloseButton size={"sm"} />
					</Box>
				)}
			</Flex>
		</Flex>
	);
};

export default FilterButtons;
