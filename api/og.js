// Vercel Serverless Function to generate dynamic OG tags
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send('Blog post ID is required');
  }

  try {
    // Fetch blog post from Firestore
    const docRef = db.collection('posts').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send('Blog post not found');
    }

    const post = doc.data();
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://darsha.dev';
    const postUrl = `${baseUrl}/blog/${id}`;

    // Generate HTML with proper meta tags
    // Escape all user-provided content
function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

    const safeTitle = escapeHtml(post.title || '');
    const safeExcerpt = escapeHtml(post.excerpt || '');
    const safeImage = escapeHtml(post.image || `${baseUrl}/og-image.png`);
    const safePostUrl = escapeHtml(postUrl);
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>${safeTitle} | Darshan</title>
    <meta name="title" content="${safeTitle}">
    <meta name="description" content="${safeExcerpt}">
    
    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${safePostUrl}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeExcerpt}">
    <meta property="og:image" content="${safeImage}">
    <meta property="og:site_name" content="Darshan - Portfolio">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    
    <script>window.location.href = ${JSON.stringify(safePostUrl)};</script>    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${safePostUrl}">
    <meta property="twitter:title" content="${safeTitle}">
    <meta property="twitter:description" content="${safeExcerpt}">
    <meta property="twitter:image" content="${safeImage}">
    
    <!-- Redirect to actual blog post -->
    <meta http-equiv="refresh" content="0; url=${safePostUrl}">
    <script>window.location.href = '${safePostUrl}';</script>
</head>
<body>
    <p>Redirecting to <a href="${safePostUrl}">${safeTitle}</a>...</p>
</body>
</html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).send('Internal Server Error');
  }
}
