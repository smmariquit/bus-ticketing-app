import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import App from '../src/App';
import { FormPicker } from '../src/components/forms/FormPicker';

// 1. App renders without crashing
it('renders App without crashing', () => {
  const { getByText } = render(<App />);
  expect(getByText('Trip Details')).toBeTruthy();
});

// 2. FormPicker displays label and placeholder
it('FormPicker displays label and placeholder', () => {
  const options = [{ label: 'Option 1', value: 1 }];
  const { getByText } = render(
    <FormPicker
      label="Test Label"
      placeholder="Select option"
      selectedValue={null}
      onValueChange={() => {}}
      options={options}
    />
  );
  expect(getByText('Test Label')).toBeTruthy();
  expect(getByText('Select option')).toBeTruthy();
});

// 3. FormPicker opens modal on press
it('FormPicker opens modal when pressed', () => {
  const options = [{ label: 'Option 1', value: 1 }];
  const { getByText } = render(
    <FormPicker
      label="Test Label"
      placeholder="Select option"
      selectedValue={null}
      onValueChange={() => {}}
      options={options}
    />
  );
  fireEvent.press(getByText('Select option'));
  expect(getByText('Select Test Label')).toBeTruthy();
});

// 4. FormPicker calls onValueChange when option selected
it('FormPicker calls onValueChange when option selected', () => {
  const options = [{ label: 'Option 1', value: 1 }];
  const onValueChange = jest.fn();
  const { getByText } = render(
    <FormPicker
      label="Test Label"
      placeholder="Select option"
      selectedValue={null}
      onValueChange={onValueChange}
      options={options}
    />
  );
  fireEvent.press(getByText('Select option'));
  fireEvent.press(getByText('Option 1'));
  expect(onValueChange).toHaveBeenCalledWith(1);
});
