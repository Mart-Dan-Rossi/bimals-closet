import { BurguerIcon } from "@/components/Header/BurguerIcon";
import { DesktopUserInteraction } from "@/components/Header/DesktopUserInteraction";
import { ExtraInfo } from "@/components/Header/ExtraInfo";
import { useGlobalContext } from "@/context/GlobalContext";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Box, Stack, Text, useBoolean } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainSectionsNavigation from "./MainSectionNavigation";

export const Header = ({
	subHeaderName,
}: {
	subHeaderName: string | undefined;
}) => {
	const router = useRouter();

	const { finalProductsData } = useGlobalContext();

	const token = useHydratedStoreState("token");

	const [openModal, setOpenModal] = useBoolean();
	const [name, setName] = useState<string>("");

	const [loggedIsAdmin, setLoggedIsAdmin] = useState(false);

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : undefined;
		const fullName = user ? user.name : undefined;

		const base64Url = token && token.split(".")[1];
		const base64 = base64Url && base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const tokenData = base64 && JSON.parse(atob(base64));

		if (JSON.stringify(name) !== JSON.stringify(fullName)) {
			setName(fullName);
		}

		setLoggedIsAdmin(tokenData && tokenData.role === "admin");
	}, [name, token]);

	return (
		<Box
			bg={"brand.headerBG"}
			pos="fixed"
			w="100%"
			zIndex="99"
			userSelect="none"
		>
			<Box maxW="1280px" mx="auto" p="2rem 0 0 0">
				<Stack
					spacing="0"
					direction={["row"]}
					justifyContent="space-between"
					alignItems="center"
					p="1.5rem 3rem"
					color={"brand.white100"}
				>
					<Box>
						<Box cursor="pointer" onClick={() => router.push("/")}>
							<Text fontWeight="700" fontSize={["1.8rem", "2.5rem"]}>
								SHOES2JUMP
							</Text>
						</Box>
					</Box>

					<MainSectionsNavigation
						subHeaderName={subHeaderName}
						isMobile={false}
					/>

					<BurguerIcon setOpenModal={setOpenModal} />

					<DesktopUserInteraction name={name} loggedIsAdmin={loggedIsAdmin} />
				</Stack>
			</Box>

			<ExtraInfo
				subHeaderName={subHeaderName}
				openModal={openModal}
				loggedIsAdmin={loggedIsAdmin}
			/>
		</Box>
	);
};
