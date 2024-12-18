import { BurguerIcon } from "@/components/Header/BurguerIcon";
import { DesktopUserInteraction } from "@/components/Header/DesktopUserInteraction";
import { ExtraInfo } from "@/components/Header/ExtraInfo";
import { AuthModal } from "@/components/ui/modals";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { useStoreState } from "@/hooks/state/storage";
import { Box, Stack, Text, useBoolean } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Header = ({
	subHeaderName,
}: {
	subHeaderName: string | undefined;
}) => {
	const [openDropDown, setOpenDropDown] = useBoolean();
	const [openModal, setOpenModal] = useBoolean();
	const [name, setName] = useState<string>("");
	const token = useHydratedStoreState("token");
	const { removeToken } = useStoreState((state) => state);
	const router = useRouter();

	const handleLogout = () => {
		removeToken();

		router.push("/auth/login");
	};

	useEffect(() => {
		const storedUser = sessionStorage.getItem("user");
		const user = storedUser ? JSON.parse(storedUser) : null;
		const fullName = user ? user.name : null;

		setName(fullName);
	}, [name]);

	return (
		<Box bg="brand.color1" pos="fixed" w="100%" zIndex="99">
			<Box maxW="1280px" mx="auto" p="2rem 0 0 0">
				<Stack
					spacing="0"
					direction={["row"]}
					justifyContent="space-between"
					alignItems="center"
					p="1.5rem 3rem"
					color="brand.white100"
				>
					<Box>
						<Link href="/">
							<Text fontWeight="700" fontSize={["1.8rem", "2.5rem"]}>
								Mateo Shoes
							</Text>
						</Link>
					</Box>

					<BurguerIcon setOpenModal={setOpenModal} />

					<DesktopUserInteraction
						setOpenDropDown={setOpenDropDown}
						name={name}
						openDropDown={openDropDown}
					/>
				</Stack>
				{openDropDown && <AuthModal {...{ handleLogout, token }} />}
			</Box>

			<ExtraInfo
				subHeaderName={subHeaderName}
				openModal={openModal}
				handleLogout={handleLogout}
				token={token}
			/>
		</Box>
	);
};
