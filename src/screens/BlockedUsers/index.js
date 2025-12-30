import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import BlockUserItemCard from '../../components/cards/BlockUserItemCard';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import ProfileHeader from '../../components/ProfileHeader';
import Colors from '../../constants/Colors';
import BlockedUsersData from '../../data/BlockedUsersData';
import styles from './styles';
import { hydrateAllReportedUsers, unblockUser } from '../../api/firebase/reportingManager';
import { useSelector } from 'react-redux';
import TNActivityIndicator from '../../components/TNActivityIndicator';

const BlockedUsers = ({ route }) => {
  const { title } = route.params;
  const userInfo = useSelector(state => state.users.users);
const [blockedUsers, setBlockedUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
  const unsubscribe = getList()

  return () => {
    unsubscribe && unsubscribe()
  }
}, [userInfo.id])

const getList = () => {
  setIsLoading(true)

  return hydrateAllReportedUsers(userInfo.id, promise => {
    Promise.resolve(promise)
      .then(values => {
        setBlockedUsers(values || [])
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error)
        setIsLoading(false)
      })
  })
}

const onUserUnblock = async userID => {
  try {
    setIsLoading(true)

    const response = await unblockUser(userInfo.id, userID)
    console.log('blockedUsers:', response)
    getList()
  } catch (error) {
    console.error(error)
  } finally {
    setIsLoading(false)
  }
}

  
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
          blockUserImage={item.profilePictureURL}
          blockUserName={item.firstName+' '+item?.lastName}
          blockUserNameColor={Colors.mainTextColor}
          blockUserEmail={item.email}
          blockUserEmailColor={Colors.mainTextColor}
          unblock={true}
          unblockColor={Colors.primary}
          onPressUnblock={()=>onUserUnblock(item.id)}
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
        data={blockedUsers}
        renderItem={renderItemView}
        keyExtractor={(item, index) => item.email+index}
        contentContainerStyle={styles.flatlistScrollWrapper}
      />
         {isLoading && <TNActivityIndicator />}
    </CustomSafeAreaView>
  );
};

export default BlockedUsers;
