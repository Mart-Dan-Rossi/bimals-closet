import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { AuthModalData } from "@/utils/modal";
import { Fragment } from "react";
import Link from "next/link";

export const AuthModal = ({
	handleLogout,
	token,
}: {
	handleLogout: () => void;
	token: string | null | undefined;
}) => {
	return (
		<Box>
			<Stack
				bg="brand.white100"
				w="13rem"
				justifyContent="center"
				borderRadius="1rem"
				position="absolute"
				top="8rem"
				right="8rem"
				zIndex="2"
				overflow="hidden"
				display={["none", "block"]}
			>
				{AuthModalData.map((item, idx) => {
					return (
						<Fragment key={idx}>
							{item.link ? (
								<Box w={["max-content", "100%"]}>
									<Link href={item.link}>
										<Flex
											alignItems="center"
											role="group"
											cursor="pointer"
											p=".9rem 1.5rem"
											color="black"
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
												{item.text === "Desconectar" && token === null
													? "Conectar"
													: item.text}
											</Text>
										</Flex>
									</Link>
								</Box>
							) : (
								<Box w="max-content">
									<Flex
										alignItems="center"
										cursor="pointer"
										p=".9rem 1.5rem"
										onClick={handleLogout}
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
											color="black"
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
