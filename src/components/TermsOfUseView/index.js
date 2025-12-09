import React from 'react';
import { Linking, View } from 'react-native';
import { CustomText } from '../global/CustomText';
import { scale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import { POPPINS_REGULAR } from '../../constants/Constants';

const TermsOfUseView = props => {
  const { tosLink, privacyPolicyLink, style } = props;

  return (
    <View style={style}>
      <CustomText
        style={{
          fontSize: scale(11),
          color: Colors.white,
          fontFamily: POPPINS_REGULAR,
        }}
      >
        By creating an account you agree with our
      </CustomText>
      <CustomText>
        <CustomText
          style={{
            color: 'yellow',
            fontSize: scale(11),
            fontFamily: POPPINS_REGULAR,
          }}
          onPress={() => Linking.openURL(tosLink)}
        >
          Terms of Use{' '}
        </CustomText>
        {privacyPolicyLink?.length > 0 && (
          <CustomText
            style={{
              fontSize: scale(11),
              color: Colors.white,
              fontFamily: POPPINS_REGULAR,
            }}
          >
            and{' '}
            <CustomText
              style={{
                color: 'yellow',
                fontSize: scale(11),
                fontFamily: POPPINS_REGULAR,
              }}
              onPress={() => Linking.openURL(privacyPolicyLink)}
            >
              Privacy Policy
            </CustomText>
          </CustomText>
        )}
      </CustomText>
    </View>
  );
};

export default TermsOfUseView;
