import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type CustomInputProps = {
	id: string;
	defaultValue?: string | number;
	placeholder?: string;
	type: string;
	passwordIcon?: ReactNode;
	isDisabled?: boolean;
	errorMessage?: string | undefined;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	formHook?: UseFormRegisterReturn;
	repeatInput?: boolean;
	maxWidth?: string;
	display?: string;
};
