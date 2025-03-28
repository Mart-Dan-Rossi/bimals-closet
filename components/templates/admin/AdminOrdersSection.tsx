import { useGlobalContext } from "@/context/GlobalContext";
import { OrderDataBEFormat } from "@/types/order";
import {
	Box,
	HStack,
	Switch,
	TabPanel,
	Text,
	useBoolean,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminOrderCard from "./AdminOrderCard";

const AdminOrdersSection = () => {
	const { ordersData } = useGlobalContext();

	const [showDeliveredOrders, { toggle: toggleShowDeliveredOrders }] =
		useBoolean(false);

	const [finalOrders, setFinalOrders] = useState<
		OrderDataBEFormat[] | undefined
	>();

	useEffect(() => {
		if (showDeliveredOrders) {
			setFinalOrders(ordersData);
		} else {
			const ordersFiltered = ordersData?.filter((order) => !order.isDelivered);
			setFinalOrders(ordersFiltered);
		}
	}, [ordersData, showDeliveredOrders]);

	return (
		<TabPanel>
			<HStack>
				<Text fontWeight={"600"}>Mostrar entregados</Text>
				<Switch
					isChecked={showDeliveredOrders}
					size="lg"
					onChange={toggleShowDeliveredOrders}
				/>
			</HStack>
			{finalOrders &&
				finalOrders?.map((orderData, index) => {
					return (
						<Box
							key={`admin-order-card-${orderData.products[0].id}-${orderData.user}-${index}`}
						>
							<AdminOrderCard orderData={orderData} />
						</Box>
					);
				})}
		</TabPanel>
	);
};

export default AdminOrdersSection;
