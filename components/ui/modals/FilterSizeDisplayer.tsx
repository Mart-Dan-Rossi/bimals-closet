import { useGlobalContext } from "@/context/GlobalContext";
import {
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
	allSizes: number[] | undefined;
}

export const FilterSizeDisplayer = ({ allSizes }: Props) => {
	const { filter, setFilter } = useGlobalContext();

	const [storedRange, setStoredRange] = useState<string | null>();

	useEffect(() => {
		setStoredRange(localStorage.getItem("mateosShoes-shoesSizeFilterRange"));
	}, []);

	const [sortedSizes, setSortedSizes] = useState<number[]>([]);
	const [range, setRange] = useState<[number, number]>([0, 9999]);
	const [currentValue, setCurrentValue] = useState<
		{ min: number; max: number } | undefined
	>();

	useEffect(() => {
		if (allSizes && allSizes.length > 0) {
			const sorted = [...allSizes].sort((a, b) => a - b);
			setSortedSizes(sorted);
			setRange([
				filter?.sizeOptions?.usSize?.min ?? sorted[0],
				filter?.sizeOptions?.usSize?.max ?? sorted[sorted.length - 1],
			]);
		}
	}, [allSizes]);

	return (
		<>
			{allSizes && sortedSizes.length > 0 && (
				<RangeSlider
					onChange={(newRange) => {
						setCurrentValue({ min: newRange[0], max: newRange[1] });
						setRange(newRange as [number, number]);

						setFilter((prev) => {
							return {
								tags: prev?.tags ?? [],
								sizeOptions: {
									usSize: { min: newRange[0] || 0, max: newRange[1] || 9999 },
									color: prev?.sizeOptions?.color,
								},
							};
						});

						localStorage.setItem(
							"mateosShoes-shoesSizeFilterRange",
							JSON.stringify(newRange)
						);
					}}
					aria-label={["min", "max"]}
					step={0.5}
					min={sortedSizes[0]}
					max={sortedSizes[sortedSizes.length - 1]}
					defaultValue={
						storedRange
							? [JSON.parse(storedRange)[0], JSON.parse(storedRange)[1]]
							: [sortedSizes[0], sortedSizes[sortedSizes.length - 1]]
					}
					colorScheme={"red"}
				>
					<RangeSliderTrack>
						<RangeSliderFilledTrack />
					</RangeSliderTrack>
					<RangeSliderThumb boxSize={12} index={0}>
						<Text fontSize={"smaller"}>{currentValue?.min ?? range[0]}</Text>
					</RangeSliderThumb>
					<RangeSliderThumb boxSize={12} index={1}>
						<Text fontSize={"smaller"}>{currentValue?.max ?? range[1]}</Text>
					</RangeSliderThumb>
				</RangeSlider>
			)}
		</>
	);
};
