import { useGlobalContext } from "@/context/GlobalContext";
import { capitalize } from "@/utils/functions";
import { Tag, TagCloseButton, TagLabel, Wrap } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";

interface Props {
	allTags: string[] | undefined;
}

export const FilterTagsDisplayer = ({ allTags }: Props) => {
	const { filter, setFilter, selectedTags, setSelectedTags } =
		useGlobalContext();

	const applyFilterHandler = useCallback(
		(newTags: string[]) => {
			const filterToAdd = {
				tags: newTags,
			};
			const newFilter = { ...filter, ...filterToAdd };
			setFilter(newFilter);
		},
		[filter, setFilter]
	);

	useEffect(() => {
		if (JSON.stringify(filter?.tags) !== JSON.stringify(selectedTags)) {
			applyFilterHandler(selectedTags);
		}
	}, [selectedTags]);

	const toggleTag = (tag: string) => {
		setSelectedTags((prevTags) =>
			prevTags.includes(tag)
				? prevTags.filter((t) => t !== tag)
				: [...prevTags, tag]
		);
	};

	function sortedTags(): string[] {
		if (allTags) {
			return allTags.sort((a, b) => {
				const inSelectedA = selectedTags.includes(a) ? 0 : 1;
				const inSelectedB = selectedTags.includes(b) ? 0 : 1;

				if (inSelectedA !== inSelectedB) {
					return inSelectedA - inSelectedB;
				}

				return a.localeCompare(b);
			});
		} else {
			return [];
		}
	}

	return (
		<Wrap spacing={2}>
			{allTags &&
				sortedTags().map((tag) => (
					<Tag
						key={tag}
						size={"lg"}
						cursor="pointer"
						variant={selectedTags.includes(tag) ? "solid" : "outline"}
						colorScheme={"red"}
						onClick={() => toggleTag(tag)}
						userSelect={"none"}
					>
						<TagLabel>{capitalize(tag)}</TagLabel>
						{selectedTags.includes(tag) && <TagCloseButton />}
					</Tag>
				))}
		</Wrap>
	);
};
