import { SizeDisplayer } from "@/components/ui/modals/SizeDisplayer";
import { Product } from "@/types/product";
import { getProperSizeEquivalencies } from "@/utils/sizesEquivalencies";
import { Flex, Tag, Text, Tooltip, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useMemo } from "react";

interface Props {
	product: Product;
	select?: Dispatch<SetStateAction<string>>;
	selectedSize?: string;
}

export const SizeOptions = ({ product, select, selectedSize }: Props) => {
	const finalProductSizes = useMemo(
		() => product?.sizeOptions.map((sizeData) => sizeData.usSize) || [],
		[product?.sizeOptions]
	);

	return (
		<>
			{select && typeof selectedSize === "string" ? (
				<Flex gap={4} mt="1rem" maxW={"100%"}>
					{finalProductSizes?.map((size, index) => (
						<Tooltip
							key={`product-size-options-tooltip-tag-${index}`}
							fontSize={"small"}
							hasArrow
							placement="top-start"
							label={getProperSizeEquivalencies(
								product.brand,
								product.sizeOptions[index]
							)}
						>
							<Tag
								onClick={() => select(size.toString())}
								cursor="pointer"
								size="lg"
								key={size}
								p={[".8rem", ".8rem 1.5rem"]}
								fontSize={["1.5rem", "1.5rem", "1.2rem", "1.5rem"]}
								fontWeight="500"
								bg="transparent"
								border={
									selectedSize === size.toString() ? "3px solid" : "1px solid"
								}
								borderColor={
									selectedSize === size.toString()
										? "brand.secondaryColor1"
										: "brand.white500"
								}
								borderRadius=".5rem"
								_hover={{
									borderColor: "brand.secondaryColor1",
								}}
							>
								{size}
							</Tag>
						</Tooltip>
					))}
				</Flex>
			) : (
				<VStack align={"start"}>
					<Text margin={"0"} fontWeight={"bold"}>
						Talles (US):
					</Text>
					<SizeDisplayer
						keyHelper={product._id || "undefined"}
						allSizes={finalProductSizes}
						product={product}
					/>
				</VStack>
			)}
		</>
	);
};
