import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DISCOUNT_PERCENTAGE } from '../../constants/discountConstants';
import { calculateFareWithDiscount } from '../../constants/fareMatrix';
import { PASSENGER_CATEGORIES } from '../../constants/passengerCategories';
import { ROUTE_STOPS } from '../../constants/routeStops';
import * as Style from '../../constants/styleConstants';
import type { FormData } from './BusTicketingForm';
import { FormPicker } from './FormPicker';

interface FareDetailsStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export const FareDetailsStep: React.FC<FareDetailsStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isValid,
}) => {
  const availableStops = formData.route ? ROUTE_STOPS[formData.route as keyof typeof ROUTE_STOPS] || [] : [];
  const fromStopOptions = availableStops.map((stop: string) => ({ label: stop, value: stop }));
  const fromStopIndex = formData.fromStop ? availableStops.indexOf(formData.fromStop) : -1;
  const availableToStops = fromStopIndex >= 0 ? availableStops.slice(fromStopIndex) : [];
  const toStopOptions = availableToStops.map((stop: string) => ({ label: stop, value: stop }));
  
    // Debug logs for picker options
    console.log('FareDetailsStep Debug:', {
      route: formData.route,
      fromStopOptions,
      toStopOptions,
      passengerCategoryOptions: PASSENGER_CATEGORIES,
      selectedPassengerCategory: formData.passengerCategory,
      selectedFromStop: formData.fromStop,
      selectedToStop: formData.toStop,
    });

  useEffect(() => {
    if (formData.route && formData.fromStop && formData.toStop && formData.passengerCategory) {
      const calculatedFare = calculateFareWithDiscount(
        formData.route,
        formData.fromStop,
        formData.toStop,
        formData.passengerCategory,
        DISCOUNT_PERCENTAGE
      );
      if (calculatedFare !== null && calculatedFare !== formData.fare) {
        updateFormData({ fare: calculatedFare });
      }
    } else if (formData.fare !== null) {
      updateFormData({ fare: null });
    }
  }, [formData.route, formData.fromStop, formData.toStop, formData.passengerCategory, formData.fare, updateFormData]);

  const handleFromStopChange = (value: string) => {
    updateFormData({ 
      fromStop: value,
      toStop: null,
      fare: null,
      ticketNumber: formData.ticketNumber ?? null,
    });
  };

  const handleToStopChange = (value: string) => {
    updateFormData({ toStop: value, ticketNumber: formData.ticketNumber ?? null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fare Details</Text>
      <FormPicker
        label="Passenger Category"
        placeholder="Select passenger category"
        selectedValue={formData.passengerCategory}
        onValueChange={(value) => updateFormData({ passengerCategory: value })}
        options={PASSENGER_CATEGORIES.map(cat => ({ label: cat, value: cat }))}
      />
      <FormPicker
        label="Origin"
        placeholder="Select origin stop"
        selectedValue={formData.fromStop}
        onValueChange={handleFromStopChange}
        options={fromStopOptions}
      />
      <FormPicker
        label="Destination"
        placeholder="Select destination stop"
        selectedValue={formData.toStop}
        onValueChange={handleToStopChange}
        options={toStopOptions}
      />
        {/* Only show fare if all required fields are selected, otherwise leave blank */}
        {formData.route && formData.fromStop && formData.toStop && formData.passengerCategory ? (
          <View style={styles.fareContainer}>
            <Text style={styles.fareLabel}>Fare Amount:</Text>
            <Text style={styles.fareAmount}>
              ₱{formData.fare !== null ? formData.fare.toFixed(2) : '0.00'}
            </Text>
          </View>
        ) : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
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
  fareContainer: {
    backgroundColor: Style.COLOR_BG_FAIR,
    padding: Style.BUTTON_PADDING_VERTICAL,
    borderRadius: Style.BORDER_RADIUS_SMALL,
    marginVertical: Style.BUTTON_PADDING_VERTICAL,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Style.COLOR_PRIMARY,
  },
  fareLabel: {
    fontSize: Style.FONT_SIZE_MEDIUM,
    color: Style.COLOR_TEXT,
    marginBottom: 5,
  },
  fareAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Style.COLOR_PRIMARY,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Style.BUTTON_PADDING_HORIZONTAL,
    gap: Style.BUTTON_GAP,
  },
  backButton: {
    backgroundColor: Style.COLOR_SECONDARY,
    paddingVertical: Style.BUTTON_PADDING_VERTICAL,
    paddingHorizontal: Style.BUTTON_PADDING_HORIZONTAL,
    borderRadius: Style.BORDER_RADIUS_SMALL,
    flex: 1,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: Style.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: Style.COLOR_PRIMARY,
    paddingVertical: Style.BUTTON_PADDING_VERTICAL,
    paddingHorizontal: Style.BUTTON_PADDING_HORIZONTAL,
    borderRadius: Style.BORDER_RADIUS_SMALL,
    flex: 1,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Style.COLOR_DISABLED,
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: Style.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#ccc',
  },
});
