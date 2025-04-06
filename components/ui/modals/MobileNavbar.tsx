import { useGlobalContext } from "@/context/GlobalContext";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { AuthModalData } from "@/utils/modal";
import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";

interface Props {
	loggedIsAdmin: boolean;
}

export const MobileNavbar = ({ loggedIsAdmin }: Props) => {
	const router = useRouter();

	const { handleLogout } = useGlobalContext();

	const token = useHydratedStoreState("token");

	return (
		<Box
			bg={"brand.dark100"}
			color={"brand.secondaryColor1"}
			h="100%"
			pos="fixed"
			top="7rem"
			left="0"
			w="100%"
			zIndex="99"
			display={["block", "none", "none", "none"]}
		>
			<Box
				bg={"brand.lightGrey"}
				mt="0rem"
				p="1rem"
				w="100%"
				borderBottomLeftRadius=".6rem"
				borderBottomRightRadius=".6rem"
			>
				<HStack
					alignItems="flex-start"
					display={["block", "block", "block", "none"]}
					justifyContent="space-between"
					fontSize="1.7rem"
					fontWeight="500"
					spacing={0}
				>
					{loggedIsAdmin && (
						<Box cursor="pointer" onClick={() => router.push("/adminPanel")}>
							Admin panel
						</Box>
					)}
					{AuthModalData.map((item, idx) => {
						return (
							<Fragment key={idx}>
								{item.link ? (
									<Box w="max-content">
										<Box
											cursor="pointer"
											onClick={() => item.link && router.push(item.link)}
										>
											<Flex
												alignItems="center"
												role="group"
												cursor="pointer"
												p=".9rem 1.5rem"
												_hover={{
													bg: "brand.color1",
													color: "brand.white100",
													borderRadius: ".4rem",
												}}
											>
												<Icon
													color={"brand.color1"}
													_groupHover={{ color: "brand.white100" }}
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
										</Box>
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
												color={"brand.color1"}
												_groupHover={{ color: "brand.white100" }}
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
									</Box>
								)}
							</Fragment>
						);
					})}
				</HStack>
			</Box>
		</Box>
	);
};
