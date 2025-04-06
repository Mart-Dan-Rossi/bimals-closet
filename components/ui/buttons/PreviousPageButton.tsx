import { Box, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiChevronLeft } from "react-icons/bi";

interface Props {
	color?: string;
}

const PreviousPageButton = ({ color }: Props) => {
	const router = useRouter();

	return (
		<Box as="span" mb="2rem" onClick={() => router.back()}>
			<Icon
				as={BiChevronLeft}
				fontSize="3rem"
				cursor="pointer"
				color={color || "black"}
			/>
		</Box>
	);
};

export default PreviousPageButton;
