import { useHydratedCartState } from "@/hooks/state/hydrated";
import {
	Box,
	Circle,
	Flex,
	Icon,
	Stack,
	Text,
	useBoolean,
} from "@chakra-ui/react";

import { Product } from "@/types/product";
import { getTotalProductsReserved } from "@/utils/functions";
import { useRouter } from "next/router";
import { BiUserCircle } from "react-icons/bi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { AuthModal } from "../ui/modals";
interface Props {
	name: string;
	loggedIsAdmin: boolean;
	userReservedProducts: Product[];
}

export const DesktopUserInteraction = ({
	name,
	loggedIsAdmin,
	userReservedProducts,
}: Props) => {
	const router = useRouter();

	const cart = useHydratedCartState("cart");
	const [openDropDown, setOpenDropDown] = useBoolean();

	return (
		<Box position={"relative"} display={["none", "none", "none", "flex"]}>
			<Stack
				spacing="2rem"
				direction={["row"]}
				alignItems="center"
				fontSize="2rem"
				fontWeight="500"
			>
				{loggedIsAdmin && (
					<Text cursor="pointer" onClick={() => router.push("/adminPanel")}>
						Admin panel
					</Text>
				)}

				<Box cursor="pointer" onClick={() => router.push("/cart")}>
					<Box as="span" pos="relative">
						<Circle
							bg={"brand.gold100"}
							p=".3rem .7rem"
							pos="absolute"
							left="1.1rem"
							top="-.7rem"
							fontSize=".9rem"
							fontWeight="600"
						>
							{cart &&
								cart?.length + getTotalProductsReserved(userReservedProducts)}
						</Circle>
						<Icon cursor="pointer" as={TiShoppingCart} />
					</Box>
				</Box>

				{name ? (
					<Flex
						onClick={setOpenDropDown.toggle}
						alignItems="center"
						cursor="pointer"
					>
						<Box>
							<Icon cursor="pointer" as={BiUserCircle} />
						</Box>
						<Flex align="center">
							<Box mt="-.5rem">
								<Text ml=".2rem" fontSize="1.5rem">
									{name}
								</Text>
							</Box>

							<Box fontSize="1.5rem" pos="relative">
								{openDropDown ? <MdArrowDropUp /> : <MdArrowDropDown />}
							</Box>
						</Flex>
					</Flex>
				) : (
					<Text
						cursor="pointer"
						ml=".2rem"
						fontSize="1.5rem"
						fontWeight="bold"
						onClick={() => router.push("/auth/login")}
					>
						Log in
					</Text>
				)}
			</Stack>
			{openDropDown && <AuthModal />}
		</Box>
	);
};
