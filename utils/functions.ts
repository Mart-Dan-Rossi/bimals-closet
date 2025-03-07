import { ProductsFilter } from "@/types/filters";
import { Product } from "@/types/product";

export function capitalize(string: string) {
	return `${string[0].toUpperCase()}${string.slice(1)}`;
}

export function applyFilters(
	products: Product[] | undefined,
	filter?: ProductsFilter
): Product[] {
	if (!products) return [];
	if (!filter) return products;
	return products.filter((product) => {
		const passSizeFilter = (() => {
			if (!filter.sizeOptions?.usSize) return true;

			const { min, max } = filter.sizeOptions.usSize;
			return product.sizeOptions.some(
				({ usSize }) => usSize >= min && usSize <= max
			);
		})();

		const passTagFilter = (() => {
			if (!filter.tags || filter.tags.length === 0) return true;

			return filter.tags.every((tag) => product.tags?.includes(tag));
		})();

		return passSizeFilter && passTagFilter;
	});
}
