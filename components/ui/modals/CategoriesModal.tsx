import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { CategoriesModalData } from "@/utils/modal";
import { useGlobalContext } from "@/context/GlobalContext";

export const CategoriesModal = () => {
	const { isDarkMode } = useGlobalContext();
	return (
		<Box>
			<Stack
				bg={isDarkMode ? "darkBrand.white100" : "brand.white100"}
				w="13rem"
				justifyContent="center"
				borderRadius="1rem"
				position="absolute"
				top={["12.5rem", "12.5rem", "12.5rem", "12.5rem"]}
				left={["3rem", "3rem", "3rem", "3rem", "11rem"]}
				zIndex="2"
				overflow="hidden"
			>
				{CategoriesModalData.map((item, idx) => (
					<Flex
						key={idx}
						role="group"
						alignItems="center"
						cursor="pointer"
						p=".9rem 1.5rem"
						_hover={{
							bg: isDarkMode ? "darkBrand.color1" : "brand.color1",
							color: isDarkMode ? "darkBrand.white100" : "brand.white100",
							borderRadius: ".4rem",
						}}
					>
						<Icon
							color={isDarkMode ? "darkBrand.color1" : "brand.color1"}
							_groupHover={{
								color: isDarkMode ? "darkBrand.white100" : "brand.white100",
							}}
							as={item.icon}
						/>

						<Text
							ml=".8rem"
							fontSize="1.4rem"
							display="flex"
							alignItems="center"
						>
							{item.text}
						</Text>
					</Flex>
				))}
			</Stack>
		</Box>
	);
};
