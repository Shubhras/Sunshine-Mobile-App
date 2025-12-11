import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../../constants/Colors';
import { Images } from '../../../constants/images';
import { CustomText } from '../../global/CustomText';
import styles from './styles';

interface ToastProps {}

export interface ToastConfig {
  type: 'success' | 'warning' | 'error';
  title: string;
  text: string;
  duration: number;
}

export interface ToastRef {
  show: (config: ToastConfig) => void;
}

const Toast = forwardRef<ToastRef, ToastProps>(({}, ref) => {
  const toastTopAnimation = useSharedValue(-100);
  const scaleAnimation = useSharedValue(0.9);
  const iconScaleAnimation = useSharedValue(1);
  const progressBarAnimation = useSharedValue(1);
  const context = useSharedValue(0);
  const [showing, setShowing] = useState<boolean>(false);
  const [toastConfig, setToastConfig] = useState<ToastConfig>({
    type: 'success',
    title: '',
    text: '',
    duration: 0,
  });

  const TOP_VALUE = 60;

  useImperativeHandle(ref, () => ({ show }), []);

  const show = useCallback(({ duration, title, text, type }: ToastConfig) => {
    setShowing(true);
    setToastConfig({ type, title, text, duration });

    progressBarAnimation.value = withSpring(1, { duration: 0 });
    progressBarAnimation.value = withTiming(0, { duration });

    scaleAnimation.value = withSpring(1, { duration: 100 });
    iconScaleAnimation.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    toastTopAnimation.value = withSequence(
      withTiming(TOP_VALUE, { duration: 500 }),
      withDelay(
        duration,
        withTiming(-100, { duration: 500 }, (finished) => {
          if (finished) runOnJS(setShowing)(false);
        })
      )
    );
  }, []);

  const animatedTopStyles = useAnimatedStyle(() => ({
    top: toastTopAnimation.value,
    transform: [{ scale: scaleAnimation.value }],
    opacity: showing ? 1 : 0,
  }));

  const animatedIconStyles = useAnimatedStyle(() => ({
    transform: [{ scale: iconScaleAnimation.value }],
  }));

  const animatedProgressBarStyles = useAnimatedStyle(() => ({
    transform: [{ scaleX: progressBarAnimation.value }],
  }));

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      context.value = toastTopAnimation.value;
    })
    .onUpdate((event) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(context.value + event.translationY, {
          stiffness: 100,
        });
      }
    })
    .onEnd((event) => {
      const isSwipeUp = event.translationY < 0;
      const newPosition = isSwipeUp ? -100 : TOP_VALUE;
      toastTopAnimation.value = withSpring(newPosition, {}, (finished) => {
        if (finished && isSwipeUp) runOnJS(setShowing)(false);
      });
    });

  const getToastStyles = useMemo(() => {
    switch (toastConfig.type) {
      case 'success':
        return {
          container: [styles.toastContainer, styles.successToastConatiner],
          title: styles.successToastText,
          text: styles.successToastText,
          progressBar: styles.successProgressBar,
        };
      case 'warning':
        return {
          container: [styles.toastContainer, styles.warningToastConatiner],
          title: styles.warningToastText,
          text: styles.warningToastText,
          progressBar: styles.warningProgressbar,
        };
      case 'error':
        return {
          container: [styles.toastContainer, styles.errorToastConatiner],
          title: styles.errorToastText,
          text: styles.errorToastText,
          progressBar: styles.errorProgressbar,
        };
      default:
        return {
          container: [styles.toastContainer, styles.successToastConatiner],
          title: styles.successToastText,
          text: styles.successToastText,
          progressBar: styles.successProgressBar,
        };
    }
  }, [toastConfig.type]);

  const { container, title, text, progressBar } = getToastStyles;

  return showing ? (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[container, animatedTopStyles]}>
        <Animated.Image
          source={
            toastConfig.type === 'success'
              ? Images.Success
              : toastConfig.type === 'warning'
              ? Images.Warning
              : Images.Error
          }
          style={[styles.toastIcon, animatedIconStyles]}
        />
      <View style={styles.messageWrapper}>
          <CustomText style={[styles.ToastTitle, title]}>{toastConfig.title}</CustomText>
        <CustomText style={[styles.ToastText, text]} numberOfLines={3} ellipsizeMode="tail">{toastConfig.text}</CustomText>
      </View>
        <TouchableOpacity onPress={() => setShowing(false)} style={styles.closeButton}>
          <AntDesign name={'close'} color={Colors.white} size={scale(14)} />
        </TouchableOpacity>
        <Animated.View style={[styles.progress_bar, progressBar, animatedProgressBarStyles]} />
      </Animated.View>
    </GestureDetector>
  ) : null;
});

export default Toast;
