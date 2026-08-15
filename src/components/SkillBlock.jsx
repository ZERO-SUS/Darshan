import Tag from './Tag';
import SpotlightCard from './effects/SpotlightCard';

export default function SkillBlock({ title, skills, className = '' }) {
  return (
    <SpotlightCard
      className={`card p-5 flex flex-col gap-4 h-fit transition-all duration-300
                  hover:shadow-lift hover:-translate-y-1 ${className}`}
    >
      <h3 className="relative z-10 text-sm font-semibold text-ink flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {title}
      </h3>
      <div className="relative z-10 flex flex-wrap gap-2">
        {skills.flat().map((skill, index) => (
          <Tag key={index}>{skill}</Tag>
        ))}
      </div>
    </SpotlightCard>
  );
}
