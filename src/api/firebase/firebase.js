import firestore, {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore'

const db = firestore()
const subscriptionsRef = db.collection('subscriptions')

export const updateUserSubscription = async (userID, subscriptionPlan) => {
  subscriptionsRef.doc(userID).set({ ...subscriptionPlan }, { merge: true })
}

export const getUserSubscription = async userID => {
  try {
    const subscription = await subscriptionsRef.doc(userID).get()

    if (subscription.data()) {
      return {
        sucess: true,
        subscription: { ...subscription.data(), id: subscription.id },
      }
    }

    return { sucess: false }
  } catch (error) {

    return { sucess: false, error }
  }
}
