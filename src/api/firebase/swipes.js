import firestore, {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@react-native-firebase/firestore';

const db = firestore()

const usersRef = firestore().collection('users')

const swipesRef = firestore().collection('swipes')

const swipeCountRef = firestore().collection('swipe_counts')

const onCollectionUpdate = (querySnapshot, callback) => {
  const data = []
  querySnapshot.forEach(doc => {
    const temp = doc.data()
    temp.id = doc.id
    data.push(temp)
  })
  return callback(data, usersRef)
}

export const subscribeToInboundSwipes = (userId, callback) => {
  return swipesRef
    .where('swipedProfile', '==', userId)
    .where('otherSwipe', '==', false)
    .onSnapshot(querySnapshot => onCollectionUpdate(querySnapshot, callback))
}

export const subscribeToOutboundSwipes = (userId, callback) => {
  return swipesRef
    .where('author', '==', userId)
    .where('authorSwipe', '==', false)
    .onSnapshot(querySnapshot => onCollectionUpdate(querySnapshot, callback))
}

export const unmatchUser = (item, user) => {
  swipesRef
    .where('swipedProfile', '==', item.id)
    .where('author', '==', user.id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        swipesRef
          .doc(doc.id)
          .update({
            authorSwipe: true,
          })
          .then(function () {
            return { status: 'success', message: 'successfully removed' }
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error('Error updating document: ', error)
          })
      })
    })
}

export const addSwipe = (fromUserID, toUserID, type, callback) => {
  swipesRef
    .add({
      author: fromUserID,
      swipedProfile: toUserID,
      type: type,
      hasBeenSeen: false,
      created_at: serverTimestamp(),
      createdAt: serverTimestamp(),
      authorSwipe: false,
      otherSwipe: false,
    })
    .then(() => {
      callback({ success: true })
    })
    .catch(error => {
      callback({ error: error })
    })
}

export const removeSwipe = (swipeProfileId, userID) => {
  const batch = db.batch()

  const query = swipesRef
    .where('swipedProfile', '==', swipeProfileId)
    .where('author', '==', userID)

  query.get().then(async querySnapshot => {
    querySnapshot.docs.forEach(doc => {
      batch.delete(doc.ref)
    })
    batch.commit()
  })
}

export const markSwipeAsSeen = (fromUserID, toUserID) => {
  swipesRef
    .where('author', '==', fromUserID)
    .where('swipedProfile', '==', toUserID)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update({
          hasBeenSeen: true,
        })
      })
    })
}

export const getUserSwipeCount = async userID => {
  try {
    const swipeCount = await swipeCountRef.doc(userID).get()

    if (swipeCount.data()) {
      return swipeCount.data()
    }
  } catch (error) {
    return
  }
}

export const updateUserSwipeCount = (userID, count) => {
  const data = {
    authorID: userID,
    count: count,
  }

  if (count === 1) {
    data.createdAt = serverTimestamp()
  }

  try {
    swipeCountRef.doc(userID).set(data, { merge: true })
  } catch (error) {}
}

export const numMatch = (userID, numerologyNumber) => {
 
  return new Promise((resolve, reject) => {
    if (numerologyNumber === undefined || numerologyNumber === null) {
      reject('Invalid input: numerolog yNumber is undefined or null')
    }
    usersRef
      .where('numerologyNumber', '==', numerologyNumber)
      .get()
      .then(async(querySnapshot) => {
        const matchingUsers = []

       await querySnapshot.forEach(doc => {
       
          if (doc.data().id != userID) {
            matchingUsers.push(doc.data())
          }
        })
        resolve({ status: 'success', users: matchingUsers })
      })
      .catch(error => {
        console.error('Error querying documents: ', error)
        reject({ status: 'error', message: 'Query failed', error })
      })

    //   usersRef
    //     .doc(userID)
    //     .update({ numerologyNumber: numerologyNumber })
    //     .then(() => {
    //       resolve({ success: true })
    //     })
    //     .catch(error => {
    //       resolve({ error: error })
    //     })
  })
}

// export const numMatch = (userID, num) => {
//   if (num === undefined || num === null) {
//     return Promise.reject(new Error('Invalid input: num is undefined or null'))
//   }

//   usersRef

//     .where('numerologyNumber', '==', num)
//     .get()
//     .then(querySnapshot => {
//       const matchingUsers = []

//       querySnapshot.forEach(doc => {
//         if (doc.data.userID != userID) {
//           matchingUsers.push(doc.data())
//         }
//       })
//       console.log(matchingUsers)
//       return { status: 'success', users: matchingUsers }
//     })
//     .catch(error => {
//       console.error('Error querying documents: ', error)
//       return { status: 'error', message: 'Query failed', error }
//     })
// }
