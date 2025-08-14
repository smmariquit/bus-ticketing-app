import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Style from '../../constants/styleConstants';

interface Option {
  label: string;
  value: any;
}

interface FormPickerProps {
  label: string;
  placeholder: string;
  selectedValue: any;
  onValueChange: (value: any) => void;
  options: Option[];
}

export const FormPicker: React.FC<FormPickerProps> = ({
  label,
  placeholder,
  selectedValue,
  onValueChange,
  options,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;
  const handleSelect = (value: any) => {
    onValueChange(value);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.picker} 
        onPress={() => setModalVisible(true)}
      >
        <Text style={[
          styles.pickerText,
          !selectedOption && styles.placeholder
        ]}>
          {displayText}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {label}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === selectedValue && styles.selectedOption
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[
                    styles.optionText,
                    item.value === selectedValue && styles.selectedOptionText
                  ]}>
                    {item.label}
                  </Text>
                  {item.value === selectedValue && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              style={styles.optionsList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginBottom: Style.PADDING,
  },
  label: {
    fontSize: Style.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
    color: Style.COLOR_TEXT,
    marginBottom: 8,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: Style.COLOR_BORDER,
    borderRadius: Style.BORDER_RADIUS_SMALL,
    paddingHorizontal: 12,
    paddingVertical: Style.BUTTON_PADDING_VERTICAL,
    minHeight: 50,
  },
  pickerText: {
    fontSize: Style.FONT_SIZE_MEDIUM,
    color: Style.COLOR_TEXT,
    flex: 1,
  },
  placeholder: {
    color: Style.COLOR_TEXT_PLACEHOLDER,
  },
  arrow: {
    fontSize: Style.OPTION_ARROW_SIZE,
    color: Style.COLOR_TEXT_LIGHT,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Style.COLOR_BG_MODAL,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: Style.BORDER_RADIUS_LARGE,
    borderTopRightRadius: Style.BORDER_RADIUS_LARGE,
    maxHeight: height * Style.MODAL_MAX_HEIGHT_RATIO,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Style.BUTTON_PADDING_HORIZONTAL,
    borderBottomWidth: 1,
    borderBottomColor: Style.COLOR_BORDER_MODAL,
  },
  modalTitle: {
    fontSize: Style.OPTION_FONT_SIZE,
    fontWeight: 'bold',
    color: Style.COLOR_TEXT,
  },
  closeButton: {
    width: Style.CLOSE_BUTTON_SIZE,
    height: Style.CLOSE_BUTTON_SIZE,
    borderRadius: Style.CLOSE_BUTTON_RADIUS,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: Style.FONT_SIZE_MEDIUM,
    color: Style.COLOR_TEXT_LIGHT,
  },
  optionsList: {
    maxHeight: height * Style.OPTIONS_MAX_HEIGHT_RATIO,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Style.BUTTON_PADDING_HORIZONTAL,
    paddingVertical: Style.BUTTON_PADDING_VERTICAL,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: Style.COLOR_BG_SELECTED,
  },
  optionText: {
    fontSize: Style.FONT_SIZE_MEDIUM,
    color: Style.COLOR_TEXT,
    flex: 1,
  },
  selectedOptionText: {
    color: Style.COLOR_PRIMARY,
    fontWeight: Style.OPTION_SELECTED_WEIGHT,
  },
  checkmark: {
    fontSize: Style.OPTION_CHECKMARK_SIZE,
    color: Style.COLOR_PRIMARY,
    fontWeight: 'bold',
  },
});
