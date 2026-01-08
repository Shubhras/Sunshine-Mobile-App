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
} from '@react-native-firebase/firestore'

// Initialize Firestore (modular)
const app = getApp()
const db = getFirestore(app)

// Collection reference
const subscriptionsRef = collection(db, 'subscriptions')

// ✅ Update user subscription
export const updateUserSubscription = async (userID, subscriptionPlan) => {
  await setDoc(
    doc(subscriptionsRef, userID),
    { ...subscriptionPlan },
    { merge: true }
  )
}

// ✅ Get user subscription
export const getUserSubscription = async userID => {
  try {
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
    return { success: false, error }
  }
}
