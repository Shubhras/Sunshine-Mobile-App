import PropTypes from 'prop-types';
import React, { memo, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Images } from '../../../constants/images';
import styles from './styles';

const SwipeControls = props => {
  const scaleValue2 = useRef(new Animated.Value(0));
  const scaleValue3 = useRef(new Animated.Value(0));
  const scaleValue4 = useRef(new Animated.Value(0));

  const onDislikePress = () => {
    scaleValue2.current.setValue(0);
    Animated.timing(scaleValue2.current, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack,
    }).start(() => {});
    props.onDislikePressed();
  };

  const onSuperLikePress = () => {
    scaleValue3.current.setValue(0);
    Animated.timing(scaleValue3.current, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack,
    }).start(() => {});
    props.onSuperLikePressed();
  };

  const onLikePress = () => {
    scaleValue4.current.setValue(0);
    Animated.timing(scaleValue4.current, {
      toValue: 1,
      duration: 300,
      easing: Easing.easeOutBack,
    }).start(() => {});
    props.onLikePressed();
  };

  const getCardStyle2 = () => {
    const scale = scaleValue2.current.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1],
    });

    return {
      transform: [{ scale }],
    };
  };

  const getCardStyle3 = () => {
    const scale = scaleValue3.current.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1],
    });

    return {
      transform: [{ scale }],
    };
  };

  const getCardStyle4 = () => {
    const scale = scaleValue4.current.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.7, 1],
    });

    return {
      transform: [{ scale }],
    };
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableWithoutFeedback onPress={onDislikePress}>
        <Animated.View
          style={[
            styles.button_container,
            getCardStyle2(),
            props.buttonContainerStyle,
          ]}
        >
          <Image
            source={Images.crossFilled}
            style={[styles.large_icon, { tintColor: '#e8315b' }]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onLikePress}>
        <Animated.View style={[styles.button_container, getCardStyle4()]}>
          <Image
            source={Images.Like}
            style={[styles.large_icon, { tintColor: '#44d48c' }]}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

SwipeControls.propTypes = {
  containerStyle: PropTypes.any,
  onBoostPressed: PropTypes.func,
  onLikePressed: PropTypes.func,
  onSuperLikePressed: PropTypes.func,
  onDislikePressed: PropTypes.func,
  onRewindPressed: PropTypes.func,
  buttonContainerStyle: PropTypes.any,
};

export default memo(SwipeControls);
