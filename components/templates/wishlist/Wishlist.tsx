import { CustomButton } from "@/components/ui/buttons/CustomButton";
import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";
import { useGlobalContext } from "@/context/GlobalContext";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Box, Center, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { WishlistLogguedIn } from "./WishlistLogguedIn";

export const Wishlist = () => {
	const router = useRouter();
	const token = useHydratedStoreState("token");

	const { isDarkMode } = useGlobalContext();

	return (
		<Box
			pt="15rem"
			pb="5rem"
			bg={isDarkMode ? "darkBrand.white300" : "brand.white300"}
			minHeight={"90vh"}
		>
			<Box maxW="880px" mx="auto" px="3rem">
				<PreviousPageButton />

				{token ? (
					<WishlistLogguedIn />
				) : (
					<Center flexDir="column" h="42vh">
						<Icon
							as={MdOutlineDisabledByDefault}
							fontSize="10rem"
							color={isDarkMode ? "darkBrand.color1" : "brand.color1"}
							opacity="0.4"
						/>
						<Text mt="1rem" fontWeight="300" textAlign="center">
							Esta función es exclusiva para usuarios logueados. Conéctacte para
							usar nuestra plataforma plenamente y disfrutar la experiencia de
							compra aún más.
						</Text>
						<Box cursor="pointer" onClick={() => router.push("/auth/login")}>
							<Box w="100%">
								<CustomButton
									{...{
										text: "Conectar",
										py: ["2rem", "2rem"],
										px: "4rem",
										border: ".2rem solid",
										borderColor: "transparent",
									}}
								/>
							</Box>
						</Box>
					</Center>
				)}
			</Box>
		</Box>
	);
};
