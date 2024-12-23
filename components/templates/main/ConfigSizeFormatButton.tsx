import { useGlobalContext } from "@/context/GlobalContext";
import { Box, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { AiFillSetting } from "react-icons/ai";

export const ConfigSizeFormatButton = () => {
	const btnRef = useRef();

	const { onOpenSizeTypesDrawer } = useGlobalContext();

	return (
		<Box>
			<Button
				ref={btnRef.current}
				colorScheme="green"
				onClick={onOpenSizeTypesDrawer}
			>
				<AiFillSetting />
			</Button>
		</Box>
	);
};
