import { useGlobalContext } from "@/context/GlobalContext";
import { Box, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";

const PreviousPageButton = () => {
	const router = useRouter();
	const { isDarkMode } = useGlobalContext();

	return (
		<Box as="span" mb="2rem" onClick={() => router.back()}>
			<Icon
				as={BiChevronLeft}
				fontSize="3rem"
				cursor="pointer"
				color={isDarkMode ? "darkBrand.white100" : "black"}
			/>
		</Box>
	);
};

export default PreviousPageButton;
