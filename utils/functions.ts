import { ProductsFilter } from "@/types/filters";
import { Product, ReservedData } from "@/types/product";

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

export function getAdminsIds() {
	const allIds = process.env.NEXT_PUBLIC_ADMINS_IDS || "0";
	return allIds?.split("/");
}

export function getReservedDataFromNameAndQtty(
	name: string,
	quantity: number,
	userId: string | undefined
): ReservedData {
	const splitedName = name
		.split("-")
		.map((string) => string.replace(/\s+/g, ""));

	const usSize = Number(splitedName[2].slice(0, -2));
	const color = splitedName[1];
	return { usSize, color, quantity, userId };
}

export function getAvailableQuantitiesBySizeAndColor(
	product: Product,
	color: string
) {
	const sizeMap: Record<number, number> = {};

	product.sizeOptions
		.filter((size) => size.color.toLowerCase() === color.toLowerCase())
		.forEach((size) => {
			sizeMap[size.usSize] = (sizeMap[size.usSize] || 0) + size.quantity;
		});

	product.reservedData
		?.filter((reserved) => reserved.color.toLowerCase() === color.toLowerCase())
		.forEach((reserved) => {
			if (sizeMap[reserved.usSize]) {
				sizeMap[reserved.usSize] -= reserved.quantity;
			}
		});

	return sizeMap;
}
