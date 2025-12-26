import FastImage from '@d11/react-native-fast-image';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';
import { Images } from '../../../constants/images';
import ChatStack from '../../stacks/ChatStack';
import MyProfileStack from '../../stacks/MyProfileStack';
import SwipeStack from '../../stacks/SwipeStack';
import styles from './styles';

const Tab = createMaterialTopTabNavigator();

const ICON_SIZE = scale(35);
const INACTIVE_TINT_COLOR = '#d1d7df';

const TAB_TYPES = {
  TINT: 'tint',
  IMAGE: 'image',
};

const ALIGNMENTS = ['flex-start', 'center', 'flex-end'];

const TAB_CONFIG = [
  {
    name: 'MyProfileStack',
    component: MyProfileStack,
    icon: Images.profileTabIcon,
    type: TAB_TYPES.TINT,
  },
  {
    name: 'SwipeStack',
    component: SwipeStack,
    activeIcon: Images.swipeTabActiveIcon,
    inactiveIcon: Images.swipeTabInactiveIcon,
    type: TAB_TYPES.IMAGE,
  },
  {
    name: 'ChatStack',
    component: ChatStack,
    icon: Images.chatTabIcon,
    type: TAB_TYPES.TINT,
  },
];

const TintIcon = ({ source, focused }) => (
  <FastImage
    source={source}
    style={styles.icons}
    tintColor={focused ? Colors.primary : INACTIVE_TINT_COLOR}
    resizeMode={FastImage.resizeMode.contain}
  />
);

const ImageIcon = ({ activeIcon, inactiveIcon, focused }) => (
  <FastImage
    source={focused ? activeIcon : inactiveIcon}
    style={{ width: ICON_SIZE, height: ICON_SIZE }}
    resizeMode={FastImage.resizeMode.contain}
  />
);

const TabIcon = ({ tabConfig, focused }) =>
  tabConfig.type === TAB_TYPES.IMAGE ? (
    <ImageIcon
      activeIcon={tabConfig.activeIcon}
      inactiveIcon={tabConfig.inactiveIcon}
      focused={focused}
    />
  ) : (
    <TintIcon source={tabConfig.icon} focused={focused} />
  );

const TabButton = ({ alignment, icon, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: alignment,
    }}
  >
    {icon}
  </TouchableOpacity>
);

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabWrapper}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabButton
            key={route.key}
            alignment={ALIGNMENTS[index] || 'center'}
            icon={options.tabBarIcon?.({ focused })}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const HomeTopTab = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.black,
      }}
      edges={['top']}
    >
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { height: 0 },
        }}
        initialRouteName="SwipeStack"
        tabBar={props => <CustomTabBar {...props} />}
      >
        {TAB_CONFIG.map(tab => (
          <Tab.Screen
            key={tab.name}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon tabConfig={tab} focused={focused} />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeTopTab;
