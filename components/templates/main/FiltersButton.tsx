import { useGlobalContext } from "@/context/GlobalContext";
import { Box, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { AiFillFilter } from "react-icons/ai";

export const FiltersButton = () => {
	const btnRef = useRef();

	const { onOpenFiltersDrawer } = useGlobalContext();

	return (
		<Box>
			<Button
				ref={btnRef.current}
				colorScheme="gray"
				onClick={onOpenFiltersDrawer}
			>
				<AiFillFilter />
			</Button>
		</Box>
	);
};
