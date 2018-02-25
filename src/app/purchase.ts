export class Purchase {
	category:	string;
	id:			number;
	item:		string;
	position:	number;
	quantity:	string;
};

export class PurchaseList {
	category:	string;
	content:	Purchase[];	
};