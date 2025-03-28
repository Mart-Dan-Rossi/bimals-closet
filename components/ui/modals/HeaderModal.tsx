import { useGlobalContext } from "@/context/GlobalContext";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { AuthModalData } from "@/utils/modal";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";

export const AuthModal = () => {
	const router = useRouter();
	const { handleLogout } = useGlobalContext();
	const token = useHydratedStoreState("token");

	const { isDarkMode } = useGlobalContext();

	return (
		<Box
			position="absolute"
			top="3rem"
			border={"1px solid grey"}
			borderRadius="1rem"
			bg={isDarkMode ? "darkBrand.white200" : "brand.white200"}
			zIndex="2"
			display={["none", "block"]}
			boxShadow="0px 12px 15px black"
		>
			<Stack w="13rem" justifyContent="center" overflow="hidden">
				{AuthModalData.map((item, idx) => {
					return (
						<Fragment key={idx}>
							{item.link ? (
								<Box w={["max-content", "100%"]}>
									<Box
										cursor="pointer"
										onClick={() => item.link && router.push(item.link)}
									>
										<Flex
											alignItems="center"
											role="group"
											cursor="pointer"
											p=".9rem 1.5rem"
											color="black"
											_hover={{
												bg: isDarkMode ? "darkBrand.color1" : "brand.color1",
												color: isDarkMode
													? "darkBrand.white100"
													: "brand.white100",
												borderRadius: ".4rem",
											}}
										>
											<Icon
												color={
													isDarkMode ? "darkBrand.white100" : "brand.color1"
												}
												_groupHover={{
													color: isDarkMode
														? "darkBrand.white100"
														: "brand.white100",
												}}
												as={item.icon}
											/>

											<Text
												color={isDarkMode ? "darkBrand.white100" : "black"}
												ml=".8rem"
												fontSize="1.4rem"
												display="flex"
												alignItems="center"
											>
												{item.text === "Desconectar" && token === null
													? "Conectar"
													: item.text}
											</Text>
										</Flex>
									</Box>
								</Box>
							) : (
								<Box w="max-content">
									<Flex
										alignItems="center"
										cursor="pointer"
										p=".9rem 1.5rem"
										onClick={handleLogout}
										_hover={{
											bg: isDarkMode ? "darkBrand.color1" : "brand.color1",
											color: isDarkMode
												? "darkBrand.white100"
												: "brand.white100",
											borderRadius: ".4rem",
										}}
									>
										<Icon
											color={isDarkMode ? "darkBrand.white100" : "brand.color1"}
											_groupHover={{
												color: isDarkMode
													? "darkBrand.white100"
													: "brand.white100",
											}}
											as={item.icon}
										/>

										<Text
											ml=".8rem"
											fontSize="1.4rem"
											display="flex"
											alignItems="center"
											color={isDarkMode ? "darkBrand.white100" : "black"}
										>
											{item.text === "Desconectar" &&
											(token === null || token === undefined)
												? "Conectar"
												: item.text}
										</Text>
									</Flex>
								</Box>
							)}
						</Fragment>
					);
				})}
			</Stack>
		</Box>
	);
};
