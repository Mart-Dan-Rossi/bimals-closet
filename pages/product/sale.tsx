import { Products } from "@/components/templates/main";
import MainLayout from "@/layouts/MainLayout";

const SaleSection = () => {
	return (
		<MainLayout {...{ subHeaderName: "Sale" }}>
			<Products section={"sale"} />
		</MainLayout>
	);
};

export default SaleSection;
