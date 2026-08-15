import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  // Cloudinary config
  const CLOUDINARY_CLOUD_NAME = 'dg2rrya2l'; // token-migrated UI
  const CLOUDINARY_UPLOAD_PRESET = 'portfolio_blog';
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: '',
    readTime: 5,
  });

  // Check authentication on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        loadPosts();
      } else {
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success - onAuthStateChanged will handle the rest
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        setLoginError('Incorrect email or password');
      } else if (error.code === 'auth/user-not-found') {
        setLoginError('User not found. Please check your email');
      } else if (error.code === 'auth/invalid-email') {
        setLoginError('Invalid email format');
      } else {
        setLoginError('Login failed. Please try again');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('❌ Image too large! Maximum size is 50MB.');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('❌ Please upload an image file.');
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', 'blog');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData(prev => ({ ...prev, image: data.secure_url }));
        alert('✅ Image uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleContentImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImage(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // Check file size
        if (file.size > 50 * 1024 * 1024) {
          throw new Error(`${file.name} is too large (max 50MB)`);
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not an image`);
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'blog');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        
        if (!data.secure_url) {
          throw new Error('Upload failed');
        }

        return {
          url: data.secure_url,
          name: file.name
        };
      });

      const results = await Promise.all(uploadPromises);
      
      // Add to uploaded images list
      setUploadedImages(prev => [...prev, ...results]);
      
      alert(`✅ ${results.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const insertImageIntoContent = (imageUrl) => {
    const markdownImage = `\n\n![Image](${imageUrl})\n\n`;
    setFormData(prev => ({
      ...prev,
      content: prev.content + markdownImage
    }));
  };

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('✅ Image URL copied to clipboard!');
  };

  const handleNewPost = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      tags: '',
      readTime: 5,
    });
    setEditingPost(null);
    setUploadedImages([]);
    setShowEditor(true);
  };

  const handleEditPost = (post) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      tags: post.tags.join(', '),
      readTime: post.readTime,
    });
    setEditingPost(post.id);
    setUploadedImages([]);
    setShowEditor(true);
  };

  const handleSavePost = async () => {
    try {
      // Generate slug from first 2 words of title
      const generateSlug = (title) => {
        return title
          .toLowerCase()
          .split(' ')
          .slice(0, 2)
          .join('-')
          .replace(/[^a-z0-9-]/g, '') // Remove special characters
          + '-' + Date.now(); // Add timestamp to ensure uniqueness
      };

      const now = new Date();
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image: formData.image,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        readTime: parseInt(formData.readTime),
        date: now.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        time: now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        timestamp: Date.now()
      };

      if (editingPost) {
        // Update existing post
        const postRef = doc(db, 'posts', editingPost);
        await updateDoc(postRef, postData);
        alert('✅ Post updated successfully!');
      } else {
        // Create new post with custom slug ID
        const slug = generateSlug(formData.title);
        await setDoc(doc(db, 'posts', slug), postData);
        alert('✅ Post published successfully!');
      }

      // Reload posts
      await loadPosts();
      
      setShowEditor(false);
      setEditingPost(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        tags: '',
        readTime: 5,
      });
    } catch (error) {
      console.error('Error saving post:', error);
      alert('❌ Error saving post: ' + error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        alert('✅ Post deleted successfully!');
        await loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('❌ Error deleting post: ' + error.message);
      }
    }
  };

  // Login Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full border border-line p-8">
          <h1 className="text-ink text-3xl font-bold mb-6 flex items-start">
            <span className="text-accent">#</span>
            <span>admin-login</span>
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError('');
              }}
              placeholder="Email"
              className="border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/70 focus:outline-none focus:border-accent"
              required
              autoFocus
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError('');
              }}
              placeholder="Password"
              className="border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted/70 focus:outline-none focus:border-accent"
              required
            />
            
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/50 px-4 py-3 text-red-400 text-sm">
                ❌ {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="border border-accent px-6 py-3 text-ink font-medium hover:bg-accent/10 transition-colors"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => navigate('/blog')}
            className="mt-4 text-muted hover:text-ink transition-colors"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Editor Screen
  if (showEditor) {
    return (
      <div className="min-h-screen bg-bg px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-ink text-3xl font-bold flex items-start">
              <span className="text-accent">#</span>
              <span>{editingPost ? 'edit-post' : 'new-post'}</span>
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowEditor(false)}
                className="border border-line px-4 py-2 text-muted hover:text-ink transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                className="border border-accent px-6 py-2 text-ink font-medium hover:bg-accent/10 transition-colors"
              >
                Save Post
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="text-ink mb-2 block">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-line bg-surface px-4 py-2 text-ink focus:outline-none focus:border-accent"
                required
              />
            </div>

            <div>
              <label className="text-ink mb-2 block">Excerpt *</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                className="w-full border border-line bg-surface px-4 py-2 text-ink focus:outline-none focus:border-accent resize-none"
                required
              />
            </div>

            <div>
              <label className="text-ink mb-2 block">Content * (Markdown supported)</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="15"
                className="w-full border border-line bg-surface px-4 py-2 text-ink focus:outline-none focus:border-accent resize-y font-mono text-sm"
                required
              />
              <div className="mt-2 flex gap-2">
                <label className="border border-accent px-4 py-2 text-ink text-sm cursor-pointer hover:bg-accent/10 transition-colors relative">
                  {uploadingImage ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : (
                    '📷 Upload Images for Content'
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleContentImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
                <p className="text-muted text-xs flex items-center">Upload multiple images to insert in your content</p>
              </div>
            </div>

            {/* Uploaded Images Gallery */}
            {uploadedImages.length > 0 && (
              <div>
                <label className="text-ink mb-2 block">Uploaded Images ({uploadedImages.length})</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {uploadedImages.map((img, index) => (
                    <div key={index} className="border border-line p-2">
                      <img 
                        src={img.url} 
                        alt={img.name}
                        className="w-full h-32 object-cover mb-2"
                      />
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => insertImageIntoContent(img.url)}
                          className="text-accent hover:underline text-xs"
                        >
                          ➕ Insert in Content
                        </button>
                        <button
                          type="button"
                          onClick={() => copyImageUrl(img.url)}
                          className="text-muted hover:text-ink text-xs"
                        >
                          📋 Copy URL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-ink mb-2 block">Image</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Image URL or upload below"
                    className="w-full border border-line bg-surface px-4 py-2 text-ink focus:outline-none focus:border-accent"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex-1 border border-accent px-4 py-2 text-ink text-center cursor-pointer hover:bg-accent/10 transition-colors relative">
                      {uploadingImage ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </span>
                      ) : (
                        '📤 Upload Image'
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-muted text-xs">Max 50MB • JPG, PNG, GIF, WebP</p>
                </div>
              </div>

              <div>
                <label className="text-ink mb-2 block">Read Time (minutes)</label>
                <input
                  type="number"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full border border-line bg-surface px-4 py-2 text-ink focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="text-ink mb-2 block">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="React, JavaScript, WebDev"
                className="w-full border border-line bg-surface px-4 py-2 text-ink focus:outline-none focus:border-accent"
              />
            </div>

            {formData.image && (
              <div>
                <label className="text-ink mb-2 block">Image Preview</label>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="max-w-md border border-line"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-bg px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-ink text-3xl font-bold flex items-start">
            <span className="text-accent">#</span>
            <span>blog-dashboard</span>
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/blog')}
              className="border border-line px-4 py-2 text-muted hover:text-ink transition-colors"
            >
              View Blog
            </button>
            <button
              onClick={handleNewPost}
              className="border border-accent px-6 py-2 text-ink font-medium hover:bg-accent/10 transition-colors"
            >
              + New Post
            </button>
            <button
              onClick={handleLogout}
              className="border border-line px-4 py-2 text-muted hover:text-ink transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="border border-line p-12 text-center">
            <p className="text-muted text-lg mb-4">No blog posts yet</p>
            <button
              onClick={handleNewPost}
              className="border border-accent px-6 py-2 text-ink font-medium hover:bg-accent/10 transition-colors"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="border border-line p-6 flex items-start gap-6">
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-32 h-32 object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-ink text-xl font-medium mb-2">{post.title}</h3>
                  <p className="text-muted text-sm mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-muted text-sm mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                    <span>•</span>
                    <span>{post.tags.join(', ')}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="text-accent hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-muted hover:text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
