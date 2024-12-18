import { Box, Flex, useBoolean } from "@chakra-ui/react";

interface Props {
	setOpenModal: {
		on: () => void;
		off: () => void;
		toggle: () => void;
	};
}

export const BurguerIcon = ({ setOpenModal }: Props) => {
	const [active, setActive] = useBoolean();

	const handleToggle = () => {
		setOpenModal.toggle();
		setActive.toggle();
	};

	return (
		<Flex
			onClick={handleToggle}
			display={["block", "none", "none", "none"]}
			cursor="pointer"
		>
			<Box
				as="span"
				w="2.5rem"
				h=".3rem"
				bg="brand.white100"
				transition="all 0.3s ease-in-out"
				borderRadius="12rem"
				display="block"
				_odd={{
					transform: active ? "translateY(0.375rem) rotate(45deg)" : "",
				}}
			/>
			<Box
				as="span"
				w="1.25rem"
				h=".3rem"
				bg="brand.white100"
				borderRadius="12rem"
				my={active ? "0" : ".5rem"}
				ml="1.25rem"
				opacity={active ? 0 : 1}
				display="block"
			/>
			<Box
				as="span"
				w="2.5rem"
				h=".3rem"
				bg="brand.white100"
				transition="all 0.3s ease-in-out"
				borderRadius="12rem"
				display="block"
				_odd={{
					transform: active ? "translateY(-0.2125rem) rotate(-45deg)" : "",
				}}
			/>
		</Flex>
	);
};
