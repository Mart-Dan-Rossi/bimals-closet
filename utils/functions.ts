import { ProductsFilter } from "@/types/filters";
import { Product, ReservedData } from "@/types/product";
import { SiteMainSections } from "./helpers";
import { ColorOptions } from "./productCaracteristics";

export function capitalize(string: string) {
	return `${string[0].toUpperCase()}${string.slice(1)}`;
}

export function applyFilters(
	products: Product[] | undefined,
	filter?: ProductsFilter,
	section?: SiteMainSections
): Product[] {
	if (!products) return [];

	const { sizeOptions, tags, brand } = filter || {};
	const { usSize, color } = sizeOptions || {};

	const hasUsSizeFilter =
		usSize && (usSize?.min !== null || usSize?.max !== null);
	const hasColorFilter = !!color;
	const hasTagsFilter = tags && tags.length > 0;
	const hasBrandFilter = brand && brand !== "";

	return products.filter((product) => {
		const passSizeFilter = (() => {
			if (!hasUsSizeFilter) return true;

			return product.sizeOptions.some(({ usSize: size }) => {
				if (usSize?.min != null && size < usSize.min) return false;
				if (usSize?.max != null && size > usSize.max) return false;
				return true;
			});
		})();

		const passColorFilter = (() => {
			if (!hasColorFilter) return true;

			return product.sizeOptions.some((option) => option.color === color);
		})();

		const passTagFilter = (() => {
			if (!hasTagsFilter) return true;

			return tags.every((tag) => product.tags?.includes(tag));
		})();

		const passBrandFilter = (() => {
			if (!hasBrandFilter) return true;

			return product.brand === brand;
		})();

		const allLowerCaseTags = product.tags?.map((tag) => tag.toLowerCase());

		const isInRightSection = section
			? product.productType.toLowerCase() === section.toLowerCase() ||
			  section === "todo" ||
			  (section === "sale" && allLowerCaseTags?.includes("sale"))
			: true;

		return (
			passSizeFilter &&
			passColorFilter &&
			passTagFilter &&
			isInRightSection &&
			passBrandFilter
		);
	});
}

export function getAdminsIds() {
	const allIds = process.env.NEXT_PUBLIC_ADMINS_IDS || "0";
	return allIds?.split("/");
}

export function getReservedDataFromNameAndQtty(
	name: string,
	quantity?: number | string,
	userId?: string
): ReservedData {
	const splitedName = name
		.split("-")
		.map((string) => string.replace(/\s+/g, ""));

	const usSize = Number(splitedName[2].slice(0, -2));
	const color = splitedName[1] as ColorOptions;

	const quantityValue =
		typeof quantity === "string"
			? Number(quantity)
			: typeof quantity === "number"
			? quantity
			: 0;

	return { usSize, color, quantity: quantityValue, userId };
}

export function getAvailableQuantitiesBySizeAndColor(
	product: Product,
	color: string
) {
	const sizeMap: Record<number, number> = {};

	product.sizeOptions
		.filter((size) => size.color.toLowerCase() === color.toLowerCase())
		.forEach((size) => {
			sizeMap[size.usSize] = (sizeMap[size.usSize] || 0) + (size.quantity || 0);
		});

	product.reservedData
		?.filter((reserved) => reserved.color.toLowerCase() === color.toLowerCase())
		.forEach((reserved) => {
			if (sizeMap[reserved.usSize] && reserved.quantity) {
				sizeMap[reserved.usSize] -= reserved.quantity;
			}
		});

	return sizeMap;
}

export function getTotalProductsReserved(userReservedProducts: Product[]) {
	return userReservedProducts.reduce((acc, product) => {
		const productTotal = product.sizeOptions.reduce(
			(sum, option) => sum + option.quantity,
			0
		);
		return acc + productTotal;
	}, 0);
}
