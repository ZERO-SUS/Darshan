import SectionTitle from '../components/SectionTitle';
import SkillBlock from '../components/SkillBlock';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import MeshTextHover from '../components/effects/MeshTextHover';
import DitherReveal from '../components/effects/DitherReveal';
import { asset } from '../lib/asset';

const funFacts = [
  'I like rainy days more than summer',
  'I love spending time with my dog',
  'I like biriyani and kababs',
  'I’ve been to Egypt, Poland and Turkey',
  'My favorite series is Breaking Bad',
  'I’m still in school',
  'Still single — but at least my RTX never leaves me.',
];

export default function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="aura absolute -top-24 left-10 h-80 w-80 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="container-content py-16 md:py-20 animate-fade-up">
          <p className="eyebrow mb-4">About me</p>
          <MeshTextHover
            as="h1"
            text="Nice to meet you"
            force={36}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05]"
          />
        </div>
      </section>

      {/* Bio + portrait */}
      <section className="container-content grid items-start gap-12 py-8 md:grid-cols-[1.3fr_1fr] md:py-12">
        <Reveal className="flex flex-col gap-5 text-muted leading-relaxed">
          <p className="text-lg text-ink">Hello, I’m Darshan!</p>
          <p>
            I’m a self-taught front-end developer based in Bangalore, India. I build
            responsive websites from scratch and turn them into modern, user-friendly
            web experiences.
          </p>
          <p>
            Transforming creativity and knowledge into websites has been my passion for
            over a year. I’ve helped various clients establish their presence online, and
            I’m always learning the newest technologies and frameworks.
          </p>
          <p>
            When I’m not coding, you’ll find me chasing clean UI, better animations, and
            the occasional dark-humour meme.
          </p>
          <div className="pt-2">
            <Button href={asset('Darshan-Resume.pdf')} variant="outline">Download résumé</Button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-xs">
            <div className="aspect-[3/4] overflow-hidden rounded-[2rem] border border-line bg-surface-alt shadow-lift">
              <DitherReveal src={asset('darshan.png')} alt="Darshan" radius={180} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="container-content py-12 md:py-16">
        <Reveal><SectionTitle warp eyebrow="Toolbox" title="Skills & technologies" /></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal><SkillBlock title="Languages" skills={[['TypeScript', 'JavaScript', 'Python', 'Lua', 'C']]} /></Reveal>
          <Reveal delay={80}><SkillBlock title="Frameworks" skills={[['React', 'Vue', 'Flask', 'FastAPI']]} /></Reveal>
          <Reveal delay={160}><SkillBlock title="Databases" skills={[['PostgreSQL', 'SQLite', 'MongoDB', 'Firebase']]} /></Reveal>
          <Reveal><SkillBlock title="Design & UI/UX" skills={[['Figma', 'Tailwind CSS', 'Responsive Design', 'Material UI', 'Adobe XD', 'Canva']]} /></Reveal>
          <Reveal delay={80}><SkillBlock title="Cloud & DevOps" skills={[['Vercel', 'Netlify', 'AWS', 'Railway', 'Docker', 'GitHub Actions', 'CI/CD']]} /></Reveal>
          <Reveal delay={160}><SkillBlock title="Tools & AI" skills={[['VS Code', 'Neovim', 'Cursor', 'Cohere', 'Ollama', 'n8n', 'PostHog']]} /></Reveal>
        </div>
      </section>

      {/* Fun facts */}
      <section className="container-content py-12 md:py-16">
        <Reveal><SectionTitle warp eyebrow="Off the clock" title="Fun facts" /></Reveal>
        <div className="mt-10 flex flex-wrap gap-4">
          {funFacts.map((fact, i) => (
            <Reveal key={i} delay={(i % 4) * 60}>
              <div className="card px-5 py-3 text-sm text-muted transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink">
                {fact}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
