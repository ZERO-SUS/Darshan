import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import MeshTextHover from '../components/effects/MeshTextHover';
import { asset } from '../lib/asset';

const completeProjects = [
  {
    title: 'Phish Guard',
    description: 'Detect email phishing using an AI classification pipeline.',
    technologies: ['React', 'JavaScript', 'Cohere AI'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Its-darshu/phishing-detector',
    image: asset('11.svg'),
  },
  {
    title: 'DarkSphere',
    description: 'A place to share your dark-humour memes anonymously.',
    technologies: ['React'],
    liveUrl: 'https://darksphere.vercel.app/',
    githubUrl: 'https://github.com/Its-darshu/DarkSphere',
    image: asset('darksphere.svg'),
  },
  {
    title: 'Sullia Auto',
    description: 'A platform service to call an immediate auto in Sullia.',
    technologies: ['React'],
    liveUrl: 'https://sulliaauto.vercel.app/',
    githubUrl: 'https://github.com/Its-darshu/auto-rickshaw',
    image: asset('sullia-auto.svg'),
  },
  {
    title: 'SmartQ',
    description: 'A platform service to manage hospital queues effectively.',
    technologies: ['React', 'Flask', 'Firebase'],
    liveUrl: 'https://smartq-patient.onrender.com/',
    githubUrl: 'https://github.com/dayanandaks4/HACTHON_SIT',
    image: asset('smartq.svg'),
  },
  {
    title: 'AI Tutor',
    description: 'An AI assistant that generates text, voice, and images at the same time.',
    technologies: ['TypeScript', 'Flask', 'Gemini 2.5', 'HF Flux'],
    liveUrl: '',
    githubUrl: 'https://github.com/Its-darshu/Personal-Tutor',
    image: asset('aitutor.svg'),
  },
  {
    title: 'Visora',
    description: 'Powerful AI tools for text, image, voice, and audio processing.',
    technologies: ['TypeScript', 'Flask', 'Gemini 2.5 Pro', 'HF Flux'],
    liveUrl: '',
    githubUrl: 'https://github.com/Its-darshu/Visora',
    image: asset('visora.svg'),
  },
];

const smallProjects = [
  {
    title: 'Discord Quest',
    description:
      'A JavaScript script that auto-completes Discord quests by simulating game activity, video watching, or streaming.',
    technologies: ['JavaScript'],
    githubUrl: 'https://github.com/Its-darshu/discord-quest',
  },
];

export default function Projects() {
  return (
    <div className="w-full">
      {/* Page header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="aura absolute -top-24 right-10 h-80 w-80 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="container-content py-16 md:py-20 animate-fade-up">
          <p className="eyebrow mb-4">Portfolio</p>
          <MeshTextHover
            as="h1"
            text="Things I’ve built."
            force={36}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05]"
          />
          <p className="mt-4 max-w-xl text-muted">
            A selection of applications and experiments — from AI tools to community platforms.
          </p>
        </div>
      </section>

      {/* Complete apps */}
      <section className="container-content py-8 md:py-12">
        <Reveal>
          <SectionTitle warp eyebrow="Complete apps" title="Full applications" />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {completeProjects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Small projects */}
      <section className="container-content py-12 md:py-16">
        <Reveal>
          <SectionTitle warp eyebrow="Experiments" title="Small projects & scripts" />
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {smallProjects.map((project, i) => (
            <Reveal key={project.title} delay={i * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
