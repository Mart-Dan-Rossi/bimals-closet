import { useHydratedCartState } from "@/hooks/state/hydrated";
import { Box, Circle, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

import { BiUserCircle } from "react-icons/bi";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";

interface Props {
	setOpenDropDown: {
		on: () => void;
		off: () => void;
		toggle: () => void;
	};
	name: string;
	openDropDown: boolean;
}

export const DesktopUserInteraction = ({
	setOpenDropDown,
	name,
	openDropDown,
}: Props) => {
	const cart = useHydratedCartState("cart");

	return (
		<Box display={["none", "flex"]}>
			<Stack
				spacing="2rem"
				direction={["row"]}
				alignItems="center"
				fontSize="2rem"
				fontWeight="500"
			>
				<Link href="/cart">
					<Box as="span" pos="relative">
						<Circle
							bg="brand.gold100"
							p=".3rem .6rem"
							pos="absolute"
							left="1.1rem"
							top="-.7rem"
							fontSize=".9rem"
							fontWeight="600"
						>
							{cart?.length}
						</Circle>
						<Icon cursor="pointer" as={TiShoppingCart} />
					</Box>
				</Link>

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
							{name ? (
								<Text ml=".2rem" fontSize="1.5rem">
									{name}
								</Text>
							) : (
								<Text ml=".2rem" fontSize="1.5rem">
									Invitado
								</Text>
							)}
						</Box>

						<Box fontSize="1.5rem" pos="relative">
							{openDropDown ? <MdArrowDropUp /> : <MdArrowDropDown />}
						</Box>
					</Flex>
				</Flex>
			</Stack>
		</Box>
	);
};
