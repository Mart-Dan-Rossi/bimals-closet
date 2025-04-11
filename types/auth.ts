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
	email: string;
	id: string;
	name: string;
};

export type UserData = {
	fullName: string;
	email: string;
	phoneNumber: number;
};
