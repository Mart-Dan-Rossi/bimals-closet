import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { CategoriesModalData } from "@/utils/modal";

export const CategoriesModal = () => {
	return (
		<Box>
			<Stack
				bg="brand.white100"
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
							bg: "brand.color1",
							color: "brand.white100",
							borderRadius: ".4rem",
						}}
					>
						<Icon
							color="brand.color1"
							_groupHover={{
								color: "brand.white100",
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
