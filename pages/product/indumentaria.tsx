import { Products } from "@/components/templates/main";
import MainLayout from "@/layouts/MainLayout";

const SeccionIdumentaria = () => {
	return (
		<MainLayout {...{ subHeaderName: "Indumentaria" }}>
			<Products section={"indumentaria"} />
		</MainLayout>
	);
};

export default SeccionIdumentaria;
