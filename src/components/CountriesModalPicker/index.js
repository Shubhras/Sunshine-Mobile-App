import React, { useCallback, useRef } from 'react';
import { FlatList, Modal, TouchableOpacity, View } from 'react-native';
import { CustomText } from '../global/CustomText';
import styles from './styles';

const CountriesModalPicker = props => {
  const modal = useRef(null);

  const onChange = useCallback(item => {
    props.onChange(item);
    props.onCancel();
  }, []);

  const renderOption = useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={() => onChange(item)}>
        <View style={[styles.optionStyle, props.optionStyle]}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <CustomText style={[styles.optionTextStyle, props.optionTextStyle]}>
              {item.label}
            </CustomText>
          </View>
          <CustomText style={[styles.optionTextStyle, props.optionTextStyle]}>
            {item.dialCode}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback(item => item.key, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 50, // Approximate height of each item (adjust according to your design)
      offset: 50 * index,
      index,
    }),
    [],
  );

  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      transparent
      ref={modal}
      visible={props.visible}
      onRequestClose={props.onCancel}
      animationType={'none'}
    >
      <View style={[styles.overlayStyle, props.overlayStyle]}>
        <View style={styles.optionContainer}>
          <FlatList
            data={props.data}
            renderItem={renderOption}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            removeClippedSubviews={true}
            initialNumToRender={15}
            maxToRenderPerBatch={10}
            windowSize={5}
            updateCellsBatchingPeriod={50}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={props.onCancel}>
            <View style={[styles.cancelStyle, props.cancelStyle]}>
              <CustomText
                style={[styles.cancelTextStyle, props.cancelTextStyle]}
              >
                {props.cancelText}
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

CountriesModalPicker.defaultProps = {
  data: [],
  onChange: () => {},
  initValue: 'Select me!',
  cancelText: 'cancel',
  visible: false,
  onCancel: () => {},
};

export default CountriesModalPicker;
