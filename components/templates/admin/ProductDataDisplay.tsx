import { useGlobalContext } from "@/context/GlobalContext";
import { SizeOptions } from "@/types/product";
import { capitalize } from "@/utils/functions";
import { Brand, isValidBrand } from "@/utils/productCaracteristics";
import { Flex, Stack, Tag, Text } from "@chakra-ui/react";
import { DisplayColorSizesAndQuantityInputsContainer } from "../product/DisplayColorSizesAndQuantityInputsContainer";
import { standardBoxShadow } from "@/styles/themes/foundation/globalStyles";

interface Props {
	sizeOptions: SizeOptions;
	name?: string;
	price?: number;
	slug?: string;
	tags?: string[];
	brand?: Brand;
	allowTagFiltering?: boolean;
	fontColor?: string;
	bgColor?: string;
	minWidth?: string;
	padding?: string;
	borderRaious?: string;
	width?: string;
	showPartialPrice?: boolean;
}

const ProductDataDisplay = ({
	name,
	sizeOptions,
	price,
	brand,
	tags,
	slug,
	allowTagFiltering,
	fontColor,
	bgColor,
	minWidth: maxWidth,
	padding,
	borderRaious,
	width,
	showPartialPrice,
}: Props) => {
	const { onOpenFiltersDrawer } = useGlobalContext();

	function getPropperTagOnclickFunction() {
		return allowTagFiltering
			? onOpenFiltersDrawer
			: () => {
					console.log("tagOnClickFunction");
			  };
	}

	function getTotalPrice() {
		const totalPrice = sizeOptions.reduce((acc, sizeOption) => {
			return acc + sizeOption.quantity * Number(price);
		}, 0);

		return totalPrice.toFixed(2);
	}

	return (
		<Stack
			ml="2rem"
			flexDir="column"
			spacing="1.2rem"
			color={fontColor || undefined}
			bg={bgColor || undefined}
			minWidth={maxWidth || undefined}
			padding={padding || undefined}
			borderRadius={borderRaious || undefined}
			width={width || undefined}
			boxShadow={standardBoxShadow}
		>
			<Flex gap={"2rem"}>
				<Text fontSize="1.8rem" fontWeight="600">
					{name} {brand && isValidBrand(brand) && capitalize(brand)}
				</Text>
				{tags &&
					slug &&
					tags.map((tag) => (
						<Tag
							key={`${slug}-${tag}-tag`}
							cursor={allowTagFiltering ? "pointer" : "auto"}
							onClick={getPropperTagOnclickFunction()}
						>
							{capitalize(tag)}
						</Tag>
					))}
			</Flex>
			{sizeOptions && price && (
				<>
					{!showPartialPrice && (
						<Text fontSize="1.7rem" fontWeight="600">
							Precio total de este tipo de producto:
						</Text>
					)}
					<Text fontSize="1.7rem" fontWeight="600" ml={"2rem"}>
						AR$ {!showPartialPrice ? getTotalPrice() : price}
					</Text>
				</>
			)}

			<DisplayColorSizesAndQuantityInputsContainer
				sizeOptions={sizeOptions}
				brand={brand}
			/>
		</Stack>
	);
};

export default ProductDataDisplay;
