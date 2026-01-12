import * as firebaseSwipe from './swipes';
import * as reportingManager from './reportingManager';
import * as userAPIManager from './user';
import { loginUser } from '../../redux/slices/SessionUser';
import {
  setSwipes,
  setMatches,
  setIncomingSwipes,
  setSwipesListenerDidSubscribe,
} from '../../redux/slices/datingSlice';
import { setBannedUserIDs } from '../../redux/slices/userReportsSlice';
import { deepNormalize, normalizeObjectTimestamps } from '../../constants/helpers/helperFunction';
import { setUsers } from '../../redux/slices/usersTrackerSlice';

export default class SwipeTracker {
  constructor(reduxStore, userID) {
    this.reduxStore = reduxStore;
    this.userID = userID;
    this.recentSwipeAccounts = [];
    this.state = reduxStore.getState();
    this.reduxStore.subscribe(this.syncTrackerToStore);
  }

  syncTrackerToStore = () => {
    this.state = this.reduxStore.getState();
    this.users = this.state.usersTracker.users || [];
    
  };

  unMatchUser = (item, user) => {
    let id1 = user.id;
    let id2 = item.id;
    let channelId = id1 < id2 ? id1 + id2 : id2 + id1;
    let data = { id: channelId };
    firebaseSwipe.unmatchUser(item, user);
    // channelManager.deleteConversation(data, user)
    // this.hydrateSwipes()
  };
  subscribeIfNeeded = () => {
    const userId = this.userID;

    if (!this.state.dating.didSubscribeToSwipes) {
      this.reduxStore.dispatch(setSwipesListenerDidSubscribe());
      this.usersUnsubscribe = userAPIManager.subscribeUsers(
        this.onUsersCollection,
      );
      this.abusesUnsubscribe = reportingManager.unsubscribeAbuseDB(
        userId,
        this.onAbusesUpdate,
      );
      this.inboundSwipesUnsubscribe = firebaseSwipe.subscribeToInboundSwipes(
        userId,
        this.onInboundSwipesUpdate,
      );
      this.outboundSwipesUnsubscribe = firebaseSwipe.subscribeToOutboundSwipes(
        userId,
        this.onOutboundSwipesUpdate,
      );
    }
  };

  unsubscribe = () => {
    if (this.usersUnsubscribe) {
      this.usersUnsubscribe();
    }
    if (this.inboundSwipesUnsubscribe) {
      this.inboundSwipesUnsubscribe();
    }
    if (this.outboundSwipesUnsubscribe) {
      this.outboundSwipesUnsubscribe();
    }
    if (this.abusesUnsubscribe) {
      this.abusesUnsubscribe();
    }
  };

  removeSwipe = (swipeProfileId, userID) => {
    firebaseSwipe.removeSwipe(swipeProfileId, userID);
    this.recentSwipeAccounts = this.recentSwipeAccounts.filter(swipeAccount => {
      const swipeAcountId = swipeAccount.id || swipeAccount.userID;

      return swipeAcountId !== swipeProfileId;
    });
  };

  addSwipe = (fromUser, toUser, type, callback) => {
    const swipes = this.state.dating.swipes;
    const detectedSwipe = swipes.find(swipe => swipe.id == toUser.id);

    this.addToRecentSwipesIfNeeded(toUser);

    if (detectedSwipe) {
      // invalid state - current user already swiped on toUser
      return;
    }

    firebaseSwipe.addSwipe(fromUser.id, toUser.id, type, response => {
      callback(response);
    });
  };

  addToRecentSwipesIfNeeded = newSwipeAccount => {
    const detectedSwipe = this.recentSwipeAccounts.find(swipeAccount => {
      const swipeAcountId = swipeAccount.id || swipeAccount.userID;
      const newSwipeAccountId = newSwipeAccount.id == newSwipeAccount.userID;

      return swipeAcountId === newSwipeAccountId;
    });

    if (!detectedSwipe) {
      this.recentSwipeAccounts = [...this.recentSwipeAccounts, newSwipeAccount];
    }
  };

  markSwipeAsSeen = (fromUser, toUser) => {
    firebaseSwipe.markSwipeAsSeen(fromUser.id, toUser.id);
  };

  updateUsers = users => {
  const state = this.reduxStore.getState();
  const bannedUserIDs = state.userReports.bannedUserIDs;

  const filteredUsers = bannedUserIDs
    ? users.filter(user => !bannedUserIDs.includes(user.id))
    : users;

  const serializedUsers = filteredUsers.map(deepNormalize);

  this.users = serializedUsers;

  this.reduxStore.dispatch(setUsers(serializedUsers));

  this.hydrateSwipes();
};

  onUsersCollection = data => {
    this.updateUsers(data);
  };

