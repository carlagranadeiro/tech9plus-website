import { useEffect, useRef } from 'react';
import { Target, Eye, Heart, Award, Users, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Target,
    title: 'Missão',
    description: 'Atender às necessidades dos nossos clientes em projetos de fabricação personalizada, oferecendo soluções inovadoras e de alta qualidade.',
  },
  {
    icon: Eye,
    title: 'Visão',
    description: 'Ser a escolha preferida para serviços personalizados de fabricação, reconhecidos pelos nossos altos padrões e excelência em qualidade.',
  },
  {
    icon: Heart,
    title: 'Valores',
    description: 'Trabalhamos com ética, respeito, comprometimento e inovação, visando sempre a satisfação de nossos clientes e colaboradores.',
  },
];

const stats = [
  { icon: Calendar, value: '2020', label: 'Fundação' },
  { icon: Users, value: '3', label: 'Parceiros' },
  { icon: Award, value: '1000+', label: 'Projetos' },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.about-title',
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

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, rotation: -2 },
        {
          scale: 1.1,
          rotation: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Values animation
      gsap.fromTo(
        '.value-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 85%',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="section-padding bg-tech-light overflow-hidden"
    >
      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden shadow-tech-lg"
            >
              <img
                src={`${import.meta.env.BASE_URL}about-workshop.jpg`}
                alt="Tech 9+ Workshop"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tech-blue/30 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-tech-lg p-6 hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-tech-blue rounded-xl flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="font-montserrat font-bold text-2xl text-tech-dark">
                    4+ Anos
                  </div>
                  <div className="text-tech-gray text-sm">
                    de Excelência
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-tech-blue/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-tech-blue-light/10 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div>
            <span className="about-title inline-block text-tech-blue font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
              Sobre Nós
            </span>
            <h2 className="about-title font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-tech-dark mb-6">
              A Tech <span className="text-gradient">9+</span>
            </h2>
            <p className="about-title text-tech-gray text-lg mb-6">
              Desde 2020, em Loulé, a Tech 9+ tem sido pioneira em fabricação digital. 
              Somos uma empresa formada por 3 parceiros apaixonados por tecnologia e 
              inovação, dedicados a transformar ideias em realidade.
            </p>
            <p className="about-title text-tech-gray mb-8">
              Com equipamento de última geração e uma equipa altamente qualificada, 
              oferecemos serviços de impressão 3D, CNC e corte/gravação a laser 
              para clientes em todo o país.
            </p>

            {/* Stats */}
            <div className="stats-grid grid grid-cols-3 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item text-center p-4 bg-white rounded-xl shadow-sm"
                >
                  <stat.icon className="w-6 h-6 text-tech-blue mx-auto mb-2" />
                  <div className="font-montserrat font-bold text-xl text-tech-dark">
                    {stat.value}
                  </div>
                  <div className="text-tech-gray text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-tech-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-tech-blue/10 rounded-xl flex items-center justify-center mb-6">
                <value.icon className="w-7 h-7 text-tech-blue" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-tech-dark mb-4">
                {value.title}
              </h3>
              <p className="text-tech-gray">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
