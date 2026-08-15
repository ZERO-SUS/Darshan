import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useMetaTags } from '../hooks/useMetaTags.jsx';
import Tag from '../components/Tag';

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadPost = async () => {
    try {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        setPost(null);
      }
    } catch (error) {
      console.error('Error loading post:', error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="mb-3 text-3xl font-semibold text-ink">Post not found</h1>
          <p className="mb-6 text-muted">The blog post you’re looking for doesn’t exist.</p>
          <button onClick={() => navigate('/blog')} className="btn-outline">
            ← Back to blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {useMetaTags({
        title: post.title,
        description: post.excerpt,
        image: post.image || 'https://darsha.dev/og-image.png',
        url: `${window.location.origin}/blog/${id}`,
        type: 'article',
        tags: post.tags || [],
      })}

      <article className="mx-auto max-w-3xl px-6 py-12 md:px-8">
        <button
          onClick={() => navigate('/blog')}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </button>

        {/* Meta */}
        <div className="mb-6 flex items-center gap-3 font-mono text-xs text-muted">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-line" />
          <span>{post.readTime} min read</span>
        </div>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
          {post.title}
        </h1>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        )}

        {post.image && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <img
              src={post.image}
              alt={post.title}
              className="max-h-[500px] w-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        )}

        <div className="my-8 h-px w-full bg-line" />

        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        <div className="my-12 h-px w-full bg-line" />

        {/* Share */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-ink">Share this post</p>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${window.location.origin}/blog/${id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/blog/${id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <button onClick={() => navigate('/blog')} className="btn-outline">
            ← More posts
          </button>
        </div>
      </article>
    </div>
  );
}
