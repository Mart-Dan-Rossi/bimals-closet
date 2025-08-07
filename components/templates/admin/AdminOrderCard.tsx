import { useGlobalContext } from "@/context/GlobalContext";
import { useAdminUpdateBEOrder } from "@/hooks/orders/useBEOrders";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { OrderDataBEFormat } from "@/types/order";
import { getDefaultImage } from "@/utils/functions";
import {
	Box,
	Flex,
	HStack,
	Icon,
	Spinner,
	Switch,
	Text,
	useBoolean,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import AdminOrderCardUserData from "./AdminOrderCardUserData";
import { ConfirmDeleteOrderModal } from "./ConfirmDeleteOrderModal";
import { DeletedOrderData } from "./DeletedOrderData";
import ProductDataDisplay from "./ProductDataDisplay";

interface Props {
	orderData: OrderDataBEFormat;
	onOpenShowDeletedOrderModal: () => void;
	setDeletedOrderData: Dispatch<SetStateAction<OrderDataBEFormat | undefined>>;
	isShowDeletedOrderModalOpen: boolean;
	onCloseShowDeletedOrderModal: () => void;
	deletedOrderData: OrderDataBEFormat | undefined;
	hideAdminOrderCardUserData?: boolean;
}

const AdminOrderCard = ({
	orderData,
	onOpenShowDeletedOrderModal,
	setDeletedOrderData,
	isShowDeletedOrderModalOpen,
	onCloseShowDeletedOrderModal,
	deletedOrderData,
	hideAdminOrderCardUserData,
}: Props) => {
	const token = useHydratedStoreState("token");

	const { MPUserName, MPmail, products, user, isDelivered } = orderData;
	const { finalProductsData } = useGlobalContext();

	const {
		isOpen: isConfirmDeleteOrderModalOpen,
		onOpen: onOpenConfirmDeleteOrderModal,
		onClose: onCloseConfirmDeleteOrderModal,
	} = useDisclosure();

	const { mutateAsync: addMutateAsynceEditBEOrder, isLoading } =
		useAdminUpdateBEOrder();

	const toast = useToast();
	const [
		isModifiyingDeliveredValue,
		{ on: modifiyingDeliveredValue, off: modifiedDeliveredValue },
	] = useBoolean(false);

	async function uploadBEOrder() {
		if (token) {
			try {
				const order: OrderDataBEFormat = {
					...orderData,
					isDelivered: !isDelivered,
				};

				modifiyingDeliveredValue();
				const res = await addMutateAsynceEditBEOrder({ payload: order, token });
				modifiedDeliveredValue();

				if (res?.status === "success") {
					toast({ status: "success", title: "Órden cargada correctamente" });
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					toast({
						status: "error",
						title:
							error?.response?.data?.error.message ||
							"Ha ocurrido un error! Intenta nuevamente más tarde",
					});
					modifiedDeliveredValue();
				}
			}
		} else {
			toast({
				status: "error",
				title: "Debes estar logueado para realizar esta acción",
			});
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
					{!hideAdminOrderCardUserData && user && (
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
						<Icon
							onClick={onOpenConfirmDeleteOrderModal}
							as={RiDeleteBinLine}
							fontSize="2rem"
							cursor="pointer"
							color={"brand.red100"}
						/>
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
			<ConfirmDeleteOrderModal
				isOpen={isConfirmDeleteOrderModalOpen}
				onClose={onCloseConfirmDeleteOrderModal}
				orderData={orderData}
				onOpenShowDeletedOrderModal={onOpenShowDeletedOrderModal}
				setDeletedOrderData={setDeletedOrderData}
			/>

			<DeletedOrderData
				isOpen={isShowDeletedOrderModalOpen}
				onClose={onCloseShowDeletedOrderModal}
				orderData={deletedOrderData}
			/>
		</Flex>
	);
};

export default AdminOrderCard;
