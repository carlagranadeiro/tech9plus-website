import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-title span',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, delay: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [t]); // Re-animate on language change

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      gsap.to(imageRef.current, {
        rotateY: xPercent * 3,
        rotateX: -yPercent * 3,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-100"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}hero-laser.jpg`}
          alt="Laser cutting machine"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container-padding max-w-7xl mx-auto pt-32 pb-20"
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tech-blue/10 backdrop-blur-sm rounded-full mb-8">
            <span className="w-2 h-2 bg-tech-blue rounded-full animate-pulse" />
            <span className="text-tech-dark/90 text-sm font-medium">
              {t.hero.since}
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title font-montserrat font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-tech-dark leading-tight mb-6">
            {t.hero.solutions.split('').map((char, i) => (
              <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
            <br />
            <span className="text-tech-blue">
              {t.hero.print3d.split('').map((char, i) => (
                <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </span>
            <br />
            {t.hero.cncAndLaser.split('').map((char, i) => (
              <span key={i} className="inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-lg md:text-xl text-tech-gray mb-8 max-w-lg">
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-wrap gap-4">
            <Link to="/orcamento">
              <button
                className="bg-tech-blue hover:bg-tech-blue-light text-white font-montserrat font-semibold px-8 py-4 rounded-lg text-base group flex items-center gap-2 transition-all shadow-lg"
              >
                {t.hero.quoteBtn}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to="/portfolio">
              <button
                className="border-2 border-tech-blue/30 text-tech-blue hover:bg-tech-blue/5 font-montserrat font-semibold px-8 py-4 rounded-lg text-base flex items-center gap-2 transition-all"
              >
                <Play className="w-5 h-5" />
                {t.hero.portfolioBtn}
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            {[
              { value: '4+', label: t.hero.exp },
              { value: '1000+', label: t.hero.projects },
              { value: '3', label: t.hero.partners },
            ].map((stat, index) => (
              <div key={index} className="text-center md:text-left border-l-2 border-tech-blue/10 pl-6">
                <div className="font-montserrat font-bold text-2xl md:text-3xl text-tech-blue">
                  {stat.value}
                </div>
                <div className="text-sm text-tech-gray mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          </div>
        </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
