import { useGlobalContext } from "@/context/GlobalContext";
import {
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
	allSizes: number[] | undefined;
}

export const FilterSizeDisplayer = ({ allSizes }: Props) => {
	const { sizeTypes, filter, setFilter, currentSizeType, isDarkMode } =
		useGlobalContext();

	const storedRange = useRef(
		localStorage.getItem("mateosShoes-shoesSizeFilterRange")
	).current;

	const [sortedSizes, setSortedSizes] = useState<number[]>([]);
	const [range, setRange] = useState<[number, number]>([0, 9999]);
	const [debouncedRange, setDebouncedRange] = useState<[number, number]>([
		0, 9999,
	]);
	const [hasInteracted, setHasInteracted] = useState(false);

	const debounceDelay = 500;

	const applyFilterHandler = useCallback(
		(newRange: number[]) => {
			const sizeOptionMin = newRange[0];
			const sizeOptionMax = newRange[1];

			const filterToAdd = {
				sizeOptions: {
					usSize: { min: sizeOptionMin, max: sizeOptionMax },
				},
			};

			const newFilter = { ...filter, ...filterToAdd };

			setFilter(newFilter);
		},
		[filter, currentSizeType, sizeTypes, setFilter]
	);

	const handleRangeChange = useCallback(
		(newRange: [number, number]) => {
			setRange(newRange);

			const handler = setTimeout(() => {
				setDebouncedRange(newRange);
			}, debounceDelay);

			return () => clearTimeout(handler);
		},
		[debounceDelay]
	);

	useEffect(() => {
		if (hasInteracted) {
			applyFilterHandler(debouncedRange);
		}
	}, [debouncedRange, applyFilterHandler, hasInteracted]);

	useEffect(() => {
		if (allSizes && allSizes.length > 0) {
			const sorted = [...allSizes].sort((a, b) => a - b);
			setSortedSizes(sorted);
			setRange([sorted[0], sorted[sorted.length - 1]]);
		}
	}, [allSizes]);

	return (
		<>
			{allSizes && sortedSizes.length > 0 && (
				<RangeSlider
					onChange={(newRange) => {
						setHasInteracted(true);
						handleRangeChange(newRange as [number, number]);
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
					colorScheme={isDarkMode ? "white" : "orange"}
				>
					<RangeSliderTrack>
						<RangeSliderFilledTrack />
					</RangeSliderTrack>
					<RangeSliderThumb boxSize={12} index={0}>
						<Text fontSize={"smaller"}>{range[0]}</Text>
					</RangeSliderThumb>
					<RangeSliderThumb boxSize={12} index={1}>
						<Text fontSize={"smaller"}>{range[1]}</Text>
					</RangeSliderThumb>
				</RangeSlider>
			)}
		</>
	);
};
