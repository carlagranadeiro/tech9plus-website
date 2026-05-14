import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    title: 'Maquete Urbana 3D',
    category: '3d',
    image: `${import.meta.env.BASE_URL}real-3d-maquete.jpg`,
    description: 'Maquete urbana detalhada produzida com impressão 3D',
  },
  {
    id: 2,
    title: 'Painel Decorativo',
    category: 'laser_gravacao',
    image: `${import.meta.env.BASE_URL}real-laser-gravacao-1.jpg`,
    description: 'Corte laser em madeira de carvalho',
  },
  {
    id: 3,
    title: 'Componente CNC',
    category: 'cnc',
    image: `${import.meta.env.BASE_URL}real-cnc-sinalizacao.jpg`,
    description: 'Placa personalizada usinada em CNC',
  },
  {
    id: 4,
    title: 'Gravação Personalizada',
    category: 'laser_gravacao',
    image: `${import.meta.env.BASE_URL}real-laser-gravacao-2.jpg`,
    description: 'Gravação a laser em madeira personalizada',
  },
  {
    id: 5,
    title: 'Protótipos 3D',
    category: '3d',
    image: `${import.meta.env.BASE_URL}real-3d-maquete.jpg`,
    description: 'Coleção de peças para projeto',
  },
  {
    id: 6,
    title: 'Escultura em Madeira',
    category: 'cnc',
    image: `${import.meta.env.BASE_URL}real-cnc-sinalizacao.jpg`,
    description: 'Gravação a laser em cortiça de precisão',
  },
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: '3d', name: 'Impressão 3D' },
  { id: 'cnc', name: 'CNC' },
  { id: 'laser_gravacao', name: 'Gravação e corte a laser' },
];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.portfolio-title',
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

      // Grid items animation
      gsap.fromTo(
        '.portfolio-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate items when filter changes
  useEffect(() => {
    gsap.fromTo(
      '.portfolio-item',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="portfolio-title inline-block text-tech-blue font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
            Portefólio
          </span>
          <h2 className="portfolio-title font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-tech-dark mb-6">
            Os Nossos <span className="text-gradient">Trabalhos</span>
          </h2>
          <p className="portfolio-title text-tech-gray text-lg max-w-2xl mx-auto">
            Explore alguns dos projetos que realizamos para os nossos clientes.
            Cada peça é única e feita com precisão.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="portfolio-title flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full font-montserrat font-medium text-sm transition-all ${
                activeFilter === category.id
                  ? 'bg-tech-blue text-white shadow-tech'
                  : 'bg-tech-light text-tech-dark hover:bg-tech-blue/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`portfolio-item group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-tech-lg transition-all duration-500 ${
                index === 0 || index === 3 ? 'lg:row-span-2' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 || index === 3 ? 'h-full min-h-[400px]' : 'h-72'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-tech-blue-light text-sm font-medium mb-2">
                    {categories.find((c) => c.id === item.category)?.name}
                  </span>
                  <h3 className="font-montserrat font-bold text-xl text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{item.description}</p>
                  <button className="inline-flex items-center gap-2 text-white font-medium">
                    Ver detalhes
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/portfolio">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-tech-blue text-white font-montserrat font-semibold rounded-lg hover:bg-tech-blue-light transition-colors">
              Ver Portefólio Completo
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
