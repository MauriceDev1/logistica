import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session } = req.body;

  if (!session) {
    return res.status(401).json({ error: 'No session provided' });
  }

  try {
    // Verify the session cookie
    await admin.auth().verifySessionCookie(session, true);

    // Session is valid
    return res.status(200).json({ valid: true });
  } catch (error) {
    // Invalid session
    console.error('Session verification failed:', error);
    return res.status(401).json({ error: 'Invalid session' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
