
import firestore, {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore'
export const usersRef = firestore().collection('users')

export const getUserData = async userId => {
  try {
    const user = await usersRef.doc(userId).get()

    return { data: { ...user.data(), id: user.id }, success: true }
  } catch (error) {
    return {
      error: 'Oops! an error occurred. Please try again',
      success: false,
    }
  }
}

export const updateUserData = async (userId, userData) => {
  try {
    const userRef = usersRef.doc(userId)

    await userRef.update({
      ...userData,
    })

    return { success: true }
  } catch (error) {
    return { error, success: false }
  }
}

export const subscribeUsers = callback => {
  return usersRef
    .orderBy('createdAt', 'desc')
    .limit(200)
    .onSnapshot(querySnapshot => {
      const users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      return callback(users)
    })
}

export const subscribeCurrentUser = (userId, callback) => {
  const ref = usersRef
    .where('id', '==', userId)
    .onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
      const docs = querySnapshot.docs
      if (docs.length > 0) {
        callback(docs[0].data())
      }
    })
  return ref
}
