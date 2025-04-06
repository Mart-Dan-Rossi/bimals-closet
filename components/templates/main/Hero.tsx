import { Box } from "@chakra-ui/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export const Hero = () => {
	return (
		<Box
			maxH={"70vh"}
			overflow={"hidden"}
			display="flex"
			justifyContent="center"
			alignItems="center"
			bg="black"
		>
			<video
				width={"100%"}
				src="./assets/Basketball-Intro-Video.mp4"
				autoPlay
				muted
				loop
			/>
		</Box>
	);
};
