import { initializeApp, getApps, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin SDK
// This should only be imported and used on the server side (API Routes, Server Actions, getServerSideProps)

if (!getApps().length) {
  try {
    initializeApp({
      credential: applicationDefault(),
      // Optionally provide project ID if not inferred from environment
      // projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
export const adminStorage = getStorage();
