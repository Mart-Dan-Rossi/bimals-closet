import { StoredUserData } from "@/types/auth";
import { StoredOrdersDataFormat } from "@/types/order";
import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import ProductDataDisplay from "./ProductDataDisplay";

interface Props {
	user: StoredUserData;
	MPUserName: string;
	MPmail: string;
	products: StoredOrdersDataFormat[];
	orderId: string;
}

const AdminOrderCardUserData = ({
	user,
	MPUserName,
	MPmail,
	products,
	orderId,
}: Props) => {
	return (
		<HStack alignItems={"flex-start"} gap={"3rem"}>
			<Grid>
				{user && (
					<Text fontWeight={"600"}>
						{user.id ? `Id de cuenta: ${user.id}` : "Cuenta no encontrada"}
					</Text>
				)}
				{user && (
					<Text fontWeight={"600"}>
						{user.name || MPUserName
							? `Nombre: ${user.name || MPUserName} ${
									!user.name && MPUserName ? "(Nombre en cuenta de MP)" : ""
							  }`
							: "Nombre no encontrado"}
					</Text>
				)}
				{user && (
					<Text fontWeight={"600"}>
						{user.email || MPmail
							? `Email: ${user.email || MPmail} ${
									!user.email && MPmail ? "(Mail en cuenta de MP)" : ""
							  }`
							: "Mail no encontrado"}
					</Text>
				)}
				{user && (
					<Text fontWeight={"600"}>
						{user.phone ? `N° tel: ${user.phone}` : "Teléfono no encontrado"}
					</Text>
				)}
			</Grid>
			<Box>
				{products.map((item, index) => {
					return (
						<Box key={`${orderId}-product-${index}`}>
							<ProductDataDisplay sizeOptions={[]} />
						</Box>
					);
				})}
			</Box>
		</HStack>
	);
};

export default AdminOrderCardUserData;
