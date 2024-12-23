import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Box, Center, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { WishlistLogguedIn } from "./WishlistLogguedIn";

export const Wishlist = () => {
	const router = useRouter();
	const token = useHydratedStoreState("token");

	return (
		<Box pt="15rem" pb="5rem">
			<Box maxW="880px" mx="auto" px="3rem">
				<Box as="span" mb="2rem" onClick={() => router.back()}>
					<Icon as={BiChevronLeft} fontSize="3rem" cursor="pointer" />
				</Box>

				{token ? (
					<WishlistLogguedIn />
				) : (
					<Center flexDir="column" h="42vh">
						<Icon
							as={MdOutlineDisabledByDefault}
							fontSize="10rem"
							color="brand.color1"
							opacity="0.4"
						/>
						<Text mt="1rem" fontWeight="300" textAlign="center">
							Esta función es exclusiva para usuarios logueados. Conéctacte para
							usar nuestra plataforma plenamente y disfrutar la experiencia de
							compra aún más.
						</Text>
						<Link href="/auth/login">
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
						</Link>
					</Center>
				)}
			</Box>
		</Box>
	);
};
