import { AdminHome } from "@/components/templates/admin/AdminHome";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@chakra-ui/react";

const AdminPanel = () => {
	return (
		<Box>
			<MainLayout {...{ subHeaderName: "Panel de administración" }}>
				<AdminHome />
			</MainLayout>
		</Box>
	);
};

export default AdminPanel;
