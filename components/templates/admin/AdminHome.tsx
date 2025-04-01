import { Box, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import AdminProductsSection from "./AdminProductsSection";
import AdminOrdersSection from "./AdminOrdersSection";
import { useGlobalContext } from "@/context/GlobalContext";
import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";

export const AdminHome = () => {
	const { isDarkMode } = useGlobalContext();

	return (
		<Box
			position="relative"
			pt="15rem"
			bg={isDarkMode ? "darkBrand.white200" : "brand.white100"}
		>
			<PreviousPageButton />
			<Tabs
				defaultIndex={0}
				variant={"enclosed-colored"}
				colorScheme={isDarkMode ? "blackAlpha" : ""}
			>
				<TabList>
					<Tab fontSize={"large"} value="products">
						Productos
					</Tab>
					<Tab fontSize={"large"} value="orders">
						Órdenes
					</Tab>
				</TabList>
				<TabPanels>
					<AdminProductsSection />
					<AdminOrdersSection />
				</TabPanels>
			</Tabs>
		</Box>
	);
};
