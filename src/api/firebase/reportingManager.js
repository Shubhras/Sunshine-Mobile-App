// import {
//   getFirestore,
//   collection,
//   addDoc,
//   query,
//   where,
//   onSnapshot,
//   getDocs,
//   deleteDoc,
//   doc,
//   getDoc,
//   serverTimestamp,
// } from '@react-native-firebase/firestore'

// /* --------------------------------------------------
//    Firestore refs
// --------------------------------------------------- */

// const db = getFirestore();

// const abuseDBRef = collection(db, 'reports');
// const usersDBRef = collection(db, 'users');

// /* --------------------------------------------------
//    Mark abuse
// --------------------------------------------------- */

// export const markAbuse = async (outBoundID, toUserID, abuseType) => {
//     if (outBoundID == toUserID) {
//     return Promise(r => {
//       r()
//     })
//   }

//   try {
//     await addDoc(abuseDBRef, {
//       dest: toUserID,
//       source: outBoundID,
//       type: abuseType,
//       createdAt: serverTimestamp(),
//     });

//     return { success: true };
//   } catch (error) {
//     console.error('Mark abuse error:', error);
//     return { error };
//   }
// };

// /* --------------------------------------------------
//    Subscribe to abuse DB
// --------------------------------------------------- */

// export const unsubscribeAbuseDB = (userID, callback) => {
//   const q = query(abuseDBRef, where('source', '==', userID));

//   return onSnapshot(q, snapshot => {
//     const abuses = snapshot?.docs?.map(docSnap => ({
//       id: docSnap?.id,
//       ...docSnap?.data(),
//     }));
//     callback(abuses);
//   });
// };

// /* --------------------------------------------------
//    Unblock user
// --------------------------------------------------- */

// export const unblockUser = async (currentUserID, blockedUserID, callback) => {
//   try {
//     const q = query(
//       abuseDBRef,
//       where('source', '==', currentUserID),
//       where('dest', '==', blockedUserID),
//     );

//     const snapshot = await getDocs(q);

//     await Promise.all(
//       snapshot.docs.map(docSnap => deleteDoc(docSnap.ref)),
//     );

//     callback && callback(true);
//   } catch (error) {
//     console.error('Unblock user error:', error);
//     callback && callback(false);
//   }
// };

// /* --------------------------------------------------
//    Hydrate reported users
// --------------------------------------------------- */

// // export const hydrateAllReportedUsers = (userID, callback) => {
  
// //   const q = query(abuseDBRef, where('source', '==', userID));
  
// //   console.log("userIDuserIDuserIDuserID",userID);
// //   return onSnapshot(q, async snapshot => {
// //     try {
// //       const promises = snapshot.docs.map(async docSnap => {
// //         const blocked = docSnap.data();
// //         const userRef = doc(db, 'users', blocked.dest);
// //         const userSnap = await getDoc(userRef);
// //         return userSnap.exists() ? userSnap.data() : null;
// //       });

// //       const users = (await Promise.all(promises)).filter(Boolean);
// //       callback && callback(users);
// //     } catch (error) {
// //       console.error('Hydrate reported users error:', error);
// //     }
// //   });
// // };

// export const hydrateAllReportedUsers = (userID, callback) => {
//   return abuseDBRef.where('source', '==', userID).onSnapshot(snapshot => {
//     const list = []
//     snapshot.forEach(
//       childSnapshot => {
//         let blockedUser = childSnapshot.data()
//         let promise = new Promise((resolve, fail) => {
//           usersDBRef
//             .doc(blockedUser.dest)
//             .get()
//             .then(
//               snap => {
//                 let info = snap.data()
//                 if (info) {
//                   resolve(info)
//                 }
//               },
//               error => {
//                 fail(error)
//               },
//             )
//         })
//         if (promise) {
//           list.push(promise)
//         }
//       },
//       error => {
//         console.error(error)
//       },
//     )
//     callback && callback(Promise.all(list))
//   })
// }

import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { normalizeTimestamp } from '../../constants/helpers/helperFunction';

/* --------------------------------------------------
   Firestore refs
--------------------------------------------------- */

const db = getFirestore();

const abuseDBRef = collection(db, 'reports');
const usersDBRef = collection(db, 'users');

/* --------------------------------------------------
   Mark abuse
--------------------------------------------------- */

export const markAbuse = async (outBoundID, toUserID, abuseType) => {
  if (outBoundID === toUserID) return { success: true };

  try {
    await addDoc(abuseDBRef, {
      dest: toUserID,
      source: outBoundID,
      type: abuseType,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Mark abuse error:', error);
    return { error };
  }
};

/* --------------------------------------------------
   Subscribe to abuse DB
--------------------------------------------------- */

export const unsubscribeAbuseDB = (userID, callback) => {
  const q = query(abuseDBRef, where('source', '==', userID));

  return onSnapshot(q, snapshot => {
    const abuses = snapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: normalizeTimestamp(data.createdAt),
      };
    });

    callback && callback(abuses);
  });
};

/* --------------------------------------------------
   Unblock user
--------------------------------------------------- */

export const unblockUser = async (currentUserID, blockedUserID, callback) => {
  try {
    const q = query(
      abuseDBRef,
      where('source', '==', currentUserID),
      where('dest', '==', blockedUserID),
    );

    const snapshot = await getDocs(q);

    await Promise.all(snapshot.docs.map(d => deleteDoc(d.ref)));

    callback && callback(true);
  } catch (error) {
    console.error('Unblock user error:', error);
    callback && callback(false);
  }
};

/* --------------------------------------------------
   Hydrate reported users (FIXED)
--------------------------------------------------- */

export const hydrateAllReportedUsers = (userID, callback) => {
  const q = query(abuseDBRef, where('source', '==', userID));

  return onSnapshot(q, async snapshot => {
    try {
      const users = await Promise.all(
        snapshot.docs.map(async docSnap => {
          const blocked = docSnap.data();
          const userRef = doc(usersDBRef, blocked.dest);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) return null;

          const data = userSnap.data();

          return {
            id: userSnap.id,
            ...data,
            createdAt: normalizeTimestamp(data.createdAt),
            lastOnlineTimestamp: normalizeTimestamp(data.lastOnlineTimestamp),
          };
        }),
      );

      callback && callback(users.filter(Boolean));
    } catch (error) {
      console.error('Hydrate reported users error:', error);
    }
  });
};
