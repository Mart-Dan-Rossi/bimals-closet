import { SizeOption, SizeOptions } from "@/types/product";
import { Brand, sizeEquivalencies } from "@/utils/sizesEquivalencies";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
	brand: Brand | "other";
	isOpen: boolean;
	onClose: () => void;
	sizeOptions?: SizeOptions;
}

const SizeTableComparation = ({
	brand,
	isOpen,
	onClose,
	sizeOptions,
}: Props) => {
	const brandSizeEquivalencies = useMemo(
		() =>
			brand === "other"
				? sizeOptions
					? sizeOptions.reduce(
							(acc, option) => {
								const { usSize, ...rest } = option;
								acc[usSize.toString()] = rest;
								return acc;
							},
							{} as Record<
								string,
								Omit<SizeOption, "usSize" | "color" | "quantity">
							>
						)
					: {}
				: sizeEquivalencies[brand],
		[brand]
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				borderRadius={"1rem"}
				border={"3px double"}
				borderColor={"black"}
				bg={"brand.color1"}
				color={"brand.white100"}
			>
				<ModalHeader>Talles {brand.toUpperCase()}:</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<TableContainer>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th color={"brand.white100"} isNumeric fontSize={"medium"}>
										US
									</Th>
									<Th color={"brand.white100"} isNumeric fontSize={"medium"}>
										Arg
									</Th>
									<Th color={"brand.white100"} isNumeric fontSize={"medium"}>
										EU
									</Th>
									<Th color={"brand.white100"} isNumeric fontSize={"medium"}>
										Cm
									</Th>
								</Tr>
							</Thead>
							<Tbody>
								{Object.keys(brandSizeEquivalencies).map((key, index) => {
									return (
										<Tr key={`size-table-comparation-${key}-${index}`}>
											<Td isNumeric>{Number(key)}</Td>
											<Td isNumeric>{brandSizeEquivalencies[key].arg}</Td>
											<Td isNumeric>{brandSizeEquivalencies[key].eu}</Td>
											<Td isNumeric>{brandSizeEquivalencies[key].cm}</Td>
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</TableContainer>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default SizeTableComparation;
