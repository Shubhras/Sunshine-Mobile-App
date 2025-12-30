import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '../../global/CustomText';
import styles from './styles';

const TNEmptyStateView = props => {
  const { emptyStateConfig } = props;
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>{emptyStateConfig.title}</CustomText>
      <CustomText style={styles.description}>
        {emptyStateConfig.description}
      </CustomText>
      {emptyStateConfig.buttonName &&
        emptyStateConfig.buttonName.length > 0 && (
          <TouchableOpacity
            onPress={emptyStateConfig.onPress}
            style={styles.buttonContainer}
          >
            <CustomText style={styles.buttonName}>
              {emptyStateConfig.buttonName}
            </CustomText>
          </TouchableOpacity>
        )}
    </View>
  );
};

export default TNEmptyStateView;
