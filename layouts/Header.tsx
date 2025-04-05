import { BurguerIcon } from "@/components/Header/BurguerIcon";
import { DesktopUserInteraction } from "@/components/Header/DesktopUserInteraction";
import { ExtraInfo } from "@/components/Header/ExtraInfo";
import { useGlobalContext } from "@/context/GlobalContext";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Box, Stack, Text, useBoolean } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export const Header = ({
	subHeaderName,
}: {
	subHeaderName: string | undefined;
}) => {
	const router = useRouter();
	const { isDarkMode } = useGlobalContext();

	const token = useHydratedStoreState("token");

	const [openModal, setOpenModal] = useBoolean();
	const [name, setName] = useState<string>("");

	function getAdminsIds() {
		const allIds = process.env.NEXT_PUBLIC_ADMINS_IDS || "0";
		return allIds?.split("/");
	}

	const adminIds = useRef(getAdminsIds()).current as string[];

	const [loggedIsAdmin, setLoggedIsAdmin] = useState(false);

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : undefined;
		const fullName = user ? user.name : undefined;
		const userId = user ? user.id : undefined;

		if (JSON.stringify(name) !== JSON.stringify(fullName)) {
			setName(fullName);
		}

		if (userId) {
			setLoggedIsAdmin(adminIds.includes(userId));
		}
	}, [name, token]);

	return (
		<Box
			bg={isDarkMode ? "darkBrand.color1" : "brand.color1"}
			pos="fixed"
			w="100%"
			zIndex="99"
		>
			<Box maxW="1280px" mx="auto" p="2rem 0 0 0">
				<Stack
					spacing="0"
					direction={["row"]}
					justifyContent="space-between"
					alignItems="center"
					p="1.5rem 3rem"
					color={isDarkMode ? "darkBrand.white100" : "brand.white100"}
				>
					<Box>
						<Box cursor="pointer" onClick={() => router.push("/")}>
							<Text fontWeight="700" fontSize={["1.8rem", "2.5rem"]}>
								Mateo Shoes
							</Text>
						</Box>
					</Box>

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
