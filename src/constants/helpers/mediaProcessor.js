import { Platform } from 'react-native';
import { Audio, Video } from 'react-native-compressor';
import { createThumbnail } from 'react-native-create-thumbnail';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import { v4 as uuidv4 } from 'uuid';

const BASE_DIR = `${RNFS.CachesDirectoryPath}/media-cache/`;

// Ensure directory exists
function ensureDirExists(dir) {
  return RNFS.exists(dir).then(exists => {
    if (!exists) return RNFS.mkdir(dir);
    return true;
  });
}

// -------------------------
// 📌 VIDEO COMPRESSION
// -------------------------
const compressVideo = sourceUri => {
  return ensureDirExists(BASE_DIR)
    .then(() => {
      if (Platform.OS === 'ios') return sourceUri;

      const processedUri = `${BASE_DIR}${uuidv4()}.mp4`;

      return Video.compress(
        sourceUri,
        { compressionMethod: 'auto', output: processedUri },
        progress => console.log('Compressing Video:', progress),
      ).then(() => processedUri);
    })
    .catch(err => {
      console.log('Error compressing video:', err);
      return sourceUri;
    });
};

// -------------------------
// 📌 CREATE THUMBNAIL
// -------------------------
const createThumbnailFromVideo = videoUri => {
  let processedUri = videoUri;
  if (Platform.OS === 'android' && !videoUri.startsWith('file://')) {
    processedUri = `file://${videoUri}`;
  }

  return createThumbnail({ url: processedUri })
    .then(res => res.path)
    .catch(err => {
      console.log('Thumbnail error:', err);
      return null;
    });
};

// -------------------------
// 📌 IMAGE RESIZE
// -------------------------
const resizeImage = (image, callback) => {
  const imagePath = image?.path || image?.uri;
  const processedUri = `${BASE_DIR}${uuidv4()}.jpg`;

  if (image?.height < 1100) {
    callback(processedUri); // keep UUID even if no resize
    return;
  }

  ImageResizer.createResizedImage(
    imagePath,
    1100,
    1100,
    'JPEG',
    100,
    0,
    BASE_DIR,
    false,
    { name: uuidv4() },
  )
    .then(newSource => callback(newSource.uri))
    .catch(err => {
      console.log('Image resize error:', err);
      callback(processedUri);
    });
};

// -------------------------
// 📌 AUDIO PROCESS (optional compression/rename)
// -------------------------
const processAudio = (audioUri, callback) => {
  ensureDirExists(BASE_DIR).then(() => {
    const processedUri = `${BASE_DIR}${uuidv4()}.mp3`; // or same extension as original
    // If you want to compress/convert audio, you can use Audio.compress
    Audio.compress(audioUri, { quality: 1, output: processedUri })
      .then(() => callback(processedUri))
      .catch(err => {
        console.log('Audio process error:', err);
        callback(processedUri);
      });
  });
};

// -------------------------
// 📌 MASTER FILE PROCESSOR
// -------------------------
export const processMediaFile = (file, callback) => {
  const { mime, type, uri, path } = file;
  const fileSource = uri || path;
  const isVideo = mime?.includes('video') || type?.includes('video');
  const isImage = mime?.includes('image') || type?.includes('image');
  const isAudio = mime?.includes('audio') || type?.includes('audio');

  if (isVideo) {
    compressVideo(fileSource)
      .then(processedUri =>
        createThumbnailFromVideo(processedUri).then(thumbnail =>
          callback({ processedUri, thumbnail }),
        ),
      )
      .catch(err => {
        console.log('Error processing video:', err);
        callback({ processedUri: fileSource });
      });
    return;
  }

  if (isImage) {
    resizeImage(file, processedUri => callback({ processedUri }));
    return;
  }

  if (isAudio) {
    processAudio(fileSource, processedUri => callback({ processedUri }));
    return;
  }

  callback({ processedUri: fileSource });
};

// -------------------------
// 📌 MERGE VIDEO + AUDIO
// -------------------------
export const blendVideoWithAudio = (
  { videoStream, audioStream, videoRate },
  callback,
) => {
  ensureDirExists(BASE_DIR).then(() => {
    const processedUri = `${BASE_DIR}${uuidv4()}.mp4`;
    Video.merge(videoStream, audioStream, {
      videoSpeed: videoRate || 1,
      output: processedUri,
    })
      .then(() => callback(processedUri))
      .catch(err => {
        console.log('Merge video/audio error:', err);
        callback(null);
      });
  });
};
