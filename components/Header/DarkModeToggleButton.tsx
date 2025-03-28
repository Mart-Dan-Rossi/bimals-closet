import { useGlobalContext } from "@/context/GlobalContext";
import { Box } from "@chakra-ui/react";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";

const DarkModeToggleButton = () => {
	const { isDarkMode, toggleDarkMode } = useGlobalContext();
	return (
		<Box
			padding={"1rem"}
			borderRadius={"20px"}
			backgroundColor={isDarkMode ? "white" : "black"}
			cursor="pointer"
			onClick={toggleDarkMode}
			boxShadow={`0px 0px 10px 2px ${
				isDarkMode ? "rgba(0,0,0,0.75)" : "rgba(255, 255, 255, 0.75)"
			}`}
			aspectRatio={1}
			display={"inline-block"}
		>
			{isDarkMode ? <GoSun color="black" /> : <IoMoonOutline color="white" />}
		</Box>
	);
};

export default DarkModeToggleButton;
