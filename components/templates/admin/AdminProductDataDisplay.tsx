import { useGlobalContext } from "@/context/GlobalContext";
import { SizeOptions } from "@/types/product";
import { capitalize } from "@/utils/functions";
import { Brand } from "@/utils/productCaracteristics";
import { Flex, Stack, Tag, Text } from "@chakra-ui/react";
import { DisplayColorSizesAndQuantityInputsContainer } from "../product/DisplayColorSizesAndQuantityInputsContainer";

interface Props {
	name: string;
	sizeOptions: SizeOptions;
	price?: number;
	slug?: string;
	tags?: string[];
	brand?: Brand;
	allowTagFiltering?: boolean;
}

const AdminProductDataDisplay = ({
	name,
	sizeOptions,
	price,
	brand,
	tags,
	slug,
	allowTagFiltering,
}: Props) => {
	const { onOpenFiltersDrawer } = useGlobalContext();

	const validSizeOptions = sizeOptions.filter((sizeOption) => sizeOption);

	function getPropperTagOnclickFunction() {
		return allowTagFiltering
			? onOpenFiltersDrawer
			: () => {
					console.log("tagOnClickFunction");
			  };
	}
	return (
		<Stack ml="2rem" flexDir="column" spacing="1.2rem">
			<Flex gap={"2rem"}>
				<Text fontSize="1.8rem" fontWeight="600">
					{name} {brand && capitalize(brand)}
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
			<Flex align="center">
				<Text fontSize="1.7rem" fontWeight="600">
					AR$ {Number(price)?.toFixed(2)}
				</Text>
			</Flex>

			<DisplayColorSizesAndQuantityInputsContainer
				sizeOptions={validSizeOptions}
				brand={brand}
			/>
		</Stack>
	);
};

export default AdminProductDataDisplay;
