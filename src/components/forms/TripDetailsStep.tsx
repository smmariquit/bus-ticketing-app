// src/components/forms/TripDetailsStep.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BUS_NUMBERS } from '../../constants/busNumbers';
import { CONDUCTORS } from '../../constants/conductors';
import { DRIVERS } from '../../constants/drivers';
import { ROUTES } from '../../constants/routeStops';
import * as Style from '../../constants/styleConstants';
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
    borderRadius: Style.BORDER_RADIUS_MEDIUM,
    padding: Style.BUTTON_PADDING_HORIZONTAL,
    marginBottom: Style.BUTTON_PADDING_HORIZONTAL,
    shadowColor: Style.COLOR_SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: Style.SHADOW_OPACITY,
    shadowRadius: Style.SHADOW_RADIUS,
    elevation: 5,
  },
  title: {
    fontSize: Style.FONT_SIZE_LARGE,
    fontWeight: 'bold',
    color: Style.COLOR_TEXT,
    marginBottom: Style.BUTTON_PADDING_HORIZONTAL,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: Style.COLOR_PRIMARY,
    paddingVertical: Style.BUTTON_PADDING_VERTICAL,
    borderRadius: Style.BORDER_RADIUS_SMALL,
    marginTop: Style.BUTTON_PADDING_HORIZONTAL,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Style.COLOR_DISABLED,
  },
  buttonText: {
    color: 'white',
    fontSize: Style.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: Style.COLOR_DISABLED_TEXT,
  },
});
