import { useGlobalContext } from "@/context/GlobalContext";
import { useCallback, useEffect, useState } from "react";
import { Tag, TagLabel, TagCloseButton, Wrap } from "@chakra-ui/react";
import { capitalize } from "@/utils/functions";

interface Props {
	allTags: string[] | undefined;
}

export const FilterTagsDisplayer = ({ allTags }: Props) => {
	const { filter, setFilter } = useGlobalContext();
	const [selectedTags, setSelectedTags] = useState<string[]>(
		filter?.tags ?? []
	);

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

	return (
		<Wrap spacing={2}>
			{allTags &&
				allTags.map((tag) => (
					<Tag
						key={tag}
						size={"lg"}
						cursor="pointer"
						variant={selectedTags.includes(tag) ? "solid" : "outline"}
						colorScheme={selectedTags.includes(tag) ? "green" : "gray"}
						onClick={() => toggleTag(tag)}
					>
						<TagLabel>{capitalize(tag)}</TagLabel>
						{selectedTags.includes(tag) && <TagCloseButton />}
					</Tag>
				))}
		</Wrap>
	);
};
