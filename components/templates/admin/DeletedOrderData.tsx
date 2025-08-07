import { OrderDataBEFormat } from "@/types/order";
import { copyToClipboard } from "@/utils/functions";
import {
	Badge,
	Box,
	Button,
	Divider,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Stack,
	Tag,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	orderData?: OrderDataBEFormat;
}

export const DeletedOrderData = ({ isOpen, onClose, orderData }: Props) => {
	if (!orderData) return null;

	const {
		MPUserName,
		MPmail,
		createdAt,
		phoneMS,
		products,
		status,
		statusDetail,
		isDelivered,
		user,
	} = orderData;

	const toast = useToast();

	function handleCopyUserIdToClipboard(text: string | number | undefined) {
		if (text) {
			copyToClipboard(text.toString());
			toast({
				title: "Copiado al portapapeles",
				description: `${text.toString()}`,
				status: "success",
			});
		}
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxW="90vw" w="90%">
				<ModalHeader>Órden borrada</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box
						border="1px solid"
						borderColor="black"
						borderRadius="md"
						p={5}
						mb={6}
						shadow="sm"
					>
						<Text color={"red"} fontSize="larger" fontWeight="bolder">
							La siguiente información no es recuperable. Si necesitas copiar
							algo, esta es la última oportunidad
						</Text>
						<Stack spacing={2} mb={4}>
							<Text
								fontSize="larger"
								fontWeight="bold"
								cursor="pointer"
								onClick={() => handleCopyUserIdToClipboard(MPUserName)}
							>
								Pedido de {MPUserName}
							</Text>
							<Text
								fontSize="larger"
								fontWeight="bold"
								cursor="pointer"
								onClick={() => handleCopyUserIdToClipboard(user?.name)}
							>
								Usuario en sitio {user?.name}
							</Text>
							<Text
								fontSize="larger"
								color="gray"
								cursor="pointer"
								onClick={() => handleCopyUserIdToClipboard(MPmail)}
							>
								Email de MP: {MPmail}
							</Text>
							<Text
								fontSize="larger"
								color="gray"
								cursor="pointer"
								onClick={() => handleCopyUserIdToClipboard(user?.email)}
							>
								Email en sitio: {user?.email}
							</Text>
							<Text
								fontSize="larger"
								color="gray"
								cursor="pointer"
								onClick={() => handleCopyUserIdToClipboard(phoneMS)}
							>
								Tel de MP: {phoneMS}
							</Text>
							<Text
								fontSize="larger"
								color="gray"
								cursor="pointer"
								onClick={() => handleCopyUserIdToClipboard(user?.phone)}
							>
								Tel en sitio: {user?.phone}
							</Text>
							<Text fontSize="larger" color="gray">
								Creado: {new Date(createdAt).toLocaleString()} • Última
							</Text>
							<HStack>
								<Badge colorScheme={isDelivered ? "green" : "orange"}>
									Entregado: {isDelivered ? "Entregado" : "Pendiente"}
								</Badge>
								<Tag colorScheme="blue">{status}</Tag>
								<Tag variant="subtle" colorScheme="gray">
									{statusDetail}
								</Tag>
							</HStack>
						</Stack>

						<Divider mb={4} />

						<VStack spacing={4} align="stretch">
							{products.map((product, index) => (
								<Box
									key={`shown-deleted-product-${index}-${product.id}`}
									p={3}
									borderRadius="md"
									bg="gray"
								>
									<Text
										fontWeight="medium"
										cursor="pointer"
										onClick={() => handleCopyUserIdToClipboard(product.name)}
									>
										{product.name}
									</Text>
									<Text
										fontSize="larger"
										color="gray"
										cursor="pointer"
										onClick={() => handleCopyUserIdToClipboard(product.price)}
									>
										Precio: ${product.price}
									</Text>
									<SimpleGrid
										columns={{ base: 1, sm: 2, md: 3 }}
										spacing={2}
										mt={2}
									>
										{product.sizeOptions.map((opt, i) => (
											<Box
												key={`SO-SDP-${index}-${i}`}
												p={2}
												bg="white"
												borderRadius="md"
												border="1px solid"
												borderColor="gray"
											>
												<Text
													fontSize="larger"
													cursor="pointer"
													onClick={() =>
														handleCopyUserIdToClipboard(opt.usSize)
													}
												>
													Talle:{" "}
													{typeof opt.usSize === "string"
														? opt.usSize
														: `US ${opt.usSize}`}
												</Text>
												<Text
													fontSize="larger"
													cursor="pointer"
													onClick={() => handleCopyUserIdToClipboard(opt.color)}
												>
													Color: {opt.color}
												</Text>
												<Text
													fontSize="larger"
													cursor="pointer"
													onClick={() =>
														handleCopyUserIdToClipboard(opt.quantity)
													}
												>
													Cantidad: {opt.quantity}
												</Text>
											</Box>
										))}
									</SimpleGrid>
								</Box>
							))}
						</VStack>
					</Box>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} cursor="pointer" onClick={onClose}>
						Cerrar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
