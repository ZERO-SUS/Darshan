# 📱 Social Media Sharing Guide

Your blog posts are now optimized for rich social media sharing with custom poster-like cards!

## ✅ What's Been Implemented

### 1. **Open Graph Meta Tags** (Facebook, LinkedIn, Instagram)
- `og:title` - Post title
- `og:description` - Post excerpt
- `og:image` - Post featured image
- `og:url` - Post URL
- `og:type` - Set to "article"

### 2. **Twitter Card Meta Tags** (X/Twitter)
- `twitter:card` - Set to "summary_large_image"
- `twitter:title` - Post title
- `twitter:description` - Post excerpt
- `twitter:image` - Post featured image

### 3. **Dynamic Meta Tags**
- Each blog post automatically updates its meta tags when loaded
- Uses the post's image, title, and excerpt
- Falls back to default site image if post has no image

## 🎨 Creating Your Default OG Image

You need to create a default Open Graph image at `public/og-image.png` with these specs:

### Image Requirements:
- **Size:** 1200 x 630 pixels (2:1 aspect ratio)
- **Format:** PNG or JPG
- **File size:** Under 8MB (ideally under 1MB)
- **Safe zone:** Keep important content within 1200 x 600px (center area)

### Design Suggestions:
```
┌─────────────────────────────────────────┐
│                                         │
│         Darshan                         │
│    Web Designer & Developer             │
│                                         │
│    [Your Logo or Photo]                 │
│                                         │
│    darsha.dev                           │
│                                         │
└─────────────────────────────────────────┘
```

### Recommended Tools:
1. **Canva** (canva.com) - Use their "Facebook Post" template (1200x630)
2. **Figma** (figma.com) - Create a 1200x630 frame
3. **Photoshop/GIMP** - Create custom design

## 🚀 How to Test Social Sharing

### 1. **Facebook & LinkedIn**
- Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Enter your blog post URL
- Click "Scrape Again" to refresh the cache
- Preview how it will look when shared

### 2. **Twitter/X**
- Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Enter your blog post URL
- Preview the card

### 3. **Instagram**
- Instagram doesn't show preview cards in posts
- But when someone shares your blog link in Stories, it will use the OG image

## 📋 How It Works

1. When someone visits a blog post, the `useMetaTags` hook runs
2. It dynamically updates the `<meta>` tags in the HTML `<head>`
3. Social media platforms read these tags when someone shares the link
4. They display a rich card with:
   - Post title
   - Post excerpt/description
   - Featured image (or default OG image)

## 🎯 Example Share URLs

Your share buttons already include:

**Twitter/X:**
```
https://twitter.com/intent/tweet?text=POST_TITLE&url=POST_URL
```

**LinkedIn:**
```
https://www.linkedin.com/sharing/share-offsite/?url=POST_URL
```

## 🔧 Customization

### To change the default OG image:
1. Create your image as `public/og-image.png`
2. Or update the fallback in `BlogPostDetail.jsx`:
   ```js
   image: post?.image || 'https://darsha.dev/og-image.png'
   ```

### To add your Twitter handle:
Update `index.html` and add:
```html
<meta name="twitter:site" content="@your_handle" />
<meta name="twitter:creator" content="@your_handle" />
```

## 📊 Image Best Practices

### For Blog Post Images:
- **Minimum size:** 1200 x 630px (will look good on all platforms)
- **Aspect ratio:** 1.91:1 (same as OG image)
- **Text readable:** If image has text, make it large and clear
- **High quality:** Use high-resolution images from Cloudinary

### When Uploading to Cloudinary:
- Your images are automatically optimized
- Use descriptive filenames
- Images will be used directly as OG images

## ✨ Result

When someone shares your blog post:
- **LinkedIn:** Shows as a professional article card
- **Facebook:** Shows as a rich media post
- **Twitter/X:** Shows as a large image card
- **Instagram Stories:** Uses the image when link is shared

The card will include:
- ✅ Eye-catching featured image
- ✅ Blog post title
- ✅ Engaging excerpt
- ✅ Your site branding

This makes your content much more likely to be clicked and shared! 🎉
