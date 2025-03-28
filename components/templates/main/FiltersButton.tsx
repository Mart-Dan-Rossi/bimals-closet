import { useGlobalContext } from "@/context/GlobalContext";
import { capitalize } from "@/utils/functions";
import { Box, Button, Flex, HStack, Tag, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import { AiFillFilter } from "react-icons/ai";
import { MdClose } from "react-icons/md";

export const FiltersButton = () => {
	const btnRef = useRef();

	const { onOpenFiltersDrawer, filter, handleClearFilters, isDarkMode } =
		useGlobalContext();

	return (
		<Box margin={"2rem"}>
			<Box>
				<Button
					ref={btnRef.current}
					colorScheme="gray"
					onClick={onOpenFiltersDrawer}
				>
					<AiFillFilter />
				</Button>
			</Box>
			{(filter?.sizeOptions || (filter?.tags && filter.tags.length > 0)) && (
				<VStack mt={"0.5rem"} alignItems={"flex-start"}>
					<VStack fontSize={"sm"} alignItems={"flex-start"}>
						<Flex gap={"2rem"}>
							<Text
								fontSize={"lg"}
								fontWeight="600"
								color={
									isDarkMode
										? "darkBrand.secondaryColor1"
										: "brand.secondaryColor1"
								}
							>
								Filtros aplicados:
							</Text>
							<Box padding={"0.5rem"} bg={"white"} borderRadius={"1rem"}>
								<MdClose cursor={"pointer"} onClick={handleClearFilters} />
							</Box>
						</Flex>
						{filter.sizeOptions &&
							filter.sizeOptions.usSize.min &&
							filter.sizeOptions.usSize.max && (
								<VStack alignItems={"flex-start"} ml={"1rem"}>
									<HStack>
										<Text
											fontSize={"lg"}
											fontWeight="600"
											color={
												isDarkMode
													? "darkBrand.secondaryColor1"
													: "brand.secondaryColor1"
											}
										>
											Talle min:{" "}
										</Text>
										<Text
											fontSize={"lg"}
											color={
												isDarkMode
													? "darkBrand.secondaryColor4"
													: "brand.white100"
											}
										>
											{filter.sizeOptions.usSize.min}US
										</Text>
									</HStack>

									<HStack>
										<Text
											fontSize={"lg"}
											fontWeight="600"
											color={
												isDarkMode
													? "darkBrand.secondaryColor1"
													: "brand.secondaryColor1"
											}
										>
											Talle max:{" "}
										</Text>
										<Text
											fontSize={"lg"}
											color={
												isDarkMode
													? "darkBrand.secondaryColor4"
													: "brand.white100"
											}
										>
											{filter.sizeOptions.usSize.max}US
										</Text>
									</HStack>
								</VStack>
							)}

						{filter.tags && (
							<HStack
								ml={"1rem"}
								cursor={"pointer"}
								justifyContent={"flex-start"}
								onClick={onOpenFiltersDrawer}
							>
								{filter.tags.map((tag) => (
									<Tag
										key={`adminHome-tag-filter-${tag}`}
										variant={"solid"}
										colorScheme="orange"
									>
										{capitalize(tag)}
									</Tag>
								))}
							</HStack>
						)}
					</VStack>
				</VStack>
			)}
		</Box>
	);
};
