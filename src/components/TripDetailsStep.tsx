import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FormPicker } from './FormPicker';
import type { FormData } from './BusTicketingForm';
import {
  getBusNumberOptions,
  getDriverOptions,
  getConductorOptions,
  getRouteOptions,
} from '../constants/busTripConstants';

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
        onValueChange={(value) => updateFormData({ busNumber: value })}
        options={getBusNumberOptions()}
      />
      <FormPicker
        label="Driver"
        placeholder="Select driver"
        selectedValue={formData.driver}
        onValueChange={(value) => updateFormData({ driver: value })}
        options={getDriverOptions()}
      />
      <FormPicker
        label="Conductor"
        placeholder="Select conductor"
        selectedValue={formData.conductor}
        onValueChange={(value) => updateFormData({ conductor: value })}
        options={getConductorOptions()}
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
          });
        }}
        options={getRouteOptions()}
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
