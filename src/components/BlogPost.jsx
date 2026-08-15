import { useNavigate } from 'react-router-dom';
import Tag from './Tag';

export default function BlogPost({ post }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/blog/${post.id}`);

  return (
    <article
      onClick={handleClick}
      className="card group flex w-full cursor-pointer flex-col overflow-hidden
                 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40
                 hover:shadow-lift md:flex-row"
    >
      {/* Image */}
      {post.image && (
        <div className="h-48 w-full flex-shrink-0 overflow-hidden bg-surface-alt md:h-auto md:w-72">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="line-clamp-1 text-xl font-semibold text-ink transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {post.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-shrink-0 items-center gap-3 border-t border-line p-6 text-sm
                      text-muted md:w-44 md:flex-col md:items-end md:justify-start md:border-l md:border-t-0">
        <div className="md:text-right">
          <div className="font-medium text-ink">{post.date}</div>
          {post.time && <div className="mt-1 text-xs text-accent">{post.time}</div>}
          <div className="mt-1 text-xs">{post.readTime} min read</div>
        </div>
      </div>
    </article>
  );
}