  onAbusesUpdate = abuses => {
    var bannedUserIDs = [];
    abuses.forEach(abuse => bannedUserIDs.push(abuse.dest));
    this.reduxStore.dispatch(setBannedUserIDs(bannedUserIDs));
    this.bannedUserIDs = bannedUserIDs;
    console.log('hydrateSwipes called from onAbusesUpdate');
    this.hydrateSwipes();
  };

  onInboundSwipesUpdate = inboundSwipes => {
    this.inboundSwipes = inboundSwipes;
    this.hydrateSwipes();
  };

  onOutboundSwipesUpdate = outboundSwipes => {
    this.outboundSwipes = outboundSwipes;
    console.log('hydrateSwipes called from onOutboundSwipesUpdate');
    this.hydrateSwipes();
  };

  hydrateSwipes() {
    const inboundSwipes = this.inboundSwipes;
    const outboundSwipes = this.outboundSwipes;
    const hydratedUsers = this.users;

    if (
      hydratedUsers &&
      hydratedUsers.length > 0 &&
      this.inboundSwipes &&
      this.outboundSwipes &&
      this.bannedUserIDs
    ) {
      // we received all the data we need - users, inbound requests, outbound requests
      const outboundUserIDs = {};

      outboundSwipes.forEach(swipe => {
        outboundUserIDs[swipe.swipedProfile] = true;
      });
      const inboundUserIDs = {};
      const inboundUserIDsSeenStatus = {};

      inboundSwipes.forEach(swipe => {
        inboundUserIDs[swipe.author] = true;
        inboundUserIDsSeenStatus[swipe.author] = swipe.hasBeenSeen;
      });
      // We remove all friends and friendships from banned users
      const bannedUserIDs = this.bannedUserIDs;
      const swipes = hydratedUsers
        .filter(user => outboundUserIDs[user.id] == true)
        .filter(swipe => !bannedUserIDs.includes(swipe.id));
      const incomingSwipes = hydratedUsers
        .filter(user => inboundUserIDs[user.id] == true)
        .filter(swipe => !bannedUserIDs.includes(swipe.id));
      const hydratedMatches = hydratedUsers.filter(
        user =>
          outboundUserIDs[user.id] == true && inboundUserIDs[user.id] == true,
      );
      const finalMatches = hydratedMatches
        .filter(match => !bannedUserIDs.includes(match.id))
        .map(user => {
          return {
            ...user,
            matchHasBeenSeen: inboundUserIDsSeenStatus[user.id],
          };
        });
      this.reduxStore.dispatch(setMatches(finalMatches.map(deepNormalize)));
      this.reduxStore.dispatch(setIncomingSwipes(incomingSwipes.map(deepNormalize)));
      this.reduxStore.dispatch(setSwipes(swipes.map(deepNormalize)));
    }
  }

  getUserSwipeCount = async userID => {
    return firebaseSwipe.getUserSwipeCount(userID);
  };

  updateUserSwipeCount = async (userID, count) => {
    return firebaseSwipe.updateUserSwipeCount(userID, count);
  };
}

// import * as firebaseSwipe from './swipes'
// import * as reportingManager from './reportingManager'
// import * as userAPIManager from './user'
// import { loginUser } from '../../redux/slices/SessionUser'
// import {
//   setSwipes,
//   setMatches,
//   setIncomingSwipes,
//   setSwipesListenerDidSubscribe,
// } from '../../redux/slices/datingSlice'
// import { setBannedUserIDs } from '../../redux/slices/userReportsSlice'

// export default class SwipeTracker {
//   constructor(reduxStore, userID) {
//     this.reduxStore = reduxStore
//     this.userID = userID

//     this.recentSwipeAccounts = []
//     this.users = []
//     this.inboundSwipes = null
//     this.outboundSwipes = null
//     this.bannedUserIDs = []

//     this.unsubscribeStore = reduxStore.subscribe(this.syncTrackerToStore)
//     this.state = reduxStore.getState()
//   }

//   /* ---------------- STORE SYNC ---------------- */

//   syncTrackerToStore = () => {
//     this.state = this.reduxStore.getState()
//     this.users = this.state.users?.users || []
//     this.bannedUserIDs = this.state.userReports?.bannedUserIDs || []
//   }

//   /* ---------------- SUBSCRIPTIONS ---------------- */

//   subscribeIfNeeded = () => {
//     if (this.state.dating.didSubscribeToSwipes) return

//     this.reduxStore.dispatch(setSwipesListenerDidSubscribe())

//     this.usersUnsubscribe = userAPIManager.subscribeUsers(
//       this.onUsersCollection,
//     )

//     this.abusesUnsubscribe = reportingManager.unsubscribeAbuseDB(
//       this.userID,
//       this.onAbusesUpdate,
//     )

