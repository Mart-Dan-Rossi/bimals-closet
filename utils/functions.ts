import { ProductsFilter } from "@/types/filters";
import { ImageData, Product, ReservedData } from "@/types/product";
import { SiteMainSections } from "./helpers";
import {
	ClothSizesOptions,
	ColorOptions,
	SizeKey,
} from "./productCaracteristics";

export function capitalize(string: string) {
	const trimmed = string.trimStart();
	if (trimmed.length === 0) return "";
	return `${trimmed[0].toUpperCase()}${trimmed.slice(1)}`;
}

export function applyFilters(
	products: Product[] | undefined,
	filter?: ProductsFilter,
	section?: SiteMainSections
): Product[] {
	if (!products) return [];

	const { sizeOptions, tags, brand } = filter || {};
	const { usSize, color, usSizeSelection } = sizeOptions || {};

	const hasUsSizeFilter =
		usSize && (usSize?.min !== null || usSize?.max !== null);
	const hasColorFilter = !!color;
	const hasTagsFilter = tags && tags.length > 0;
	const hasBrandFilter = brand && brand !== "";

	return products.filter((product) => {
		const passSizeFilter = (() => {
			if (usSizeSelection && usSizeSelection.length > 0) {
				return product.sizeOptions.some(
					(option) =>
						typeof option.usSize === "string" &&
						usSizeSelection.includes(option.usSize)
				);
			}

			if (!hasUsSizeFilter) return true;

			return product.sizeOptions.some(({ usSize: size }) => {
				if (
					usSize?.min != null &&
					typeof size === "number" &&
					size < usSize.min
				) {
					return false;
				}
				if (
					usSize?.max != null &&
					typeof size === "number" &&
					size > usSize.max
				) {
					return false;
				}
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

export function getReservedDataFromNameAndQtty(
	name: string,
	quantity?: number | string,
	userId?: string
): ReservedData {
	const splitedName = name
		.split("-")
		.map((string) => string.replace(/\s+/g, ""));

	const sizeValue = splitedName[2].endsWith("US")
		? splitedName[2].slice(0, -2)
		: splitedName[2];

	const usSize = isNaN(Number(sizeValue))
		? (sizeValue as ClothSizesOptions)
		: Number(sizeValue);

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
	const sizeMap: Partial<Record<SizeKey, number>> = {};

	product.sizeOptions
		.filter((size) => size.color.toLowerCase() === color.toLowerCase())
		.forEach((size) => {
			const key = size.usSize as SizeKey;
			sizeMap[key] = (sizeMap[key] || 0) + (size.quantity || 0);
		});

	product.reservedData
		?.filter((reserved) => reserved.color.toLowerCase() === color.toLowerCase())
		.forEach((reserved) => {
			const key = reserved.usSize as SizeKey;
			if (sizeMap[key] !== undefined && sizeMap[key] && reserved.quantity) {
				sizeMap[key] = (sizeMap[key] ?? 0) - reserved.quantity;
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

export function getDefaultImage(
	images: ImageData | undefined
): string | undefined {
	if (images) {
		for (const [_, imageList] of Object.entries(images) as [
			keyof ImageData,
			string[],
		][]) {
			if (imageList.length > 0) {
				return imageList[0];
			}
			if (_) {
				/*Prevent warnings in compilation*/
			}
		}
	}
	return undefined;
}
