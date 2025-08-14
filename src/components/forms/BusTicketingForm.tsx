// ...existing code...

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import TripSummary from '../summary/TripSummary';
import { FareDetailsStep } from './FareDetailsStep';
import { TripDetailsStep } from './TripDetailsStep';
// ...existing code...
// If you previously imported busTripConstants, update to import from the new files as needed.

export interface FormData {
    ticketNumber?: string | null;
    busNumber: number | null;
    driver: string | null;
    conductor: string | null;
    route: string | null;
    passengerCategory: string | null;
    fromStop: string | null;
    toStop: string | null;
    fare: number | null;
    date?: string | null;
    time?: string | null;
}

const initialFormData: FormData = {
    // ticketNumber is optional
    busNumber: null,
    driver: null,
    conductor: null,
    route: null,
    passengerCategory: null,
    fromStop: null,
    toStop: null,
    fare: null,
    date: null,
    time: null,
};

interface BusTicketingFormProps {
    onSubmit?: (formData: FormData) => void;
    ticketNumber?: number; // remains optional
}

const BusTicketingForm: React.FC<BusTicketingFormProps> = ({ onSubmit, ticketNumber }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const safeOnSubmit = typeof onSubmit === 'function' ? onSubmit : () => {
        console.warn('onSubmit prop not provided to BusTicketingForm.');
    };

    useEffect(() => {
        if (ticketNumber) {
            setFormData(prev => ({ ...prev, ticketNumber: ticketNumber.toString() }));
        } else {
            setFormData(prev => {
                const rest = { ...prev };
                delete rest.ticketNumber;
                return rest;
            });
        }
    }, [ticketNumber]);

    const updateFormData = (updates: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...updates }));
    };

    const isStep1Valid = () => {
        return Boolean(formData.busNumber && formData.driver && formData.conductor && formData.route);
    };

    const handleNext = () => {
        if (step === 1 && isStep1Valid()) {
            setStep(2);
        } else if (step === 2) {
            // Add date and time to formData before moving to summary
            const now = new Date();
            const formattedDate = now.toLocaleDateString();
            const formattedTime = now.toLocaleTimeString();
            setFormData(prev => ({ ...prev, date: formattedDate, time: formattedTime }));
            setTimeout(() => setStep(3), 0);
        }
    };
    const handleBack = () => {
        if (step === 2) setStep(1);
        else if (step === 3) setStep(2);
    };

    // handleSubmit is not used in the new flow

    return (
        <View>
            {step === 1 && (
                <TripDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                    isValid={isStep1Valid()}
                />
            )}
            {step === 2 && (
                <FareDetailsStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                    onBack={handleBack}
                    isValid={true}
                />
            )}
            {step === 3 && (
                <TripSummary formData={formData} onBack={handleBack} onConfirm={() => safeOnSubmit(formData)} />
            )}
        </View>
    );
};

export default BusTicketingForm;
