import Tag from './Tag';
import SpotlightCard from './effects/SpotlightCard';
import LiquidImage from './effects/LiquidImage';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

export default function ProjectCard({ project }) {
  return (
    <SpotlightCard as="article" className="group card overflow-hidden flex flex-col transition-all duration-300
                        hover:shadow-lift hover:-translate-y-1.5 hover:border-accent/40">
      {/* Image */}
      {project.image && (
        <LiquidImage
          src={project.image}
          alt={project.title}
          className="relative h-44 bg-surface-alt"
        />
      )}

      <div className="relative z-10 flex flex-1 flex-col gap-4 p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies?.map((tech, i) => (
            <Tag key={i}>{tech}</Tag>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-ink transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        </div>

        {/* Links */}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent
                         hover:text-accent-strong transition-colors"
            >
              Live demo <ArrowIcon />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted
                         hover:text-ink transition-colors"
            >
              <GitHubIcon /> Code
            </a>
          )}
          {project.figmaUrl && (
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted
                         hover:text-ink transition-colors"
            >
              Figma <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
