import React from 'react';
import { FlatList, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import BlockUserItemCard from '../../components/cards/BlockUserItemCard';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import ProfileHeader from '../../components/ProfileHeader';
import Colors from '../../constants/Colors';
import BlockedUsersData from '../../data/BlockedUsersData';
import styles from './styles';

const BlockedUsers = ({ route }) => {
  const { title } = route.params;

  const renderItemView = ({ item, index }) => {
    return (
      <View
        key={item.id}
        style={[
          index === 0 && styles.blockUserComponentWrapperWithMarginTop,
          styles.blockUserComponentWrapper,
        ]}
      >
        <BlockUserItemCard
          index={index}
          blockUserImage={item.image}
          blockUserName={item.name}
          blockUserNameColor={Colors.mainTextColor}
          blockUserEmail={item.email}
          blockUserEmailColor={Colors.mainTextColor}
          unblock={item.block}
          unblockColor={Colors.primary}
        />
      </View>
    );
  };

  return (
    <CustomSafeAreaView
      style={[styles.mainWrapper, { backgroundColor: Colors.black }]}
    >
      <ProfileHeader
        back={true}
        iconColor={Colors.white}
        title={title}
        titleAlight={'center'}
        titleFontSize={scale(16)}
        headerBg={Colors.black}
      />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        data={BlockedUsersData}
        renderItem={renderItemView}
        keyExtractor={(item, index) => item.email}
        contentContainerStyle={styles.flatlistScrollWrapper}
      />
    </CustomSafeAreaView>
  );
};

export default BlockedUsers;
