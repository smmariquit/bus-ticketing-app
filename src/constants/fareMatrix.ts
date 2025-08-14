export const FARE_MATRIX = {
	'Naga-Labo': {
		'Naga': {
			'Labo': 240,
			'Talisay': 230,
			'Vinzons': 230,
			'Daet': 220,
			'Basud': 220,
			'Villazar': 150,
			'Calagbangan': 140,
			'Sipocot': 100,
			'Cbsua': 100,
			'Libmanan': 70,
			'Pamplona': 70,
			'Naga': 70
		}
		// ...other stops (add as needed)
	},
	'Labo-Naga': {
		'Labo': {
			'Naga': 240,
			'Pamplona': 230,
			'Libmanan': 220,
			'Sipocot': 180,
			'Cbsua': 160,
			'Calagbangan': 150,
			'Villazar': 140,
			'Basud': 70,
			'Daet': 70,
			'Talisay': 70,
			'Vinzons': 70,
			'Labo': 70
		}
		// ...other stops (add as needed)
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
