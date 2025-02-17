type Item = {
	id: string;
	quantity: number;
};

export type SelectPayMethodProps = {
	items: Item[];
	payer: {
		name: string;
		email: string;
	};
};
