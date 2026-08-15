import { useState } from 'react';
import Reveal from '../components/Reveal';
import MeshTextHover from '../components/effects/MeshTextHover';
import { SOCIALS } from '../components/icons';

const EMAIL = 'darshan99806@gmail.com';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Darshan,\n\n${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const field =
    'w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 ' +
    'transition-colors focus:border-accent focus:outline-none';

  return (
    <div className="w-full">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="aura absolute -top-24 right-10 h-80 w-80 rounded-full blur-3xl opacity-60" />
        </div>
        <div className="container-content py-16 md:py-20 animate-fade-up">
          <p className="eyebrow mb-4">Contact</p>
          <MeshTextHover
            as="h1"
            text="Let’s talk."
            force={36}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05]"
          />
          <p className="mt-4 max-w-xl text-muted">
            I’m interested in freelance opportunities and collaborations. Have a question or
            just want to say hi? My inbox is always open.
          </p>
        </div>
      </section>

      <section className="container-content grid gap-10 py-8 md:grid-cols-[1fr_1.1fr] md:py-12">
        {/* Left — channels */}
        <Reveal className="flex flex-col gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="card flex items-center justify-between gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40"
          >
            <div>
              <p className="eyebrow mb-1">Email</p>
              <p className="text-ink">{EMAIL}</p>
            </div>
            <span className="text-accent">→</span>
          </a>

          <div className="card p-5">
            <p className="eyebrow mb-3">Find me online</p>
            <div className="flex gap-2">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={name}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <p className="eyebrow mb-2">Based in</p>
            <p className="text-ink">Bangalore, India</p>
            <p className="mt-1 text-sm text-muted">Working remotely, worldwide.</p>
          </div>
        </Reveal>

        {/* Right — form */}
        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="card flex flex-col gap-4 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-ink">Send a message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={field} name="name" placeholder="Your name" value={form.name} onChange={onChange} required />
              <input className={field} type="email" name="email" placeholder="Your email" value={form.email} onChange={onChange} />
            </div>
            <input className={field} name="subject" placeholder="Subject" value={form.subject} onChange={onChange} />
            <textarea className={`${field} resize-none`} name="message" rows="5" placeholder="Tell me about your project…" value={form.message} onChange={onChange} required />
            <button type="submit" className="btn-solid w-full sm:w-fit">
              Send message
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
            <p className="text-xs text-muted">
              This opens your email app with the message ready to send.
            </p>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
