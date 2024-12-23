import { useGlobalContext } from "@/context/GlobalContext";
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Text,
} from "@chakra-ui/react";

export const SizeTypesDrawer = () => {
	const {
		currentSizeType,
		setCurrentSizeType,
		sizeTypes,
		isSizeTypesDrawerOpen,
		onCloseSizeTypesDrawer,
	} = useGlobalContext();

	return (
		<Drawer
			isOpen={isSizeTypesDrawerOpen}
			placement="right"
			onClose={onCloseSizeTypesDrawer}
			size={"lg"}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader fontSize={"x-large"}>Formato de talles</DrawerHeader>
				<Text padding={"0 2rem"} fontSize={"smaller"} as="i">
					*Algunos productos podrían verse filtrados al elegir un formato de
					talle que el producto no tenga definido*
				</Text>

				<DrawerBody>
					<Flex>
						{sizeTypes.map((sizeTypeOption) => {
							return (
								<Button
									key={`sizeTypeDrawerOption-${sizeTypeOption}`}
									size={"lg"}
									variant={
										sizeTypeOption === currentSizeType ? "outline" : "solid"
									}
									onClick={() =>
										setCurrentSizeType(sizeTypeOption as "any" | "us" | "eu")
									}
								>
									{sizeTypeOption === "any" ? "Todos" : sizeTypeOption}
								</Button>
							);
						})}
					</Flex>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
