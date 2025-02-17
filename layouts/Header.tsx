import { BurguerIcon } from "@/components/Header/BurguerIcon";
import { DesktopUserInteraction } from "@/components/Header/DesktopUserInteraction";
import { ExtraInfo } from "@/components/Header/ExtraInfo";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Box, Stack, Text, useBoolean } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = ({
	subHeaderName,
}: {
	subHeaderName: string | undefined;
}) => {
	const token = useHydratedStoreState("token");
	const [openModal, setOpenModal] = useBoolean();
	const [name, setName] = useState<string>("");

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : undefined;
		const fullName = user ? user.name : undefined;

		if (JSON.stringify(name) !== JSON.stringify(fullName)) {
			setName(fullName);
		}
	}, [name, token]);

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

					<DesktopUserInteraction name={name} />
				</Stack>
			</Box>

			{<ExtraInfo subHeaderName={subHeaderName} openModal={openModal} />}
		</Box>
	);
};
