// import firestore, {
//   deleteDoc,
//   doc,
//   getDoc,
//   getFirestore,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
// } from '@react-native-firebase/firestore'

// const db = firestore()
// const subscriptionsRef = db.collection('subscriptions')

// export const updateUserSubscription = async (userID, subscriptionPlan) => {
//   subscriptionsRef.doc(userID).set({ ...subscriptionPlan }, { merge: true })
// }

// export const getUserSubscription = async userID => {
//   try {
//     const subscription = await subscriptionsRef.doc(userID).get()

//     if (subscription.data()) {
//       return {
//         sucess: true,
//         subscription: { ...subscription.data(), id: subscription.id },
//       }
//     }

//     return { sucess: false }
//   } catch (error) {

//     return { sucess: false, error }
//   }
// }


import { getApp } from '@react-native-firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore'

// Initialize Firestore (modular)
const app = getApp()
const db = getFirestore(app)

// Collection reference
const subscriptionsRef = collection(db, 'subscriptions')

// ✅ Update user subscription
export const updateUserSubscription = async (userID, subscriptionPlan) => {
  try {
    if (!userID) {
      throw new Error('User ID is required');
    }

    const dataToSave = { 
      ...subscriptionPlan,
      updatedAt: serverTimestamp(),
      // Keep createdAt if it exists, otherwise set it
      ...(subscriptionPlan.createdAt ? {} : { createdAt: serverTimestamp() }),
    };

    console.log('🔥 [Firebase] Updating subscription for userID:', userID);
    console.log('🔥 [Firebase] Data to save:', JSON.stringify({
      ...dataToSave,
      updatedAt: 'serverTimestamp()',
      createdAt: subscriptionPlan.createdAt ? 'existing' : 'serverTimestamp()',
    }, null, 2));

    const docRef = doc(subscriptionsRef, userID);
    console.log('🔥 [Firebase] Document path:', docRef.path);
    
    await setDoc(docRef, dataToSave, { merge: true });
    
    console.log('🔥 [Firebase] ✅ Subscription updated successfully for user:', userID);
    
    return { success: true };
  } catch (error) {
    console.error('🔥 [Firebase] ❌ Error updating subscription:', error);
    console.error('🔥 [Firebase] Error message:', error?.message);
    console.error('🔥 [Firebase] Error code:', error?.code);
    console.error('🔥 [Firebase] Error stack:', error?.stack);
    throw error;
  }
}

// ✅ Get user subscription
export const getUserSubscription = async userID => {
  try {
    if (!userID) {
      return { success: false, error: 'User ID is required' };
    }

    const subscriptionSnap = await getDoc(
      doc(subscriptionsRef, userID)
    )

    if (subscriptionSnap.exists()) {
      return {
        success: true,
        subscription: {
          ...subscriptionSnap.data(),
          id: subscriptionSnap.id,
        },
      }
    }

    return { success: false }
  } catch (error) {
    console.error('❌ Error getting subscription from Firebase:', error);
    return { success: false, error }
  }
}
