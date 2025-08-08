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
import { useEffect, useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";
import TinyCloseButton from "./buttons/TinyCloseButton";
import { FilterColorDisplayer } from "./modals/FilterColorDisplayer";
import { FilterSizeDisplayer } from "./modals/FilterSizeDisplayer";
import { FilterTagsDisplayer } from "./modals/FilterTagsDisplayer";

interface Props {
	filteredProductsData: Product[] | undefined;
	section?: SiteMainSections | undefined;
}

const FilterButtons = ({ section }: Props) => {
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
				return product.productType === section;
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
		<Flex gap={"2rem"} alignItems={"flex-end"}>
			<BsFilterLeft color="black" />
			{(section === "todo" || section === "sale") && (
				<Menu>
					<MenuButton as={Button} rightIcon={<GoChevronDown />}>
						Tipo de producto
					</MenuButton>
					<MenuList>
						<MenuItem
							onClick={() => {
								setFilter((prev) => ({
									...(prev ?? {}),
									productType: "calzado",
								}));
							}}
						>
							Calzado
						</MenuItem>
						<MenuItem
							onClick={() => {
								setFilter((prev) => ({
									...(prev ?? {}),
									productType: "indumentaria",
								}));
							}}
						>
							Indumentaria
						</MenuItem>
						<MenuItem
							onClick={() => {
								setFilter((prev) => ({
									...(prev ?? {}),
									productType: "todo",
								}));
							}}
						>
							Todo
						</MenuItem>
					</MenuList>
				</Menu>
			)}
			<Flex direction="column" position="relative">
				{filter?.brand && (
					<Text
						fontSize="0.9rem"
						fontWeight="500"
						color="gray.500"
						mb="0.3rem"
						ml="0.2rem"
					>
						Marca
					</Text>
				)}

				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							as={Button}
							rightIcon={<GoChevronDown />}
							textAlign="left"
							width="100%"
						>
							{filter?.brand ? capitalize(filter.brand) : "Marca"}
						</MenuButton>
						<MenuList>
							{validBrands.map((brand, index) => (
								<MenuItem
									key={`filter-buttons-brand-${brand}-${index}`}
									onClick={() => handleSetBrandFilter(brand)}
								>
									{capitalize(brand)}
								</MenuItem>
							))}
						</MenuList>
					</Menu>

					{filter?.brand && (
						<Box>
							<TinyCloseButton
								onClickFunction={() => {
									setFilter((prev) => ({
										...(prev ?? {}),
										brand: undefined,
									}));
								}}
							/>
						</Box>
					)}
				</Flex>
			</Flex>
			{section === "calzado" || section === "indumentaria" ? (
				<Flex>
					<Menu>
						<MenuButton as={Button} rightIcon={<GoChevronDown />}>
							Talle
						</MenuButton>
						<MenuList>
							<Flex flexDirection={"column"} gap={1} width={"100%"}>
								<Flex justify={"start"} gap={2} align={"end"} m={"0 1rem"}>
									<Text fontWeight={"600"}>
										Talles {`${section === "calzado" ? "(US)" : ""}`}
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
			<Flex direction="column" position="relative">
				{filter?.sizeOptions?.color && (
					<Text
						fontSize="0.9rem"
						fontWeight="500"
						color="gray.500"
						mb="0.3rem"
						ml="0.2rem"
					>
						Color
					</Text>
				)}
				<Flex alignItems="center">
					<Menu>
						<MenuButton
							as={Button}
							rightIcon={<GoChevronDown />}
							textAlign="left"
							width="100%"
						>
							{filter?.sizeOptions?.color
								? capitalize(filter.sizeOptions?.color)
								: "Color"}
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