//     this.inboundSwipesUnsubscribe = firebaseSwipe.subscribeToInboundSwipes(
//       this.userID,
//       this.onInboundSwipesUpdate,
//     )

//     this.outboundSwipesUnsubscribe = firebaseSwipe.subscribeToOutboundSwipes(
//       this.userID,
//       this.onOutboundSwipesUpdate,
//     )
//   }

//   unsubscribe = () => {
//     this.usersUnsubscribe?.()
//     this.inboundSwipesUnsubscribe?.()
//     this.outboundSwipesUnsubscribe?.()
//     this.abusesUnsubscribe?.()
//     this.unsubscribeStore?.()
//   }

//   /* ---------------- ACTIONS ---------------- */

//   unMatchUser = (item, user) => {
//     firebaseSwipe.unmatchUser(item, user)
//   }

//   removeSwipe = (swipeProfileId, userID) => {
//     firebaseSwipe.removeSwipe(swipeProfileId, userID)

//     this.recentSwipeAccounts = this.recentSwipeAccounts.filter(acc => {
//       const id = acc.id || acc.userID
//       return id !== swipeProfileId
//     })
//   }

//   addSwipe = (fromUser, toUser, type, callback) => {
//     const swipes = this.state.dating.swipes || []

//     if (swipes.some(s => s.id === toUser.id)) return

//     this.addToRecentSwipesIfNeeded(toUser)

//     firebaseSwipe.addSwipe(fromUser.id, toUser.id, type, callback)
//   }

//   addToRecentSwipesIfNeeded = newAccount => {
//     const newId = newAccount.id || newAccount.userID

//     const exists = this.recentSwipeAccounts.some(acc => {
//       const accId = acc.id || acc.userID
//       return accId === newId
//     })

//     if (!exists) {
//       this.recentSwipeAccounts.push(newAccount)
//     }
//   }

//   markSwipeAsSeen = (fromUser, toUser) => {
//     firebaseSwipe.markSwipeAsSeen(fromUser.id, toUser.id)
//   }

//   /* ---------------- DATA UPDATES ---------------- */

//   updateUsers = users => {
//     const filteredUsers = users.filter(
//       u => !this.bannedUserIDs.includes(u.id),
//     )

//     this.users = filteredUsers

//     // FIX: loginUser expects { user }
//     this.reduxStore.dispatch(loginUser({ user: filteredUsers }))

//     this.hydrateSwipes()
//   }

//   onUsersCollection = users => {
//     this.updateUsers(users)
//   }

//   onAbusesUpdate = abuses => {
//     const bannedUserIDs = abuses.map(a => a.dest)

//     this.reduxStore.dispatch(setBannedUserIDs(bannedUserIDs))
//     this.bannedUserIDs = bannedUserIDs

//     this.hydrateSwipes()
//   }

//   onInboundSwipesUpdate = inboundSwipes => {
//     this.inboundSwipes = inboundSwipes
//     this.hydrateSwipes()
//   }

//   onOutboundSwipesUpdate = outboundSwipes => {
//     this.outboundSwipes = outboundSwipes
//     this.hydrateSwipes()
//   }

//   /* ---------------- HYDRATION ---------------- */

//   hydrateSwipes() {
//     if (
//       !this.users?.length ||
//       !this.inboundSwipes ||
//       !this.outboundSwipes
//     ) {
//       return
//     }

//     const outboundMap = {}
//     const inboundMap = {}
//     const inboundSeenMap = {}

//     this.outboundSwipes.forEach(s => {
//       outboundMap[s.swipedProfile] = true
//     })

//     this.inboundSwipes.forEach(s => {
//       inboundMap[s.author] = true
//       inboundSeenMap[s.author] = s.hasBeenSeen
//     })

//     const swipes = this.users.filter(
//       u => outboundMap[u.id] && !this.bannedUserIDs.includes(u.id),
//     )

//     const incomingSwipes = this.users.filter(
//       u => inboundMap[u.id] && !this.bannedUserIDs.includes(u.id),
//     )

//     const matches = this.users
//       .filter(u => outboundMap[u.id] && inboundMap[u.id])
//       .filter(u => !this.bannedUserIDs.includes(u.id))
//       .map(u => ({
//         ...u,
//         matchHasBeenSeen: inboundSeenMap[u.id],
//       }))

//     this.reduxStore.dispatch(setSwipes(swipes))
//     this.reduxStore.dispatch(setIncomingSwipes(incomingSwipes))
//     this.reduxStore.dispatch(setMatches(matches))
//   }

//   /* ---------------- COUNTERS ---------------- */

//   getUserSwipeCount = userID => {
//     return firebaseSwipe.getUserSwipeCount(userID)
//   }

//   updateUserSwipeCount = (userID, count) => {
//     return firebaseSwipe.updateUserSwipeCount(userID, count)
//   }
// }
