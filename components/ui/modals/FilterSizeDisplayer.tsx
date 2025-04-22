import { useGlobalContext } from "@/context/GlobalContext";
import { ClothSizesOptions } from "@/utils/productCaracteristics";
import {
	Button,
	Flex,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
	allSizes: (number | ClothSizesOptions)[] | undefined;
}

export const FilterSizeDisplayer = ({ allSizes }: Props) => {
	const { filter, setFilter } = useGlobalContext();
	const [sortedSizes, setSortedSizes] = useState<
		(number | ClothSizesOptions)[]
	>([]);

	const sizeOrder: ClothSizesOptions[] = [
		"XXS",
		"XS",
		"S",
		"M",
		"L",
		"XL",
		"XXL",
	];
	const responsiveSize = useBreakpointValue({ base: "sm", md: "md" });

	useEffect(() => {
		if (!allSizes || allSizes.length === 0) return;

		const isStringSize = (val: unknown): val is ClothSizesOptions =>
			typeof val === "string" && sizeOrder.includes(val as ClothSizesOptions);
		const isNumberSize = (val: unknown): val is number =>
			typeof val === "number";

		const stringSizes = allSizes
			.filter(isStringSize)
			.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
		const numericSizes = allSizes.filter(isNumberSize).sort((a, b) => a - b);

		setSortedSizes([...stringSizes, ...numericSizes]);
	}, [allSizes]);

	const isSizeSelected = (size: ClothSizesOptions) =>
		filter?.sizeOptions?.usSizeSelection?.includes(size) ?? false;

	const toggleSizeSelection = (size: ClothSizesOptions) => {
		const prevSelected = filter?.sizeOptions?.usSizeSelection ?? [];

		const updatedSelection = prevSelected.includes(size)
			? prevSelected.filter((s) => s !== size)
			: [...prevSelected, size];

		setFilter((prev) => ({
			...(prev ?? {}),
			sizeOptions: {
				...prev?.sizeOptions,
				usSizeSelection: updatedSelection,
			},
		}));
	};

	if (typeof sortedSizes[0] === "string") {
		return (
			<Flex gap={2} flexWrap="wrap">
				{sizeOrder.map((size) => (
					<Button
						key={size}
						colorScheme={isSizeSelected(size) ? "red" : "gray"}
						onClick={() => toggleSizeSelection(size)}
						size={responsiveSize}
					>
						{size}
					</Button>
				))}
			</Flex>
		);
	}

	return (
		<>
			{sortedSizes &&
				sortedSizes.length > 0 &&
				!sortedSizes.some((size) => typeof size !== "number") && (
					<RangeSlider
						onChange={(newRange) => {
							setFilter((prev) => ({
								...(prev ?? {}),
								sizeOptions: {
									...prev?.sizeOptions,
									usSize: {
										min: newRange[0],
										max: newRange[1],
									},
								},
							}));

							localStorage.setItem(
								"mateosShoes-shoesSizeFilterRange",
								JSON.stringify(newRange)
							);
						}}
						aria-label={["min", "max"]}
						step={0.5}
						min={sortedSizes[0] as number}
						max={sortedSizes[sortedSizes.length - 1] as number}
						defaultValue={[
							filter?.sizeOptions?.usSize?.min ?? (sortedSizes[0] as number),
							filter?.sizeOptions?.usSize?.max ??
								(sortedSizes[sortedSizes.length - 1] as number),
						]}
						colorScheme="red"
					>
						<RangeSliderTrack>
							<RangeSliderFilledTrack />
						</RangeSliderTrack>
						<RangeSliderThumb boxSize={12} index={0}>
							<Text fontSize="smaller">
								{filter?.sizeOptions?.usSize?.min ?? sortedSizes[0]}
							</Text>
						</RangeSliderThumb>
						<RangeSliderThumb boxSize={12} index={1}>
							<Text fontSize="smaller">
								{filter?.sizeOptions?.usSize?.max ??
									sortedSizes[sortedSizes.length - 1]}
							</Text>
						</RangeSliderThumb>
					</RangeSlider>
				)}
		</>
	);
};
