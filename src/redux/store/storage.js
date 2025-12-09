
import {createMMKV} from 'react-native-mmkv';

const storage = createMMKV()

export const token_storage = createMMKV({
  id: 'user_storage',
  encryptionKey: 'q8kU7eP2XjU7wPanr4rVzKX40vuhba7b',
});

const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default reduxStorage;