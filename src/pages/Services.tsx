import { useEffect, useRef } from 'react';
import { Settings, Scissors, PenTool, Box, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/i18n';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);



export function Services() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 'cnc',
      icon: Settings,
      title: 'CNC',
      subtitle: lang === 'pt' ? 'Fresagem e Usinagem de Precisão' : 'Precision Milling and Machining',
      description: lang === 'pt' ? 'Serviços completos de usinagem CNC para madeira, MDF, acrílico e alumínio. Garantimos precisão e acabamento profissional.' : 'Complete CNC machining services for wood, MDF, acrylic and aluminum. We guarantee precision and professional finishing.',
      image: `${import.meta.env.BASE_URL}real-cnc-sinalizacao.jpg`,
      video: `${import.meta.env.BASE_URL}video-cnc.mp4`,
      features: lang === 'pt' ? ['Fresagem 3D', 'Corte preciso', 'Usinagem de alumínio'] : ['3D Milling', 'Precise cutting', 'Aluminum machining'],
      applications: lang === 'pt' ? ['Sinalização', 'Mobiliário', 'Protótipos'] : ['Signage', 'Furniture', 'Prototypes'],
    },
    {
      id: 'laser',
      icon: Scissors,
      title: lang === 'pt' ? 'Corte a Laser' : 'Laser Cutting',
      subtitle: lang === 'pt' ? 'Cortes Limpos e Precisos' : 'Clean and Precise Cuts',
      description: lang === 'pt' ? 'Corte a laser em diversos materiais com precisão milimétrica.' : 'Laser cutting in various materials with millimetric precision.',
      image: `${import.meta.env.BASE_URL}real-laser-gravacao-1.jpg`,
      features: lang === 'pt' ? ['Corte em madeira', 'Acrílico', 'Tecidos'] : ['Wood cutting', 'Acrylic', 'Fabrics'],
      applications: lang === 'pt' ? ['Painéis decorativos', 'Brindes', 'Letras'] : ['Decorative panels', 'Gifts', 'Letters'],
    },
    {
      id: 'gravacao',
      icon: PenTool,
      title: lang === 'pt' ? 'Gravação a Laser' : 'Laser Engraving',
      subtitle: lang === 'pt' ? 'Personalização Duradoura' : 'Durable Customization',
      description: lang === 'pt' ? 'Gravação a laser para personalização de brindes e produtos.' : 'Laser engraving for customizing gifts and products.',
      image: `${import.meta.env.BASE_URL}real-laser-gravacao-2.jpg`,
      features: lang === 'pt' ? ['Alta resolução', 'Marcas permanentes'] : ['High resolution', 'Permanent marks'],
      applications: lang === 'pt' ? ['Troféus', 'Placas', 'Brindes'] : ['Trophies', 'Plates', 'Gifts'],
    },
    {
      id: '3d',
      icon: Box,
      title: lang === 'pt' ? 'Impressão 3D' : '3D Printing',
      subtitle: lang === 'pt' ? 'Prototipagem e Produção' : 'Prototyping and Production',
      description: lang === 'pt' ? 'Transforme as suas ideias em realidade com a nossa impressão 3D.' : 'Turn your ideas into reality with our 3D printing.',
      image: `${import.meta.env.BASE_URL}real-3d-maquete.jpg`,
      features: lang === 'pt' ? ['FDM e SLA', 'Vários materiais'] : ['FDM and SLA', 'Various materials'],
      applications: lang === 'pt' ? ['Maquetes', 'Protótipos', 'Peças'] : ['Models', 'Prototypes', 'Parts'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-section',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-tech-dark py-20">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <span className="inline-block text-tech-blue-light font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
            {t.nav.services}
          </span>
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {t.homeServices.title} <span className="text-gradient">{t.homeServices.subtitle}</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t.homeServices.desc}
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section ref={sectionRef} className="section-padding bg-white">
        <div className="container-padding max-w-7xl mx-auto space-y-32">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`service-section grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image/Video Container */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-tech-lg bg-black border border-tech-blue/10">
                  {service.video ? (
                    <video
                      src={service.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-[400px] lg:h-[500px] object-cover"
                    />
                  ) : (
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`w-full h-[400px] lg:h-[500px] ${
                        service.id === 'laser' ? 'object-contain bg-tech-light p-8' : 'object-cover'
                      }`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/40 to-transparent pointer-events-none" />
                </div>
                
                {/* Icon badge */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-tech-blue rounded-2xl flex items-center justify-center shadow-tech-lg border-4 border-white">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="text-tech-blue font-montserrat font-semibold text-sm uppercase tracking-wider">
                  {lang === 'pt' ? 'Serviço' : 'Service'}
                </span>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tech-dark mt-2 mb-2">
                  {service.title}
                </h2>
                <p className="text-tech-blue-light font-medium mb-6">
                  {service.subtitle}
                </p>
                <p className="text-tech-gray text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Features & Applications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-montserrat font-semibold text-tech-dark mb-4 border-b border-tech-blue/10 pb-2">
                      {lang === 'pt' ? 'Características' : 'Features'}
                    </h3>
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-tech-blue" />
                          <span className="text-tech-gray text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-tech-dark mb-4 border-b border-tech-blue/10 pb-2">
                      {lang === 'pt' ? 'Aplicações' : 'Applications'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.applications.map((app, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-tech-blue/5 text-tech-blue text-xs font-medium rounded-full border border-tech-blue/10"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link to="/orcamento">
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-tech-blue text-white font-montserrat font-bold rounded-xl hover:bg-tech-blue-light transition-all shadow-lg hover:shadow-tech/20 group">
                    {t.hero.quoteBtn}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-tech-light">
        <div className="container-padding max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-tech-dark mb-6">
            {lang === 'pt' ? 'Não Sabe Qual o Serviço Ideal?' : 'Not Sure Which Service is Ideal?'}
          </h2>
          <p className="text-tech-gray text-lg mb-8">
            {lang === 'pt' ? 'Entre em contacto connosco e ajudamos a escolher a melhor solução.' : 'Get in touch with us and we will help you choose the best solution.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contacto">
              <button className="px-10 py-4 bg-tech-dark text-white font-montserrat font-bold rounded-xl hover:bg-tech-blue transition-all">
                {t.nav.contact}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
