// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Icon, { Icons } from '../components/Icons';
// import Colors from '../../../constants/Colors';
// import MyProfileStack from '../../stacks/MyProfileStack';
// import SwipeStack from '../../stacks/SwipeStack';
// import ChatStack from '../../stacks/ChatStack';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import FastImage from '@d11/react-native-fast-image';
// import styles from './styles';
// import { Images } from '../../../constants/images';

// const Tab = createMaterialTopTabNavigator();

// const TabArr = [
//   {
//     route: 'MyProfileStack',
//     type: Images.profileTabIcon,
//     component: MyProfileStack,
//     tabBarColor: Colors.primary,
//     badge: false,
//   },
//   {
//     route: 'SwipeStack',
//     type: Images.swipeTabIcon,
//     component: SwipeStack,
//     tabBarColor: Colors.primary,
//     badge: false,
//   },
//   {
//     route: 'ChatStack',
//     type: Images.chatTabIcon,
//     component: ChatStack,
//     tabBarColor: Colors.primary,
//     badge: false,
//   },
// ];

// const HomeTopTab = () => {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Tab.Navigator
//         shifting={true}
//         barStyle={{ height: 70 }}
//         screenOptions={{}}
//       >
//         {TabArr.map((_, index) => {
//           return (
//             <Tab.Screen
//               key={index}
//               name={_.route}
//               component={_.component}
//               options={{
//                 tabBarColor: _.tabBarColor,
//                 tabBarBadge: _.badge,
//                 tabBarIcon: ({ color }) => (
//                   <FastImage
//                     style={[styles.icons, { opacity: _.type ? 1 : 0.3 }]}
//                     tintColor={color}
//                     source={_.type}
//                     resizeMode="cover"
//                   />
//                 ),
//               }}
//             />
//           );
//         })}
//       </Tab.Navigator>
//     </SafeAreaView>
//   );
// };

// export default HomeTopTab;

import FastImage from '@d11/react-native-fast-image';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/Colors';
import { Images } from '../../../constants/images';
import ChatStack from '../../stacks/ChatStack';
import MyProfileStack from '../../stacks/MyProfileStack';
import SwipeStack from '../../stacks/SwipeStack';
import styles from './styles';

const Tab = createMaterialTopTabNavigator();

// Define tab configuration
const TabArr = [
  {
    name: 'MyProfileStack',
    component: MyProfileStack,
    icon: Images.profileTabIcon,
    tabBarColor: Colors.primary,
    type: 'tint',
  },
  {
    name: 'SwipeStack',
    component: SwipeStack,
    activeIcon: Images.swipeTabActiveIcon,
    inactiveIcon: Images.swipeTabInactiveIcon,
    tabBarColor: Colors.primary,
    type: 'image',
  },
  {
    name: 'ChatStack',
    component: ChatStack,
    icon: Images.chatTabIcon,
    tabBarColor: Colors.primary,
    type: 'tint',
  },
];

const HomeTopTab = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.black }}
      edges={['top']}
    >
      <Tab.Navigator
        // screenOptions={{
        //   swipeEnabled: false,
        //   tabBarShowLabel: false,
        //   tabBarIndicatorStyle: { height: 0 },
        //   tabBarStyle: {
        //     backgroundColor: Colors.error,
        //     elevation: 0,
        //     width: '100%',
        //     alignSelf: 'center',
        //     borderWidth: 1,
        //   },
        //   tabBarItemStyle: {
        //     borderWidth: 1,
        //     maxWidth: '70%',
        //     backgroundColor: 'red',

        //     justifyContent: 'center',
        //     // justifyContent: 'space-between',
        //   },
        // }}
        screenOptions={{
          swipeEnabled: false,
          tabBarShowLabel: false,
          tabBarIndicatorStyle: { height: 0 },
          tabBarStyle: {
            backgroundColor: Colors.error,
            elevation: 0,
          },
          tabBarItemStyle: {
            marginHorizontal: 12, // ⭐ left & right spacing between tabs
            justifyContent: 'center',
          },
        }}
      >
        {TabArr.map(item => (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({ focused }) => {
                // 🔵 SwipeStack → switch active/inactive images
                if (item.type === 'image') {
                  return (
                    <FastImage
                      source={focused ? item.activeIcon : item.inactiveIcon}
                      style={{ width: 28, height: 28 }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  );
                }
                return (
                  <FastImage
                    source={item.icon}
                    style={styles.icons}
                    tintColor={focused ? Colors.primary : '#d1d7df'}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                );
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HomeTopTab;
