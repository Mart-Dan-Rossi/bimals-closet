import { Box } from "@chakra-ui/react";
import { Hero } from "./Hero";
import { Products } from "./Products";
import SitePresentation from "./SitePresentation";

const HomeSection = () => {
	return (
		<Box>
			<Hero />
			<SitePresentation />
			<Products hideFilter={true} />
		</Box>
	);
};

export default HomeSection;
