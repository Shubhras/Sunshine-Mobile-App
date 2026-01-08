// firebase/firebaseStorage.js
// import { storage } from './config';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { processMediaFile } from '../../constants/helpers/mediaProcessor';
import { ErrorCode } from '../../utils/ErrorCode';
import { v4 as uuidv4 } from 'uuid';
// import { utils } from '@react-native-firebase/app';
import storage, { TaskEvent, TaskState } from '@react-native-firebase/storage';
import { Platform } from 'react-native';
const storageRef = storage().ref();

const getBlob = async uri => {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(new Error('Failed to fetch blob'));
    xhr.responseType = 'blob';
    xhr.open('GET', uri.startsWith('file://') ? uri : 'file://' + uri, true);
    xhr.send(null);
  });
};

// const uploadFile = async (processedUri, callbackProgress) => {
//   if (!processedUri) return Promise.reject(new Error('Invalid file URI'));
//   let finished = false;
//   const filename = `${uuidv4()}_${processedUri.substring(
//     processedUri.lastIndexOf('/') + 1,
//   )}`;
//   const blob = await getBlob(processedUri).catch(() => null);
//   const fileRef = storageRef.child(filename);
//   const uploadTask = fileRef.put(blob);
//   return new Promise((resolve, reject) => {
//     uploadTask.on(
//       TaskEvent.STATE_CHANGED,
//       snapshot => {
//         if (snapshot.state == TaskState.SUCCESS) {
//           if (finished == true) {
//             return;
//           }
//           finished = true;
//         }
//         callbackProgress && callbackProgress(snapshot);
//       },
//       error => {
//         reject(error);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
//           resolve(downloadURL);
//         });
//       },
//     );
//   });
// };
const normalizePath = uri => {
  if (!uri) return null;
  if (Platform.OS === 'android' && !uri.startsWith('file://')) {
    return `file://${uri}`;
  }
  return uri;
};
const uploadFile = async (processedUri, callbackProgress) => {
  if (!processedUri) {
    throw new Error('Invalid file URI');
  }

  const fileUri = normalizePath(processedUri);
  const originalName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
  const filename = `${uuidv4()}_${originalName}`;

  const fileRef = storage().ref(filename);
  const uploadTask = fileRef.putFile(fileUri);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        callbackProgress?.({
          bytesTransferred: snapshot.bytesTransferred,
          totalBytes: snapshot.totalBytes,
          progress:
            snapshot.totalBytes > 0
              ? snapshot.bytesTransferred / snapshot.totalBytes
              : 0,
          state: snapshot.state,
        });
      },
      error => reject(error),
      async () => {
        const downloadURL = await fileRef.getDownloadURL();
        resolve(downloadURL);
      },
    );
  });
};

export const processAndUploadMediaFileWithProgressTracking = (
  file,
  callbackProgress,
  callbackSuccess,
  callbackError,
) => {
  processMediaFile(file, ({ processedUri, thumbnail }) => {
    uploadFile(processedUri, callbackProgress)
      .then(downloadURL => {
        if (thumbnail) {
          uploadFile(thumbnail, callbackProgress)
            .then(thumbnailURL => callbackSuccess(downloadURL, thumbnailURL))
            .catch(callbackError);
          return;
        }
        callbackSuccess(downloadURL);
      })
      .catch(callbackError);
  });
};

export const processAndUploadMediaFile = file => {
  return new Promise((resolve, _reject) => {
    processMediaFile(file, ({ processedUri, thumbnail }) => {
      console.log("processedUri", processedUri);
      console.log("thumbnail", thumbnail);

      uploadFile(processedUri)
        .then(downloadURL => {
          if (thumbnail) {
            uploadFile(thumbnail)
              .then(thumbnailURL => {
                resolve({ downloadURL, thumbnailURL })
              })
              .catch(() => resolve({ error: ErrorCode.photoUploadFailed }))

            return
          }
          resolve({ downloadURL })
        })
        .catch(() => resolve({ error: ErrorCode.photoUploadFailed }))
    })
  })
}

export default {
  processAndUploadMediaFile,
  processAndUploadMediaFileWithProgressTracking,
};
