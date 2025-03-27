import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(req: NextRequest) {
  // Parse the request body
  const body = await req.json();
  const { session } = body;

  if (!session) {
    return NextResponse.json({ error: 'No session provided' }, { status: 401 });
  }

  try {
    // Verify the session cookie
    await admin.auth().verifySessionCookie(session, true);

    // Session is valid
    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    // Invalid session
    console.error('Session verification failed:', error);
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }
}
