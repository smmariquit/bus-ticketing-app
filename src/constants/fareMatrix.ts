export const FARE_MATRIX = {
	"Naga-Labo": {
		"Naga": {
			"Labo": 240,
			"Talisay": 230,
			"Vinzons": 230,
			"Daet": 220,
			"Basud": 220,
			"Villazar": 150,
			"Calagbangan": 140,
			"Sipocot": 100,
			"Cbsua": 100,
			"Libmanan": 70,
			"Pamplona": 70,
			"Naga": 70
		},
		"Pamplona": {
			"Labo": 230,
			"Talisay": 220,
			"Vinzons": 220,
			"Daet": 195,
			"Basud": 185,
			"Villazar": 105,
			"Calagbangan": 95,
			"Sipocot": 70,
			"Cbsua": 70,
			"Libmanan": 70,
			"Pamplona": 70
		},
		"Libmanan": {
			"Labo": 220,
			"Talisay": 195,
			"Vinzons": 195,
			"Daet": 165,
			"Basud": 155,
			"Villazar": 75,
			"Calagbangan": 75,
			"Sipocot": 70,
			"Cbsua": 70,
			"Libmanan": 70
		},
		"Cbsua": {
			"Labo": 170,
			"Talisay": 140,
			"Vinzons": 140,
			"Daet": 130,
			"Basud": 130,
			"Villazar": 70,
			"Calagbangan": 70,
			"Sipocot": 70,
			"Cbsua": 70
		},
		"Sipocot": {
			"Labo": 180,
			"Talisay": 150,
			"Vinzons": 160,
			"Daet": 140,
			"Basud": 130,
			"Villazar": 70,
			"Calagbangan": 70,
			"Sipocot": 70
		},
		"Calagbangan": {
			"Labo": 150,
			"Talisay": 120,
			"Vinzons": 130,
			"Daet": 105,
			"Basud": 95,
			"Villazar": 70,
			"Calagbangan": 70
		},
		"Villazar": {
			"Labo": 140,
			"Talisay": 105,
			"Vinzons": 100,
			"Daet": 95,
			"Basud": 90,
			"Villazar": 70
		},
		"Basud": {
			"Labo": 70,
			"Talisay": 70,
			"Vinzons": 70,
			"Daet": 70,
			"Basud": 70
		},
		"Daet": {
			"Labo": 70,
			"Talisay": 70,
			"Vinzons": 70,
			"Daet": 70
		},
		"Talisay": {
			"Labo": 70,
			"Talisay": 70,
			"Vinzons": 70
		},
		"Vinzons": {
			"Labo": 70,
			"Vinzons": 70
		},
		"Labo": {
			"Labo": 70
		}
	},
	"Labo-Naga": {
		"Labo": {
			"Naga": 240,
			"Pamplona": 230,
			"Libmanan": 220,
			"Sipocot": 180,
			"Cbsua": 160,
			"Calagbangan": 150,
			"Villazar": 140,
			"Basud": 70,
			"Daet": 70,
			"Talisay": 70,
			"Vinzons": 70,
			"Labo": 70
		},
		"Vinzons": {
			"Naga": 230,
			"Pamplona": 220,
			"Libmanan": 195,
			"Sipocot": 160,
			"Cbsua": 140,
			"Calagbangan": 130,
			"Villazar": 100,
			"Basud": 70,
			"Daet": 70,
			"Talisay": 70,
			"Vinzons": 70
		},
		"Talisay": {
			"Naga": 230,
			"Pamplona": 220,
			"Libmanan": 195,
			"Sipocot": 150,
			"Cbsua": 140,
			"Calagbangan": 120,
			"Villazar": 105,
			"Basud": 70,
			"Daet": 70,
			"Talisay": 70
		},
		"Daet": {
			"Naga": 220,
			"Pamplona": 195,
			"Libmanan": 165,
			"Sipocot": 140,
			"Cbsua": 130,
			"Calagbangan": 105,
			"Villazar": 95,
			"Basud": 70,
			"Daet": 70
		},
		"Basud": {
			"Naga": 220,
			"Pamplona": 185,
			"Libmanan": 155,
			"Sipocot": 130,
			"Cbsua": 130,
			"Calagbangan": 95,
			"Villazar": 90,
			"Basud": 70
		},
		"Villazar": {
			"Naga": 150,
			"Pamplona": 105,
			"Libmanan": 75,
			"Sipocot": 70,
			"Cbsua": 70,
			"Calagbangan": 70,
			"Villazar": 70
		},
		"Calagbangan": {
			"Naga": 140,
			"Pamplona": 95,
			"Libmanan": 70,
			"Sipocot": 70,
			"Cbsua": 70,
			"Calagbangan": 70
		},
		"Sipocot": {
			"Naga": 100,
			"Pamplona": 70,
			"Libmanan": 70,
			"Sipocot": 70
		},
		"Cbsua": {
			"Naga": 100,
			"Pamplona": 70,
			"Libmanan": 70,
			"Cbsua": 70
		},
		"Libmanan": {
			"Naga": 70,
			"Pamplona": 70,
			"Libmanan": 70
		},
		"Pamplona": {
			"Naga": 70,
			"Pamplona": 70
		},
		"Naga": {
			"Naga": 70
		}
	},
	"Naga-Sorsogon": {
		"Naga": {
			"SM Sorsogon": 320
		}
	},
	"Sorsogon-Naga": {
		"SM Sorsogon": {
			"Naga": 320
		}
	}
};

export const getFare = (route: string, fromStop: string, toStop: string): number | null => {
	const matrix = FARE_MATRIX as any;
	return matrix[route]?.[fromStop]?.[toStop] || null;
};

export const calculateFareWithDiscount = (
	route: string,
	fromStop: string,
	toStop: string,
	passengerCategory: string,
	discountPercentage: number = 0.2
): number | null => {
	const baseFare = getFare(route, fromStop, toStop);
	if (baseFare === null) return null;
	const discountCategories = ['Student', 'Senior Citizen', 'PWD'];
	const hasDiscount = discountCategories.includes(passengerCategory);
	return hasDiscount ? baseFare * (1 - discountPercentage) : baseFare;
};
