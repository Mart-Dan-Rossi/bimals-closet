import { useGlobalContext } from "@/context/GlobalContext";
import { Product } from "@/types/product";
import { capitalize } from "@/utils/functions";
import { SiteMainSections } from "@/utils/helpers";
import { Brand, validBrands } from "@/utils/productCaracteristics";
import {
	Box,
	Button,
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
import TinyCloseButton from "./buttons/TinyCloseButton";
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
	const { finalProductsData, filter, setFilter, setSelectedTags } =
		useGlobalContext();
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
			?.filter((product) => {
				return product.productType === sectionFilter;
			})
			?.map((product) => {
				return product.sizeOptions.map((sizeOption) => {
					return sizeOption.usSize;
				});
			})
			.flat();
	}

	function handleSetBrandFilter(brand: Brand) {
		setFilter((prev) => {
			return { ...(prev ?? {}), brand };
		});
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
			<Flex>
				<Menu>
					<MenuButton as={Button} rightIcon={<GoChevronDown />}>
						Marca
					</MenuButton>
					<MenuList>
						{validBrands.map((brand, index) => {
							return (
								<MenuItem
									key={`filter-buttons-brand-${brand}-${index}`}
									onClick={() => handleSetBrandFilter(brand)}
								>
									{capitalize(brand)}
								</MenuItem>
							);
						})}
					</MenuList>
				</Menu>
				{filter?.brand && (
					<TinyCloseButton
						onClickFunction={() => {
							setFilter((prev) => {
								return {
									...(prev ?? {}),
									brand: undefined,
								};
							});
						}}
					/>
				)}
			</Flex>
			{sectionFilter === "calzado" || sectionFilter === "indumentaria" ? (
				<Flex>
					<Menu>
						<MenuButton as={Button} rightIcon={<GoChevronDown />}>
							Talle
						</MenuButton>
						<MenuList>
							<Flex flexDirection={"column"} gap={1} width={"100%"}>
								<Flex justify={"start"} gap={2} align={"end"} m={"0 1rem"}>
									<Text fontWeight={"600"}>
										Talles {`${sectionFilter === "calzado" ? "(US)" : ""}`}
									</Text>
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
							<TinyCloseButton
								onClickFunction={() => {
									setFilter((prev) => {
										return {
											...(prev ?? {}),
											sizeOptions: {
												usSize: { min: 0, max: 9999 },
												color: prev?.sizeOptions?.color,
											},
										};
									});
								}}
							/>
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
				{filter?.sizeOptions?.color && (
					<TinyCloseButton
						onClickFunction={() => {
							setFilter((prev) => {
								return {
									...(prev ?? {}),
									sizeOptions: {
										usSize: prev?.sizeOptions?.usSize,
										color: undefined,
									},
								};
							});
						}}
					/>
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
					<TinyCloseButton
						onClickFunction={() => {
							setFilter((prev) => {
								return { ...(prev ?? {}), tags: undefined };
							});
							setSelectedTags([]);
						}}
					/>
				)}
			</Flex>
		</Flex>
	);
};

export default FilterButtons;
