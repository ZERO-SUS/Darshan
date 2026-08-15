import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import SkillBlock from '../components/SkillBlock';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import Tag from '../components/Tag';
import SpotlightText from '../components/effects/SpotlightText';
import TextLift from '../components/effects/TextLift';
import Magnetic from '../components/effects/Magnetic';
import MeshTextHover from '../components/effects/MeshTextHover';
import TextMorph from '../components/effects/TextMorph';
import TextRoll from '../components/effects/TextRoll';
import Marquee from '../components/effects/Marquee';
import DitherReveal from '../components/effects/DitherReveal';
import SpotlightCard from '../components/effects/SpotlightCard';
import MagicBento from '../components/reactbits/MagicBento/MagicBento';
import RippleDistortion from '../components/reactbits/RippleDistortion/RippleDistortion';
import { asset } from '../lib/asset';
const FEATURED = [
  {
    title: 'Phish Guard',
    description: 'Detects email phishing in real time using an AI classification pipeline.',
    technologies: ['React', 'JavaScript', 'Cohere AI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Its-darshu/phishing-detector',
    image: asset('11.svg'),
  },
  {
    title: 'DarkSphere',
    description: 'A place to share dark-humour memes anonymously with the community.',
    technologies: ['React'],
    liveUrl: 'https://darksphere.vercel.app/',
    githubUrl: 'https://github.com/Its-darshu/DarkSphere',
    image: asset('darksphere.svg'),
  },
  {
    title: 'SmartQ',
    description: 'A platform to manage hospital queues effectively and cut waiting time.',
    technologies: ['React', 'Flask', 'Firebase'],
    liveUrl: 'https://smartq-patient.onrender.com/',
    githubUrl: 'https://github.com/dayanandaks4/HACTHON_SIT',
    image: asset('smartq.svg'),
  },
];

const STATS = [
  { value: '15+', label: 'Projects shipped' },
  { value: '1+ yr', label: 'On the web' },
  { value: '∞', label: 'Cups of chai' },
];

const MARQUEE = ['React', 'TypeScript', 'Tailwind', 'Figma', 'Framer Motion', 'Firebase', 'Flask', 'UI / UX', 'WebGL', 'Design'];

export default function Home() {
  const particleColor = '#18120f';
  const particleHighlight = '#ff5c14';

  return (
    <div className="w-full">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="aura absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full blur-3xl opacity-60 animate-float" />
          <div className="absolute bottom-0 left-[-5%] h-72 w-72 rounded-full bg-coral/20 blur-3xl" />
        </div>

        <div className="container-content flex min-h-[88vh] flex-col justify-center py-24">
          {/* Eyebrow row */}
          <Reveal>
            <div className="mb-10 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 border-b border-line pb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted sm:justify-between sm:gap-4">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for freelance
              </span>
              <span>Darshan — Front-end Developer &amp; Designer</span>
              <span>Bangalore, IND</span>
            </div>
          </Reveal>

          {/* Big statement headline */}
          <h1 className="font-display font-extrabold leading-[0.9] tracking-tight text-ink text-[9.5vw] md:text-[8vw] lg:text-[6.6vw]">
            <Reveal><span className="block"><TextLift text="Designing" /> &amp; building</span></Reveal>
            <Reveal delay={90}><span className="block text-gradient">digital experiences</span></Reveal>
            <Reveal delay={180}><MeshTextHover as="span" className="block">with craft &amp; taste.</MeshTextHover></Reveal>
          </h1>

          {/* Sub + CTA */}
          <Reveal delay={260}>
            <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-lg text-muted sm:text-xl">
                I’m a{' '}
                <span className="font-semibold text-ink">
                  <TextMorph words={['front-end developer', 'web designer', 'UI engineer', 'creative coder']} />
                </span>
                {' '}crafting responsive, modern websites where technology meets creativity.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button to="/projects" variant="liquid">
                    View my work
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button href={asset('Darshan-Resume.pdf')} variant="neon">Résumé</Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>

          {/* Scroll cue */}
          <Reveal delay={340}>
            <div className="mt-16 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="inline-block h-8 w-px animate-pulse bg-accent/70" />
              Scroll to explore
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== MARQUEE ===================== */}
      <section className="border-y border-line py-8">
        <Marquee items={MARQUEE} />
      </section>

      {/* ===================== SELECTED WORK ===================== */}
      <section className="container-content py-24 md:py-36">
        <Reveal>
          <SectionTitle
            warp
            eyebrow="Selected work"
            title="Projects I’m proud of"
            action={
              <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-strong transition-colors">
                View all
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            }
          />
        </Reveal>
        <div className="mt-14 border-t border-line">
          {FEATURED.map((project, i) => {
            const link = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : project.githubUrl;
            return (
              <Reveal key={project.title} delay={i * 80}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-b border-line py-8 transition-colors duration-300 hover:bg-ink/[0.03] sm:gap-6 md:py-10"
                >
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-3xl font-extrabold leading-none tracking-tight text-ink md:text-6xl">
                      <TextRoll text={project.title} />
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((t, k) => (
                        <Tag key={k}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                  <p className="hidden max-w-[15rem] text-sm text-muted lg:block">{project.description}</p>
                  <svg viewBox="0 0 24 24" className="h-7 w-7 flex-shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ===================== WHAT I DO (Magic Bento) ===================== */}
      <section className="container-content py-24 md:py-36">
        <Reveal><SectionTitle warp eyebrow="Capabilities" title="What I do" /></Reveal>
        <Reveal>
          <div className="mt-10 flex justify-center">
            <MagicBento glowColor="255, 92, 20" enableStars enableSpotlight enableBorderGlow enableTilt clickEffect enableMagnetism />
          </div>
        </Reveal>
      </section>

      {/* ===================== RIPPLE BAND (full-bleed, wide + big) ===================== */}
      <section className="py-12 md:py-16">
        <Reveal>
          <div
            data-cursor="hover"
            className="relative aspect-[1584/396] min-h-[150px] w-full overflow-hidden border-y border-line shadow-lift sm:min-h-0"
            onPointerMove={(e) => {
              const el = e.currentTarget;
              const r = el.getBoundingClientRect();
              el.style.setProperty('--mx', `${e.clientX - r.left}px`);
              el.style.setProperty('--my', `${e.clientY - r.top}px`);
              el.style.setProperty('--lens', '150px');
            }}
            onPointerLeave={(e) => e.currentTarget.style.setProperty('--lens', '0px')}
          >
            <RippleDistortion
              className="absolute inset-0"
              src={asset('cover.png')}
              tint="#ff5c14"
              tintAmount={0.16}
              highlightColor="#ffd0a8"
              grayscale={false}
              strength={0.24}
              swirl={1.1}
              rings={5}
              dispersion={0.3}
              trigger="hover"
              quality="medium"
            />

            {/* White "DARSHAN" wordmark that inverts to dark under the cursor lens */}
            <div className="dbrp-band" aria-hidden="true">
              <div className="dbrp-label">
                <span className="dbrp-label__text dbrp-label__base">DARSHAN</span>
              </div>
              <div className="dbrp-label dbrp-label__lens">
                <span className="dbrp-label__text dbrp-label__dark">DARSHAN</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================== SKILLS ===================== */}
      <section className="container-content py-24 md:py-36">
        <Reveal><SectionTitle warp eyebrow="Toolbox" title="Skills & tech" /></Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal><SkillBlock title="Languages" skills={[['TypeScript', 'JavaScript', 'Python', 'Lua', 'C']]} /></Reveal>
          <Reveal delay={80}><SkillBlock title="Frameworks" skills={[['React', 'Vue', 'Flask', 'FastAPI']]} /></Reveal>
          <Reveal delay={160}><SkillBlock title="Databases" skills={[['SQLite', 'PostgreSQL', 'MongoDB']]} /></Reveal>
          <Reveal><SkillBlock title="Cloud & DevOps" skills={[['AWS', 'Vercel', 'Netlify', 'Railway', 'Heroku', 'GitHub Actions', 'CI/CD', 'Docker']]} /></Reveal>
          <Reveal delay={80}><SkillBlock title="Design & UI/UX" skills={[['Figma', 'Tailwind CSS', 'Material-UI', 'Responsive Design', 'Adobe XD', 'Canva']]} /></Reveal>
          <Reveal delay={160}><SkillBlock title="Other" skills={[['HTML', 'CSS', 'REST', 'Jinja']]} /></Reveal>
          <Reveal className="sm:col-span-2 lg:col-span-3">
            <SkillBlock
              title="Tools"
              skills={[[
                'VS Code', 'Neovim', 'Cursor', 'Figma', 'Firebase Studio', 'Cloudflare', 'Cohere',
                'Devin', 'Docker', 'Flowith', 'Genspark', 'Google AI Studio', 'Canva', 'Locofy',
                'Lovable', 'Perplexity', 'Phase', 'Phind', 'bolt.new', 'PostHog', 'Replit', 'Rocket',
                'StackBlitz', 'WebContainers', 'Ollama', 'n8n', 'Automa', 'GitLab', 'Directus',
              ]]}
            />
          </Reveal>
        </div>
      </section>

      {/* ===================== ABOUT (compact, square image) ===================== */}
      <section className="container-content py-16 md:py-24">
        <Reveal><SectionTitle warp eyebrow="About me" title="Who I am" /></Reveal>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-[340px_1fr] lg:gap-14">
          {/* Square portrait card with liquid-distortion + spotlight */}
          <Reveal>
            <SpotlightCard className="card group relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden p-0">
              <div className="aura absolute inset-0 z-0 opacity-40" />
              <div className="absolute inset-0 z-0">
                <DitherReveal src={asset('darshan.png')} alt="Darshan" radius={180} />
              </div>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </SpotlightCard>
          </Reveal>

          {/* Text side */}
          <Reveal delay={120}>
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-4xl">
                Turning creativity &amp; code into{' '}
                <span className="text-gradient">websites that feel effortless.</span>
              </h3>
              <p className="max-w-xl leading-relaxed text-muted">
                I’m a self-taught front-end developer &amp; designer. For over a year I’ve helped
                clients establish their presence online — building responsive sites from scratch
                and chasing the newest tools. I care about clean design, smooth motion, and details.
              </p>

              <div className="grid max-w-md grid-cols-3 gap-4 border-y border-line py-5">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-3xl font-extrabold text-ink">{s.value}</div>
                    <div className="mt-1 text-xs text-muted">{s.label}</div>
                  </div>
                ))}
              </div>

              <Magnetic>
                <Button to="/about" variant="scan" className="w-fit">More about me</Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA (big editorial) ===================== */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="aura absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl" />
        </div>
        <div className="container-content text-center">
          <Reveal>
            <p className="eyebrow mb-6">Have a project in mind?</p>
          </Reveal>
          <Reveal delay={80}>
            <MeshTextHover
              text="Let’s build together"
              as="h2"
              force={36}
              className="font-extrabold leading-[0.95] tracking-tight text-accent text-[13vw] md:text-[9vw]"
            />
          </Reveal>
          <Reveal delay={160}>
            <a
              href="mailto:darshan99806@gmail.com"
              className="mt-4 inline-block font-display text-2xl font-bold tracking-tight text-ink md:text-4xl"
            >
              <MeshTextHover>darshan99806@gmail.com</MeshTextHover>
            </a>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Magnetic><Button to="/contact" variant="scan">Start a project</Button></Magnetic>
              <Magnetic><Button href={asset('Darshan-Resume.pdf')} variant="neon">Download résumé</Button></Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
