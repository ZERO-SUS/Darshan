import { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import BlogPost from '../components/BlogPost';
import Reveal from '../components/Reveal';
import MeshTextHover from '../components/effects/MeshTextHover';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setBlogPosts(postsData);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="aura absolute -top-24 right-10 h-80 w-80 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="container-content py-16 md:py-20 animate-fade-up">
          <p className="eyebrow mb-4">Blog</p>
          <MeshTextHover
            as="h1"
            text="Thoughts & writing."
            force={36}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05]"
          />
          <p className="mt-4 max-w-xl text-muted">
            Notes on what I’m building, learning, and figuring out along the way.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="container-content py-8 md:py-12">
        <Reveal><SectionTitle warp eyebrow="Latest" title="Recent posts" /></Reveal>

        <div className="mt-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
              <p className="text-muted">Loading posts…</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <svg className="h-20 w-20 text-line" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-muted">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {blogPosts.map((post, i) => (
                <Reveal key={post.id} delay={(i % 4) * 70}>
                  <BlogPost post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-content py-12 md:py-16">
        <div className="card flex flex-col items-center gap-5 p-8 text-center md:p-12">
          <h3 className="text-2xl font-semibold text-ink">Subscribe to my newsletter</h3>
          <p className="max-w-md text-muted">
            Get notified when I publish new articles. No spam, unsubscribe anytime.
          </p>
          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none"
            />
            <button type="submit" className="btn-solid whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
