import { useEffect, useState } from 'react';

type FadeInProps = {
  children: React.ReactNode;
  delay: number;
  duration: number;
  className?: string;
};

function FadeIn({ children, delay, duration, className = '' }: FadeInProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
}

type AnimatedHeadingProps = {
  text: string;
  initialDelay?: number;
  charDelay?: number;
  duration?: number;
  className?: string;
};

function AnimatedHeading({
  text,
  initialDelay = 200,
  charDelay = 30,
  duration = 500,
  className = ''
}: AnimatedHeadingProps) {
  const [started, setStarted] = useState(false);
  const lines = text.split('\n');

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  return (
    <h1
      className={className}
      style={{ letterSpacing: '-0.04em' }}
      aria-label={text.replace('\n', ' ')}
    >
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;
        return (
          <span key={`${line}-${lineIndex}`} className="block">
            {line.split('').map((char, charIndex) => {
              const delay =
                lineIndex * lineLength * charDelay + charIndex * charDelay;

              return (
                <span
                  key={`${char}-${lineIndex}-${charIndex}`}
                  className="inline-block"
                  style={{
                    opacity: started ? 1 : 0,
                    transform: started ? 'translateX(0)' : 'translateX(-18px)',
                    transitionProperty: 'opacity, transform',
                    transitionDelay: `${delay}ms`,
                    transitionDuration: `${duration}ms`
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

const navLinks = ['Story', 'Investing', 'Building', 'Advisory'];

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white font-sans">
      {/* Video layer intentionally omitted per request. */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-6 pt-6 md:px-12 lg:px-16">
          <nav className="liquid-glass flex items-center justify-between rounded-xl px-4 py-2">
            <div className="text-2xl font-semibold tracking-tight">VEX</div>

            <div className="hidden items-center gap-8 text-sm md:flex">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="transition-colors duration-300 hover:text-gray-300"
                >
                  {item}
                </a>
              ))}
            </div>

            <button className="rounded-lg bg-white px-6 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-gray-100">
              Start a Chat
            </button>
          </nav>
        </header>

        <section className="flex flex-1 flex-col justify-end px-6 pb-12 md:px-12 lg:px-16 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            <div>
              <AnimatedHeading
                text={'Shaping tomorrow\nwith vision and action.'}
                className="mb-4 text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
              />

              <FadeIn delay={800} duration={1000}>
                <p className="mb-5 max-w-2xl text-base text-gray-300 md:text-lg">
                  We back visionaries and craft ventures that define what comes
                  next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors duration-300 hover:bg-gray-100">
                    Start a Chat
                  </button>
                  <button className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-white hover:text-black">
                    Explore Now
                  </button>
                </div>
              </FadeIn>
            </div>

            <div className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
                  <p className="text-lg font-light md:text-xl lg:text-2xl">
                    Investing. Building. Advisory.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
