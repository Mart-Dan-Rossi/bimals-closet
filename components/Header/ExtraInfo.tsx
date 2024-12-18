import { Box, Flex, Icon, Text, useBoolean } from "@chakra-ui/react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { CategoriesModal } from "../ui/modals";
import { MobileNavbar } from "../ui/modals/MobileNavbar";

interface Props {
	subHeaderName: string | undefined;
	openModal: boolean;
	handleLogout: () => void;
	token: string | null | undefined;
}

export const ExtraInfo = ({
	subHeaderName,
	openModal,
	handleLogout,
	token,
}: Props) => {
	const [openCatgories, setOpenCatgories] = useBoolean();

	return (
		<Box bg="brand.white100" shadow="xs">
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
					color="brand.color1"
					cursor="pointer"
					w="max-content"
				>
					<Text
						ml={["3rem", ".2rem"]}
						fontSize="1.5rem"
						color="brand.secondaryColor1"
						fontWeight="600"
					>
						{subHeaderName}
					</Text>
					{subHeaderName === "Categories" && (
						<Icon
							fontSize="1.5rem"
							color="brand.color1"
							_groupHover={{
								color: "brand.white100",
							}}
							as={openCatgories ? MdArrowDropUp : MdArrowDropDown}
						/>
					)}
				</Flex>
			</Box>

			{openModal && token !== undefined ? <MobileNavbar {...{ handleLogout, token }} /> : null}
			{openCatgories && subHeaderName === "Categories" ? (
				<CategoriesModal />
			) : null}
		</Box>
	);
};
