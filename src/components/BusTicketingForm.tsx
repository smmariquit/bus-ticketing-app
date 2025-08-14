
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
	BUS_NUMBERS,
	DRIVERS,
	CONDUCTORS,
	PASSENGER_CATEGORIES,
	ROUTES,
	ROUTE_STOPS
} from '../constants/busTripConstants';
import { calculateFareWithDiscount } from '../constants/fareMatrix';

export interface FormData {
	busNumber: number | null;
	driver: string | null;
	conductor: string | null;
	route: string | null;
	passengerCategory: string | null;
	fromStop: string | null;
	toStop: string | null;
	fare: number | null;
}

const initialFormData: FormData = {
	busNumber: null,
	driver: null,
	conductor: null,
	route: null,
	passengerCategory: null,
	fromStop: null,
	toStop: null,
	fare: null,
};

const BusTicketingForm: React.FC<{ onSubmit?: (formData: FormData) => void }> = ({ onSubmit }) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [errorMsg, setErrorMsg] = useState<string>('');
	// Default to no-op if onSubmit is not provided
	const safeOnSubmit = typeof onSubmit === 'function' ? onSubmit : () => {
		console.warn('onSubmit prop not provided to BusTicketingForm.');
	};

	const handleChange = (field: keyof FormData, value: any) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	}

	// Helper to check if stops are valid and not the same
	const areStopsValid = (fromStop: string | null, toStop: string | null) => {
		return (
			typeof fromStop === 'string' &&
			typeof toStop === 'string' &&
			fromStop !== toStop
		);
	}

	const isStep1Valid = () => {
		return formData.busNumber && formData.driver && formData.conductor && formData.route;
	} 

	const isStep2Valid = () => {
		return (
			formData.passengerCategory &&
			areStopsValid(formData.fromStop, formData.toStop) &&
			formData.fare !== null
		);
	}

	const handleNext = () => {
		if (step === 1 && isStep1Valid()) {
			setStep(2);
		} else if (step === 2 && isStep2Valid()) {
			safeOnSubmit(formData);
		}
	}

	const handleBack = () => {
		if (step === 2) setStep(1);
	} 

	// Auto-calculate fare when route, fromStop, toStop, or passengerCategory changes
	useEffect(() => {
		if (
			typeof formData.route === 'string' &&
			areStopsValid(formData.fromStop, formData.toStop) &&
			typeof formData.passengerCategory === 'string'
		) {
			const stops = (ROUTE_STOPS as any)[formData.route];
			if (!Array.isArray(stops)) {
				console.warn('ROUTE_STOPS for selected route is not an array:', stops);
				setFormData(prev => ({ ...prev, fare: null }));
				return;
			}
			try {
				let fare = calculateFareWithDiscount(
					formData.route as string,
					formData.fromStop as string,
					formData.toStop as string,
					formData.passengerCategory as string
				);
				if (typeof fare !== 'number' || isNaN(fare)) fare = 0;
				setFormData(prev => ({ ...prev, fare }));
			} catch (error) {
				console.error('Error calculating fare:', error);
				setFormData(prev => ({ ...prev, fare: 0 }));
			}
		} else {
			setFormData(prev => ({ ...prev, fare: null }));
		}
	}, [formData.route, formData.fromStop, formData.toStop, formData.passengerCategory]);

		return (
			<View style={styles.formContainer}>
				{step === 1 ? (
					<View>
						<Text style={styles.stepTitle}>Trip Details</Text>
						<Text style={styles.label}>Bus Number</Text>
						<Picker
							style={styles.picker}
							selectedValue={formData.busNumber}
							onValueChange={v => handleChange('busNumber', v)}>
							<Picker.Item label="Select Bus Number" value={null} />
							{Array.isArray(BUS_NUMBERS) && BUS_NUMBERS.map(num => (
								<Picker.Item key={num} label={num.toString()} value={num} />
							))}
						</Picker>
						<Text style={styles.label}>Driver</Text>
						<Picker
							style={styles.picker}
							selectedValue={formData.driver}
							onValueChange={v => handleChange('driver', v)}>
							<Picker.Item label="Select Driver" value={null} />
							{Array.isArray(DRIVERS) && DRIVERS.map(driver => (
								<Picker.Item key={driver} label={driver} value={driver} />
							))}
						</Picker>
						<Text style={styles.label}>Conductor</Text>
						<Picker
							style={styles.picker}
							selectedValue={formData.conductor}
							onValueChange={v => handleChange('conductor', v)}>
							<Picker.Item label="Select Conductor" value={null} />
							{Array.isArray(CONDUCTORS) && CONDUCTORS.map(conductor => (
								<Picker.Item key={conductor} label={conductor} value={conductor} />
							))}
						</Picker>
						<Text style={styles.label}>Route</Text>
						<Picker
							style={styles.picker}
							selectedValue={formData.route}
							onValueChange={v => {
								handleChange('route', v);
								handleChange('fromStop', null);
								handleChange('toStop', null);
							}}>
							<Picker.Item label="Select Route" value={null} />
							{Array.isArray(ROUTES) && ROUTES.map(route => (
								<Picker.Item key={route} label={route} value={route} />
							))}
						</Picker>
						<Button title="Next" onPress={handleNext} disabled={!isStep1Valid()} />
					</View>
				) : (
					<View>
						<Text style={styles.stepTitle}>Fare Details</Text>
						<Text style={styles.label}>Passenger Category</Text>
						<Picker
							style={styles.picker}
							selectedValue={formData.passengerCategory}
							onValueChange={v => handleChange('passengerCategory', v)}>
							<Picker.Item label="Select Category" value={null} />
							{Array.isArray(PASSENGER_CATEGORIES) && PASSENGER_CATEGORIES.map(cat => (
								<Picker.Item key={cat} label={cat} value={cat} />
							))}
						</Picker>
						<Text style={styles.label}>From Stop</Text>
						<Picker
							style={styles.picker}
							selectedValue={formData.fromStop}
							onValueChange={v => {
								// Prevent selecting same stop for origin and destination
								if (v === formData.toStop) {
									setErrorMsg('Origin and destination cannot be the same stop.');
									return;
								}
								setErrorMsg('');
								handleChange('fromStop', v);
							}}>
							<Picker.Item label="Select Origin" value={null} />
							{typeof formData.route === 'string' && Array.isArray((ROUTE_STOPS as any)[formData.route]) && (ROUTE_STOPS as any)[formData.route].map((stop: string) => (
								<Picker.Item key={stop} label={stop} value={stop} />
							))}
						</Picker>
						<Text style={styles.label}>To Stop</Text>
						<Picker
							style={styles.picker}
							selectedValue={formData.toStop}
							onValueChange={v => {
								if (typeof formData.route !== 'string') {
									handleChange('toStop', null);
									return;
								}
								const stops = (ROUTE_STOPS as any)[formData.route];
								if (!Array.isArray(stops)) {
									console.warn('Cannot select destination, stops array is invalid:', stops);
									handleChange('toStop', null);
									return;
								}
								if (v === formData.fromStop) {
									setErrorMsg('Origin and destination cannot be the same stop.');
									return;
								}
								setErrorMsg('');
								handleChange('toStop', v);
							}}>
							<Picker.Item label="Select Destination" value={null} />
							{typeof formData.route === 'string' && Array.isArray((ROUTE_STOPS as any)[formData.route]) && (ROUTE_STOPS as any)[formData.route].map((stop: string) => (
								<Picker.Item key={stop} label={stop} value={stop} />
							))}
						</Picker>
						<Text style={styles.label}>Fare</Text>
						<Text style={styles.fare}>{formData.fare !== null ? `₱${formData.fare.toFixed(2)}` : 'N/A'}</Text>
						{errorMsg ? (
							<Text style={styles.errorMsg}>{errorMsg}</Text>
						) : null}
						{!areStopsValid(formData.fromStop, formData.toStop) && !errorMsg && (
							<Text style={styles.errorMsg}>
								Please select different stops for origin and destination.
							</Text>
						)}
						<View style={styles.buttonRow}>
							<Button title="Back" onPress={handleBack} />
							<Button title="Submit" onPress={handleNext} disabled={!isStep2Valid()} />
						</View>
					</View>
				)}
			</View>
		);
};

const styles = StyleSheet.create({
	errorMsg: {
		color: 'red',
		marginBottom: 8,
		textAlign: 'center',
	},
	formContainer: {
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 8,
		margin: 16,
		elevation: 2,
	},
	picker: {
		height: 50,
		width: '100%',
		marginBottom: 8,
	},
	stepTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 12,
		color: '#333',
	},
	label: {
		fontSize: 16,
		marginTop: 10,
		marginBottom: 4,
		color: '#333',
	},
	fare: {
		fontSize: 20,
		fontWeight: 'bold',
		marginVertical: 8,
		color: '#2b8aed',
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
	},
});

export default BusTicketingForm;
