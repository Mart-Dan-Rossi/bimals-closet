import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Box, Flex, Icon, Text, useBoolean } from "@chakra-ui/react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { CategoriesModal } from "../ui/modals";
import { MobileNavbar } from "../ui/modals/MobileNavbar";
import { useGlobalContext } from "@/context/GlobalContext";

interface Props {
	subHeaderName: string | undefined;
	openModal: boolean;
	loggedIsAdmin: boolean;
}

export const ExtraInfo = ({
	subHeaderName,
	openModal,
	loggedIsAdmin,
}: Props) => {
	const { isDarkMode } = useGlobalContext();
	const token = useHydratedStoreState("token");
	const [openCatgories, setOpenCatgories] = useBoolean();

	return (
		<Box bg={isDarkMode ? "darkBrand.white200" : "brand.white200"} shadow="xs">
			<Box
				maxW="1280px"
				mx="auto"
				py="1.5rem"
				pl={["0rem", "3rem"]}
				alignItems={["left", "center"]}
				flexDir={["column", "column"]}
			>
				<Flex
					onClick={setOpenCatgories.toggle}
					align="center"
					color={isDarkMode ? "darkBrand" : "brand.color1"}
					cursor="pointer"
					w="max-content"
				>
					<Text
						ml={["3rem", ".2rem"]}
						fontSize="1.5rem"
						color={
							isDarkMode ? "darkBrand.secondaryColor1" : "brand.secondaryColor1"
						}
						fontWeight="600"
					>
						{subHeaderName}
					</Text>
					{subHeaderName === "Categories" && (
						<Icon
							fontSize="1.5rem"
							color={isDarkMode ? "darkBrand" : "brand.color1"}
							_groupHover={{
								color: isDarkMode ? "darkBrand.white100" : "brand.white100",
							}}
							as={openCatgories ? MdArrowDropUp : MdArrowDropDown}
						/>
					)}
				</Flex>
			</Box>

			{openModal && token !== undefined ? (
				<MobileNavbar loggedIsAdmin={loggedIsAdmin} />
			) : null}
			{openCatgories && subHeaderName === "Categories" ? (
				<CategoriesModal />
			) : null}
		</Box>
	);
};
