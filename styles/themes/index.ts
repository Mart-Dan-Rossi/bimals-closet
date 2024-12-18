import { extendTheme } from "@chakra-ui/react";
import { customColors as colors } from "@/styles/themes/foundation/colors";
import { globalStyles as styles } from "@/styles/themes/global";

export const customTheme = extendTheme({
	colors,
	styles,
});
