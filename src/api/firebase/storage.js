// firebase/firebaseStorage.js
import { storage } from './config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { processMediaFile } from '../../constants/helpers/mediaProcessor';
import { ErrorCode } from '../../utils/ErrorCode';
import { v4 as uuidv4 } from 'uuid';

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

const uploadFile = async (processedUri, callbackProgress) => {
  if (!processedUri) return Promise.reject(new Error('Invalid file URI'));

  const filename = `${uuidv4()}_${processedUri.substring(
    processedUri.lastIndexOf('/') + 1,
  )}`;
  const blob = await getBlob(processedUri).catch(() => null);

  if (!blob) return Promise.reject({ code: ErrorCode.photoUploadFailed });

  const fileRef = ref(storage, filename);
  const uploadTask = uploadBytesResumable(fileRef, blob);

  return new Promise((resolve, reject) => {
    let finished = false;

    uploadTask.on(
      'state_changed',
      snapshot => callbackProgress && callbackProgress(snapshot),
      error => reject(error),
      async () => {
        if (finished) return;
        finished = true;
        const downloadURL = await getDownloadURL(fileRef).catch(() =>
          reject({ code: ErrorCode.photoUploadFailed }),
        );
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

export const processAndUploadMediaFile = async file => {
  return new Promise(resolve => {
    processMediaFile(file, async ({ processedUri, thumbnail }) => {
      try {
        const downloadURL = await uploadFile(processedUri);

        if (thumbnail) {
          try {
            const thumbnailURL = await uploadFile(thumbnail);
            resolve({ downloadURL, thumbnailURL });
          } catch {
            resolve({ downloadURL, error: ErrorCode.photoUploadFailed });
          }
          return;
        }

        resolve({ downloadURL });
      } catch {
        resolve({ error: ErrorCode.photoUploadFailed });
      }
    });
  });
};

export default {
  processAndUploadMediaFile,
  processAndUploadMediaFileWithProgressTracking,
};
