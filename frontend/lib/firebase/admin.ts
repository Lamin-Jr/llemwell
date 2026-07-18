import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// This should only be imported and used on the server side (API Routes, Server Actions, getServerSideProps)

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // Optionally provide project ID if not inferred from environment
      // projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();
