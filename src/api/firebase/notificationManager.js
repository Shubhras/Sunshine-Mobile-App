import { getApp } from '@react-native-firebase/app';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from '@react-native-firebase/firestore';
import { firebaseServerKey } from '../../constants/Constants';
import * as userAPIManager from '../firebase/user';
import { getUserByID, updateUserInfo } from './auth';

const app = getApp();
const db = getFirestore(app);

const notificationsRef = collection(db, 'notifications');

const fcmURL = 'https://fcm.googleapis.com/fcm/send';
// const firebaseServerKey = firebaseServerKey; // ⚠️ add key here (but should be on server)

const handleUserBadgeCount = async userID => {
  const user = await getUserByID(userID);

  const newBadgeCount = (user?.badgeCount || 0) + 1;
  await updateUserInfo(userID, { badgeCount: newBadgeCount });

  return newBadgeCount;
};

const sendPushNotification = async (
  toUser,
  title,
  body,
  type,
  metadata = {},
) => {
  try {
    if (metadata?.outBound && toUser?.id === metadata?.outBound?.id) return;
    if (toUser?.settings?.push_notifications_enabled === false) return;

    const userData = await userAPIManager.getUserData(toUser.id);
    const recipientData = userData?.data;

    if (!recipientData?.pushToken) return;

    const notification = {
      toUserID: toUser.id,
      title,
      body,
      metadata,
      toUser,
      type,
      seen: false,
      createdAt: serverTimestamp(),
    };

    // ✅ Add notification
    const ref = await addDoc(notificationsRef, notification);

    // ✅ Update ID
    await updateDoc(doc(db, 'notifications', ref.id), { id: ref.id });

    const userBadgeCount = await handleUserBadgeCount(
      toUser.id || toUser.userID,
    );

    const pushNotification = {
      to: recipientData.pushToken,
      notification: {
        title,
        body,
        sound: 'default',
        badge: userBadgeCount,
      },
      data: { type, toUserID: toUser.id, ...metadata },
      priority: 'high',
    };

    await fetch(fcmURL, {
      method: 'POST',
      headers: {
        Authorization: 'key=' + firebaseServerKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pushNotification),
    });
  } catch (error) {
    console.log('sendPushNotification error:', error);
  }
};

const sendCallNotification = async (sender, recipient, callType, callID) => {
  try {
    if (!recipient?.id) return;

    const userData = await userAPIManager.getUserData(recipient.id);
    const recipientData = userData?.data;

    if (!recipientData?.pushToken) return;

    const pushNotification = {
      to: recipientData.pushToken,
      priority: 'high',
      data: {
        recipientID: recipient.id,
        senderID: sender.id,
        callType,
        callID,
        callerName: sender.firstName,
        contentAvailable: true,
      },
    };

    await fetch(fcmURL, {
      method: 'POST',
      headers: {
        Authorization: 'key=' + firebaseServerKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pushNotification),
    });
  } catch (error) {
    console.log('sendCallNotification error:', error);
  }
};

export const notificationManager = {
  sendPushNotification,
  sendCallNotification,
};
