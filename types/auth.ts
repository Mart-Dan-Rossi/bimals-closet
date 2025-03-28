export type IFormLoginInput = {
	email?: string;
	password?: string;
	newPassword?: string;
	confirmPassword?: string;
	code?: string;
};

export type IFormRegisterInput = {
	email: string;
	password: string;
	fullName: string;
	phoneNumber: string;
};

export type StoredUserData = {
	email: string;
	id: string;
	name: string;
};

export type UserData = {
	fullName: string;
	email: string;
	phoneNumber: number;
};
