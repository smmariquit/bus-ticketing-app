import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BUS_NUMBERS } from '../../constants/busNumbers';
import { CONDUCTORS } from '../../constants/conductors';
import { DRIVERS } from '../../constants/drivers';
import { ROUTES } from '../../constants/routes';
import type { FormData } from './BusTicketingForm';
import { FormPicker } from './FormPicker';

interface TripDetailsStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  isValid: boolean;
}

export const TripDetailsStep: React.FC<TripDetailsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  isValid,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Details</Text>
      <FormPicker
        label="Bus Number"
        placeholder="Select bus number"
        selectedValue={formData.busNumber}
  onValueChange={(value) => updateFormData({ busNumber: value, ticketNumber: formData.ticketNumber ?? null })}
        options={BUS_NUMBERS.map(num => ({ label: num.toString(), value: num }))}
      />
      <FormPicker
        label="Driver"
        placeholder="Select driver"
        selectedValue={formData.driver}
  onValueChange={(value) => updateFormData({ driver: value, ticketNumber: formData.ticketNumber ?? null })}
        options={DRIVERS.map(driver => ({ label: driver, value: driver }))}
      />
      <FormPicker
        label="Conductor"
        placeholder="Select conductor"
        selectedValue={formData.conductor}
  onValueChange={(value) => updateFormData({ conductor: value, ticketNumber: formData.ticketNumber ?? null })}
        options={CONDUCTORS.map(conductor => ({ label: conductor, value: conductor }))}
      />
      <FormPicker
        label="Route"
        placeholder="Select route"
        selectedValue={formData.route}
        onValueChange={(value) => {
          updateFormData({ 
            route: value,
            fromStop: null,
            toStop: null,
            fare: null,
            ticketNumber: formData.ticketNumber ?? null,
          });
        }}
        options={ROUTES.map(route => ({ label: route, value: route }))}
      />
      <TouchableOpacity
        style={[styles.nextButton, !isValid && styles.disabledButton]}
        onPress={onNext}
        disabled={!isValid}
      >
        <Text style={[styles.buttonText, !isValid && styles.disabledButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#2b8aed',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#a0c4f7',
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#ccc',
  },
});
