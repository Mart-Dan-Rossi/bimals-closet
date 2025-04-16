import { Box, CloseButton } from "@chakra-ui/react";

interface Props {
	onClickFunction: () => void;
}

const TinyCloseButton = ({ onClickFunction }: Props) => {
	return (
		<Box
			width={"15px"}
			height={"15px"}
			margin="2px"
			bg={"brand.white500"}
			padding={"0 .2px"}
			borderRadius={"2rem"}
			onClick={onClickFunction}
		>
			<CloseButton size={"sm"} />
		</Box>
	);
};

export default TinyCloseButton;
