export type IFormLoginInput = {
	fullName: string;
	phoneNumber: string;
	email?: string;
	password?: string;
	newPassword?: string;
	passwordVerification?: string;
	userId?: string;
};

export type IFormRegisterInput = {
	email: string;
	password: string;
	passwordVerification: string;
	fullName: string;
	phoneNumber: string;
};

export type StoredUserData = {
	id: string;
	name: string;
	email?: string;
	phone?: string;
};

export type UserData = {
	fullName: string;
	email: string;
	phoneNumber: number;
};
