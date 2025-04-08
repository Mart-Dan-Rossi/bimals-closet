import { Products } from "@/components/templates/main";
import MainLayout from "@/layouts/MainLayout";

const ShoesSection = () => {
	return (
		<MainLayout {...{ subHeaderName: "Calzado" }}>
			<Products section={"calzado"} />
		</MainLayout>
	);
};

export default ShoesSection;
