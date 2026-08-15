import { Helmet } from 'react-helmet-async';

export const useMetaTags = ({
  title,
  description,
  image,
  url,
  type = 'website',
  tags = []
}) => {
  if (!title) return null;

  const fullTitle = `${title} | Darshan`;
  const keywords = tags && tags.length > 0 ? tags.join(', ') : 'web design, full-stack developer, portfolio';

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Darshan" />
      
      {/* Open Graph tags (Facebook, LinkedIn, Instagram) */}
      <meta property="og:site_name" content="Darshan - Portfolio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Card tags (X) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
