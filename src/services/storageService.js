import { storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

/**
 * Upload a file blob to Firebase Storage
 * @param {Blob} blob - The file blob to upload
 * @param {string} path - The storage path (e.g., 'reels/user123_timestamp.mp4')
 * @param {function} onProgress - Callback for upload progress (%)
 * @returns {Promise<{downloadURL: string, error: string}>}
 */
export const uploadFile = (blob, path, onProgress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Calculate progress percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Storage Upload Error:", error);
        reject({ downloadURL: null, error: error.message });
      },
      async () => {
        // Upload completed successfully, get download URL
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ downloadURL, error: null });
        } catch (error) {
          reject({ downloadURL: null, error: error.message });
        }
      }
    );
  });
};
