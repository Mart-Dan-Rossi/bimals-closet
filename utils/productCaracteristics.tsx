export type Brand = "puma" | "nike" | "adidas" | "underarmour";

export const validBrands = ["puma", "nike", "adidas", "underarmour"] as Brand[];

export type ColorOptions =
	| "negro"
	| "blanco"
	| "gris"
	| "azul"
	| "rojo"
	| "amarillo"
	| "verde"
	| "violeta"
	| "naranja"
	| "rosa"
	| "celeste";

//===========================THIS 2 CONSTS MUST BE EDITED TOGHETER===========================================
const colorOptionArray = [
	"negro",
	"blanco",
	"gris",
	"azul",
	"rojo",
	"amarillo",
	"verde",
	"violeta",
	"naranja",
	"rosa",
	"celeste",
];

const colorOptionActualColorArray = [
	"#000000",
	"#fafafa",
	"#c7c7c7",
	"#0066ff",
	"#ff0000",
	"#e6e600",
	"#00cc00",
	"#c61aff",
	"#ff9900",
	"#ff80ff",
	"#99ccff",
];
//===========================THIS 2 CONSTS MUST BE EDITED TOGHETER===========================================

export const colorOptionDataArray = colorOptionArray.map((CO, index) => {
	return { name: CO, hash: colorOptionActualColorArray[index] };
});

export type ProductType = "indumentaria" | "calzado";

export type SizeEquivalency = { arg: number; eu: number; cm: number };

export type SizeEquivalencies = Record<string, SizeEquivalency>;

export const sizeEquivalencies: Record<Brand, SizeEquivalencies> = {
	puma: {
		"8": { arg: 39, eu: 40.5, cm: 26 },
		"8.5": { arg: 39.5, eu: 41, cm: 26.5 },
		"9": { arg: 40, eu: 42, cm: 27 },
		"9.5": { arg: 41, eu: 42.5, cm: 27.5 },
		"10": { arg: 41.5, eu: 43, cm: 28 },
		"10.5": { arg: 42, eu: 44, cm: 28.5 },
		"11": { arg: 43, eu: 44.5, cm: 29 },
		"11.5": { arg: 43.5, eu: 45, cm: 29.5 },
		"12": { arg: 44, eu: 46, cm: 30 },
		"13": { arg: 45.5, eu: 46, cm: 31 },
	},
	nike: {
		"7": { arg: 39, eu: 40, cm: 25.5 },
		"7.5": { arg: 39.5, eu: 40.5, cm: 25.5 },
		"8": { arg: 40, eu: 41, cm: 26 },
		"8.5": { arg: 40.5, eu: 42, cm: 26.5 },
		"9": { arg: 41, eu: 42.5, cm: 27 },
		"9.5": { arg: 42, eu: 43, cm: 27.5 },
		"10": { arg: 42.5, eu: 44, cm: 28 },
		"10.5": { arg: 43, eu: 44.5, cm: 28.5 },
		"11": { arg: 43.5, eu: 45, cm: 29 },
		"11.5": { arg: 44, eu: 45.5, cm: 29.5 },
		"12": { arg: 45, eu: 46, cm: 30 },
	},
	adidas: {
		"7": { arg: 38.5, eu: 40, cm: 25 },
		"7.5": { arg: 39, eu: 40.5, cm: 25.5 },
		"8": { arg: 39.5, eu: 41.5, cm: 26 },
		"8.5": { arg: 40, eu: 42, cm: 26.5 },
		"9": { arg: 41, eu: 42.5, cm: 27 },
		"9.5": { arg: 41.5, eu: 43.5, cm: 27.5 },
		"10": { arg: 42, eu: 44, cm: 28 },
		"10.5": { arg: 43, eu: 44.5, cm: 28.5 },
		"11": { arg: 43.5, eu: 45.5, cm: 29 },
		"11.5": { arg: 44, eu: 46, cm: 29.5 },
		"12": { arg: 45, eu: 46.5, cm: 30 },
		"12.5": { arg: 45.5, eu: 47.5, cm: 30.5 },
		"13": { arg: 46, eu: 48, cm: 31 },
	},
	underarmour: {
		"7": { arg: 39, eu: 40, cm: 25 },
		"7.5": { arg: 39.5, eu: 40.5, cm: 25.5 },
		"8": { arg: 40, eu: 41, cm: 26 },
		"8.5": { arg: 41, eu: 42, cm: 26.5 },
		"9": { arg: 41.5, eu: 42.5, cm: 27 },
		"9.5": { arg: 42, eu: 43, cm: 27.5 },
		"10": { arg: 43, eu: 44, cm: 28 },
		"10.5": { arg: 43.5, eu: 44.5, cm: 28.5 },
		"11": { arg: 44, eu: 45, cm: 28.7 },
		"11.5": { arg: 44.5, eu: 45.5, cm: 29.5 },
		"12": { arg: 45, eu: 46, cm: 30 },
		"12.5": { arg: 46, eu: 47, cm: 30.3 },
		"13": { arg: 46.5, eu: 47.5, cm: 30.8 },
		"14": { arg: 47.5, eu: 48.5, cm: 31.5 },
		"15": { arg: 48.5, eu: 49.5, cm: 32.7 },
	},
};

export function getProperSizeEquivalencies(
	brand: Brand | "other",
	currentSize: string | number,
	sizeOption:
		| {
				usSize: number;
				color: string;
				quantity: number;
				arg?: number;
				cm?: number;
				eu?: number;
		  }
		| undefined
) {
	const sizeKey = currentSize.toString();

	if (brand !== "other" && brand in sizeEquivalencies) {
		const equivalencies = sizeEquivalencies[brand][sizeKey];
		if (equivalencies) {
			return `ARG ${equivalencies.arg} | EU ${equivalencies.eu} | CM ${equivalencies.cm}`;
		}
	}

	if (sizeOption) {
		return `ARG ${sizeOption.arg ?? "N/A"} | EU ${
			sizeOption.eu ?? "N/A"
		} | CM ${sizeOption.cm ?? "N/A"}`;
	}

	return "Consulta con nuestro stuff las equivalencias";
}
