import { useUpdateBEOrder } from "@/hooks/orders/useBEOrders";
import { OrderDataBEFormat } from "@/types/order";
import { getAdminsIds, getDefaultImage } from "@/utils/functions";
import {
	Box,
	Flex,
	HStack,
	Spinner,
	Switch,
	Text,
	useBoolean,
	useToast,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import AdminOrderCardUserData from "./AdminOrderCardUserData";
import ProductDataDisplay from "./ProductDataDisplay";
import Image from "next/image";
import { useGlobalContext } from "@/context/GlobalContext";

interface Props {
	orderData: OrderDataBEFormat;
	hideAdminOrderCardUserData?: boolean;
}

const AdminOrderCard = ({ orderData, hideAdminOrderCardUserData }: Props) => {
	const { MPUserName, MPmail, products, user, isDelivered } = orderData;
	const { finalProductsData } = useGlobalContext();

	const { mutateAsync: addMutateAsynceEditBEOrder, isLoading } =
		useUpdateBEOrder();

	const toast = useToast();
	const [
		isModifiyingDeliveredValue,
		{ on: modifiyingDeliveredValue, off: modifiedDeliveredValue },
	] = useBoolean(false);

	async function uploadBEOrder() {
		try {
			const order: OrderDataBEFormat = {
				...orderData,
				isDelivered: !isDelivered,
			};

			modifiyingDeliveredValue();
			const res = await addMutateAsynceEditBEOrder(order);
			modifiedDeliveredValue();

			if (res?.status === "success" && getAdminsIds().includes(user.id)) {
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

	function getTotalPrice() {
		const totalPrice = orderData.products.reduce((accTotal, product) => {
			return (
				accTotal +
				product.sizeOptions.reduce((productTotal, sizeOption) => {
					return productTotal + sizeOption.quantity * Number(product.price);
				}, 0)
			);
		}, 0);

		return totalPrice.toFixed(2);
	}

	return (
		<Flex direction="column" bg={"brand.cartCardBG"} borderRadius={"20px"}>
			<Flex
				bg={"brand.secondaryColor5"}
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
					wrap={"wrap-reverse"}
					gap="1rem"
				>
					{!hideAdminOrderCardUserData && (
						<AdminOrderCardUserData
							user={user}
							MPUserName={MPUserName}
							MPmail={MPmail}
							products={products}
							orderId={orderData._id}
						/>
					)}
					<Flex alignSelf={"self-start"} gap={"5rem"} alignItems={"flex-start"}>
						<VStack>
							<Text fontWeight={"600"} alignSelf={"flex-start"}>
								Total pagado:
							</Text>
							<Text fontWeight={"600"} alignSelf={"flex-end"}>
								AR$ {getTotalPrice()}
							</Text>
						</VStack>

						<HStack>
							<Text fontWeight={"600"}>Entregado:</Text>
							{isLoading || isModifiyingDeliveredValue ? (
								<Spinner />
							) : (
								<Switch
									isChecked={isDelivered}
									disabled={hideAdminOrderCardUserData}
									size="lg"
									onChange={() => {
										if (!hideAdminOrderCardUserData) {
											uploadBEOrder();
										}
									}}
								/>
							)}
						</HStack>
					</Flex>
				</Flex>
			</Flex>
			<Box>
				<Flex
					flexDirection={"column"}
					gap={"2rem"}
					borderRadius={"0 0 20px 20px"}
					mb={"2rem"}
				>
					{finalProductsData &&
						orderData.products.map((item) => {
							const productData = finalProductsData.find((product) => {
								return product.name === item.name;
							});

							const productImageURL = getDefaultImage(productData?.images);

							return (
								<Flex
									key={`admin-order-card-key-${item._id || "a"}-${
										item.id || "b"
									}`}
									justifyContent="space-evenly"
									bg={"brand.white400"}
									borderRadius={"20px"}
									margin={"2rem"}
									padding={"1rem"}
								>
									<Image
										src={`/assets/images/${productImageURL}`}
										width={300}
										height={200}
										objectFit="cover"
										alt="Imágen del producto"
									/>
									<ProductDataDisplay
										name={item.name}
										sizeOptions={item.sizeOptions}
										price={Number(item.price)}
										allowTagFiltering={false}
										fontColor={"brand.white100"}
										bgColor={"brand.cartFooterBG"}
										width={"50%"}
										minWidth={"300px"}
										padding={"2rem"}
										borderRaious={"20px"}
									/>
								</Flex>
							);
						})}
				</Flex>
			</Box>
		</Flex>
	);
};

export default AdminOrderCard;
