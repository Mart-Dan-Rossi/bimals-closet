import SocialMedia from "@/components/ui/SocialMedia";
import { Box } from "@chakra-ui/react";

export const Footer = () => {
	return (
		<Box bg={"brand.footerBG"}>
			<Box maxW="1280px" mx="auto" p="1.5rem 3rem">
				<SocialMedia />
			</Box>
		</Box>
	);
};
