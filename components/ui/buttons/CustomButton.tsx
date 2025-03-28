import { useGlobalContext } from "@/context/GlobalContext";
import { CustomButtonProps } from "@/types/button";
import { Box, Button, Icon } from "@chakra-ui/react";

export const CustomButton = ({
	w,
	mt,
	py,
	px,
	color,
	bg,
	bgHover,
	colorHover,
	boxShadow,
	border,
	borderColor,
	fontSize,
	text,
	btnIcon,
	isLoading,
	isDisabled,
	isBtnIcon,
	isValidData,
	onClickFunction,
}: CustomButtonProps) => {
	const { isDarkMode } = useGlobalContext();

	return (
		<Box>
			<Button
				w={w || "100%"}
				mt={mt || "2rem"}
				py={py || "2rem"}
				px={px}
				color={color || "#fff"}
				bg={bg || isDarkMode ? "darkBrand.secondaryColor3" : "brand.color1"}
				borderRadius="10px"
				boxShadow={boxShadow || "0px 4px 20px brand.color3"}
				border={border}
				borderColor={borderColor}
				type={isValidData ? "submit" : "button"}
				onClick={
					isValidData
						? () => {
								console.log("Upload data");
						  }
						: onClickFunction
				}
				cursor="pointer"
				fontSize={fontSize || "1.42rem"}
				isLoading={isLoading}
				isDisabled={isDisabled}
				_hover={{
					boxShadow: "none",
					color:
						colorHover || isDarkMode ? "darkBrand.white100" : "brand.color2",
					bg: bgHover || isDarkMode ? "darkBrand.color3" : "brand.color3",
				}}
				_focus={{
					boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75) inset",
					borderColor: "none",
				}}
			>
				{isBtnIcon && (
					<Icon
						cursor="pointer"
						color={isDarkMode ? "darkBrand.white100" : "brand.white100"}
						fontSize="2.5rem"
						mr={["1rem", "3rem", "1rem", "3rem"]}
						as={btnIcon}
					/>
				)}{" "}
				{text}
			</Button>
		</Box>
	);
};
