import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Settings, Scissors, PenTool } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);


export function Services() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const services = [
    {
      id: 'cnc',
      title: 'CNC',
      subtitle: lang === 'pt' ? 'Corte e Maquinação' : 'Milling and Machining',
      description: lang === 'pt' ? 'Corte e maquinação de precisão para madeira, MDF, acrílico e alumínio.' : 'Precise machining for wood, MDF, acrylic and aluminum.',
      image: `${import.meta.env.BASE_URL}real-cnc-sinalizacao.jpg`,
      icon: Settings,
      features: lang === 'pt' ? ['Corte 3D', 'Corte preciso', 'Gravação CNC'] : ['3D Milling', 'Precise cutting', 'CNC Engraving'],
    },
    {
      id: 'laser-cut',
      title: lang === 'pt' ? 'Corte a Laser' : 'Laser Cutting',
      subtitle: lang === 'pt' ? 'Gravação acrílico' : 'Millimetric Precision',
      description: lang === 'pt' ? 'Cortes limpos e detalhados em diversos materiais.' : 'Clean and detailed cuts in various materials.',
      image: `${import.meta.env.BASE_URL}real-laser-gravacao-1-acrilico_1.webp`,
      video: `${import.meta.env.BASE_URL}gravação_laser_acrilico_1.mp4`,
      icon: Scissors,
      features: lang === 'pt' ? ['Corte limpo', 'Alta velocidade', 'Vários materiais'] : ['Clean cut', 'High speed', 'Various materials'],
    },
    {
      id: 'laser-engrave',
      title: lang === 'pt' ? 'Gravação a Laser' : 'Laser Engraving',
      subtitle: lang === 'pt' ? 'Personalização' : 'Customization',
      description: lang === 'pt' ? 'Gravação duradoura e de alta qualidade.' : 'Long-lasting, high-quality engraving.',
      image: `${import.meta.env.BASE_URL}real-laser-gravacao-2.webp`,
      icon: PenTool,
      features: lang === 'pt' ? ['Alta precisão', 'Durabilidade', 'Versatilidade'] : ['High precision', 'Durability', 'Versatility'],
    },
    {
      id: '3d-print',
      title: lang === 'pt' ? 'Impressão 3D' : '3D Printing',
      subtitle: lang === 'pt' ? 'Prototipagem Rápida' : 'Rapid Prototyping',
      description: lang === 'pt' ? 'Transforme as suas ideias em objetos reais.' : 'Turn your ideas into real objects.',
      image: `${import.meta.env.BASE_URL}impressao3d_01.webp`,
      icon: Box,
      features: lang === 'pt' ? ['Vários materiais', 'Prototipagem', 'Peças complexas'] : ['Various materials', 'Prototyping', 'Complex parts'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.services-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <section ref={sectionRef} id="servicos-section" className="section-padding bg-white">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="services-title inline-block text-tech-blue font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
            {t.nav.services}
          </span>
          <h2 className="services-title font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-tech-dark mb-6">
            {t.homeServices.title}{' '}
            <span className="text-tech-blue">{t.homeServices.subtitle}</span>
          </h2>
          <p className="services-title text-tech-gray text-lg max-w-2xl mx-auto">
            {t.homeServices.desc}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-tech-lg transition-all duration-500 border border-tech-blue/5"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                {service.video ? (
                  <video
                    src={service.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/80 to-transparent" />
                
                {/* Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <service.icon className="w-6 h-6 text-tech-blue" />
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-white/70 text-sm font-medium">
                    {service.subtitle}
                  </span>
                  <h3 className="font-montserrat font-bold text-2xl text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-tech-gray mb-6 leading-relaxed">{service.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-tech-blue/5 text-tech-blue text-xs font-medium rounded-full border border-tech-blue/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <Link
                  to={`/servicos#${service.id}`}
                  className="inline-flex items-center gap-2 text-tech-blue font-bold group/link hover:text-tech-blue-light transition-colors"
                >
                  {t.homeServices.learnMore}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/servicos">
            <button className="inline-flex items-center gap-3 px-10 py-5 bg-tech-dark text-white font-montserrat font-bold rounded-xl hover:bg-tech-blue transition-all shadow-xl hover:shadow-tech/20 group">
              {t.homeServices.viewAll}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
