import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  writeBatch,
  serverTimestamp,
  onSnapshot,
  setDoc,
} from '@react-native-firebase/firestore';

/* --------------------------------------------------
   Firestore References
--------------------------------------------------- */

const db = getFirestore();

const usersRef = collection(db, 'users');
const swipesRef = collection(db, 'swipes');
const swipeCountRef = collection(db, 'swipe_counts');

/* --------------------------------------------------
   Helpers
--------------------------------------------------- */

const onCollectionUpdate = (snapshot, callback) => {
  const data = snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
  callback(data);
};

/* --------------------------------------------------
   Subscriptions
--------------------------------------------------- */

export const subscribeToInboundSwipes = (userId, callback) => {
  const q = query(swipesRef, where('swipedProfile', '==', userId), where('otherSwipe', '==', false));
  return onSnapshot(q, snapshot => onCollectionUpdate(snapshot, callback));
};

export const subscribeToOutboundSwipes = (userId, callback) => {
  const q = query(swipesRef, where('author', '==', userId), where('authorSwipe', '==', false));
  return onSnapshot(q, snapshot => onCollectionUpdate(snapshot, callback));
};

/* --------------------------------------------------
   Swipe Actions
--------------------------------------------------- */

export const addSwipe = async (fromUserID, toUserID, type) => {
  try {
    await addDoc(swipesRef, {
      author: fromUserID,
      swipedProfile: toUserID,
      type,
      hasBeenSeen: false,
      createdAt: serverTimestamp(),
      authorSwipe: false,
      otherSwipe: false,
    });
    return { success: true };
  } catch (error) {
    console.error('Add swipe error:', error);
    return { error };
  }
};

export const removeSwipe = async (swipeProfileId, userID) => {
  const q = query(swipesRef, where('swipedProfile', '==', swipeProfileId), where('author', '==', userID));
  const snapshot = await getDocs(q);

  const batch = writeBatch(db);
  snapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
  await batch.commit();
};

export const unmatchUser = async (item, user) => {
  try {
    const q = query(swipesRef, where('swipedProfile', '==', item.id), where('author', '==', user.id));
    const snapshot = await getDocs(q);

    const batch = writeBatch(db);
    snapshot.docs.forEach(docSnap => batch.update(docSnap.ref, { authorSwipe: true }));
    await batch.commit();

    return { status: 'success' };
  } catch (error) {
    console.error('Unmatch error:', error);
    return { status: 'error', error };
  }
};

export const markSwipeAsSeen = async (fromUserID, toUserID) => {
  const q = query(swipesRef, where('author', '==', fromUserID), where('swipedProfile', '==', toUserID));
  const snapshot = await getDocs(q);

  const batch = writeBatch(db);
  snapshot.docs.forEach(docSnap => batch.update(docSnap.ref, { hasBeenSeen: true }));
  await batch.commit();
};

/* --------------------------------------------------
   Swipe Count
--------------------------------------------------- */

export const getUserSwipeCount = async userID => {
  try {
    const ref = doc(db, 'swipe_counts', userID);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error('Get swipe count error:', error);
    return null;
  }
};

export const updateUserSwipeCount = async (userID, count) => {
  const ref = doc(db, 'swipe_counts', userID);
  const data = { authorID: userID, count };
  if (count === 1) data.createdAt = serverTimestamp();

  try {
    await setDoc(ref, data, { merge: true });
  } catch (error) {
    console.error('Update swipe count error:', error);
  }
};

/* --------------------------------------------------
   Numerology Match
--------------------------------------------------- */

export const numMatch = async (userID, numerologyNumber) => {
  if (numerologyNumber == null) throw new Error('Invalid numerology number');

  try {
    const q = query(usersRef, where('numerologyNumber', '==', numerologyNumber));
    const snapshot = await getDocs(q);

    const users = snapshot.docs
      .filter(docSnap => docSnap.id !== userID)
      .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));

    return { status: 'success', users };
  } catch (error) {
    console.error('Numerology match error:', error);
    return { status: 'error', error };
  }
};
