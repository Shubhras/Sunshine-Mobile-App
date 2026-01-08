
// import firestore, {
//   deleteDoc,
//   doc,
//   getDoc,
//   getFirestore,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
// } from '@react-native-firebase/firestore'
// export const usersRef = firestore().collection('users')

// export const getUserData = async userId => {
//   try {
//     const user = await usersRef.doc(userId).get()

//     return { data: { ...user.data(), id: user.id }, success: true }
//   } catch (error) {
//     return {
//       error: 'Oops! an error occurred. Please try again',
//       success: false,
//     }
//   }
// }

// export const updateUserData = async (userId, userData) => {
//   try {
//     const userRef = usersRef.doc(userId)

//     await userRef.update({
//       ...userData,
//     })

//     return { success: true }
//   } catch (error) {
//     return { error, success: false }
//   }
// }

// export const subscribeUsers = callback => {
//   return usersRef
//     .orderBy('createdAt', 'desc')
//     .limit(200)
//     .onSnapshot(querySnapshot => {
//       const users = []
//       querySnapshot.forEach(doc => {
//         users.push(doc.data())
//       })
//       return callback(users)
//     })
// }

// export const subscribeCurrentUser = (userId, callback) => {
//   const ref = usersRef
//     .where('id', '==', userId)
//     .onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
//       const docs = querySnapshot.docs
//       if (docs.length > 0) {
//         callback(docs[0].data())
//       }
//     })
//   return ref
// }


import { getApp } from '@react-native-firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from '@react-native-firebase/firestore'

// Initialize Firestore (modular)
const app = getApp()
const db = getFirestore(app)

// Collection reference
export const usersRef = collection(db, 'users')

// ✅ Get user data
export const getUserData = async userId => {
  try {
    const userSnap = await getDoc(doc(usersRef, userId))

    if (!userSnap.exists()) {
      return { success: false }
    }

    return {
      data: { ...userSnap.data(), id: userSnap.id },
      success: true,
    }
  } catch (error) {
    return {
      error: 'Oops! an error occurred. Please try again',
      success: false,
    }
  }
}

// ✅ Update user data
export const updateUserData = async (userId, userData) => {
  try {
    await updateDoc(doc(usersRef, userId), {
      ...userData,
    })

    return { success: true }
  } catch (error) {
    return { error, success: false }
  }
}

// ✅ Subscribe to users list
export const subscribeUsers = callback => {
  const q = query(
    usersRef,
    orderBy('createdAt', 'desc'),
    limit(200)
  )

  return onSnapshot(q, querySnapshot => {
    const users = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }))
    callback(users)
  })
}

// ✅ Subscribe current user
export const subscribeCurrentUser = (userId, callback) => {
  const q = query(
    usersRef,
    where('id', '==', userId)
  )

  return onSnapshot(
    q,
    { includeMetadataChanges: true },
    querySnapshot => {
      if (!querySnapshot.empty) {
        callback({
          ...querySnapshot.docs[0].data(),
          id: querySnapshot.docs[0].id,
        })
      }
    }
  )
}
