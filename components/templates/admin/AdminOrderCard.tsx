import { useUpdateBEOrder } from "@/hooks/orders/useBEOrders";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { OrderDataBEFormat } from "@/types/order";
import { getAdminsIds } from "@/utils/functions";
import {
	Box,
	Flex,
	Grid,
	HStack,
	Spinner,
	Switch,
	Text,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import AdminProductDataDisplay from "./AdminProductDataDisplay";
import { useGlobalContext } from "@/context/GlobalContext";

interface Props {
	orderData: OrderDataBEFormat;
}

const AdminOrderCard = ({ orderData }: Props) => {
	const { _id, user, name, phone, mail, products, isDelivered } = orderData;

	const { isDarkMode } = useGlobalContext();

	const { mutateAsync: addMutateAsynceEditBEOrder, isLoading } =
		useUpdateBEOrder();
	const token = useHydratedStoreState("token");

	const toast = useToast();
	const [
		isModifiyingDeliveredValue,
		{ on: modifiyingDeliveredValue, off: modifiedDeliveredValue },
	] = useBoolean(false);

	async function uploadBEOrder() {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : undefined;
		const userId = user ? user.id : undefined;
		try {
			const order: OrderDataBEFormat = {
				_id,
				user,
				name,
				phone,
				mail,
				products,
				isDelivered: !isDelivered,
			};

			modifiyingDeliveredValue();
			const res = await addMutateAsynceEditBEOrder(order);
			modifiedDeliveredValue();

			if (res?.status === "success" && getAdminsIds().includes(userId)) {
				toast({ status: "success", title: "Órden cargada correctamente" });
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast({
					status: "error",
					title:
						error?.response?.data?.message ||
						"Ha ocurrido un error! Intenta nuevamente más tarde",
				});
				modifiedDeliveredValue();
			}
		}
	}

	return (
		<Flex
			bg={isDarkMode ? "darkBrand.secondaryColor5" : "brand.secondaryColor5"}
			borderRadius="1rem"
			p="1rem"
			justify="space-between"
			m="2rem"
		>
			<Flex
				alignItems={"flex-start"}
				width={"100%"}
				m={"2rem"}
				justifyContent={"space-between"}
			>
				<HStack alignItems={"flex-start"} gap={"3rem"}>
					<Box>
						{products.map((item, index) => {
							return (
								<Box key={`${orderData._id}-product-${index}`}>
									<AdminProductDataDisplay
										name={item.name}
										sizeOptions={[item.sizeOption]}
										price={item.price}
									/>
								</Box>
							);
						})}
					</Box>
					<Grid>
						{user && user.accName ? (
							<Text fontWeight={"600"}>Cuenta: {user.accName}</Text>
						) : (
							<Text fontWeight={"600"}>Cuenta no encontrada</Text>
						)}
						{name ? (
							<Text fontWeight={"600"}>Nombre: {name}</Text>
						) : (
							<Text fontWeight={"600"}>Nombre no encontrado</Text>
						)}
						{mail ? (
							<Text fontWeight={"600"}>Email: {mail}</Text>
						) : (
							<Text fontWeight={"600"}>Mail no encontrado</Text>
						)}
						{phone ? (
							<Text fontWeight={"600"}>N° tel: {phone}</Text>
						) : (
							<Text fontWeight={"600"}>Teléfono no encontrado</Text>
						)}
					</Grid>
				</HStack>
				<HStack>
					<Text fontWeight={"600"}>Entregado:</Text>
					{isLoading || isModifiyingDeliveredValue ? (
						<Spinner />
					) : (
						<Switch
							isChecked={isDelivered}
							size="lg"
							onChange={() => uploadBEOrder()}
						/>
					)}
				</HStack>
			</Flex>
		</Flex>
	);
};

export default AdminOrderCard;
