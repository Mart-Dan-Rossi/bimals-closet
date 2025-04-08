import { Products } from "@/components/templates/main";
import MainLayout from "@/layouts/MainLayout";

const AllProductsSection = () => {
	return (
		<MainLayout {...{ subHeaderName: "Todo" }}>
			<Products section={"todo"} />
		</MainLayout>
	);
};

export default AllProductsSection;
