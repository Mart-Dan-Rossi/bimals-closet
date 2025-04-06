import PreviousPageButton from "@/components/ui/buttons/PreviousPageButton";
import { Box, Tab, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import AdminOrdersSection from "./AdminOrdersSection";
import AdminProductsSection from "./AdminProductsSection";

export const AdminHome = () => {
	return (
		<Box position="relative" pt="15rem" bg={"brand.white100"}>
			<PreviousPageButton />
			<Tabs defaultIndex={0} variant={"enclosed-colored"}>
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
