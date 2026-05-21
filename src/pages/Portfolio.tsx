import { useState, useEffect, useRef } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', pt: 'Todos', en: 'All' },
  { id: '3d', pt: 'Impressão 3D', en: '3D Printing' },
  { id: 'cnc', pt: 'CNC', en: 'CNC' },
  { id: 'laser_gravacao', pt: 'Gravação e corte a laser', en: 'Laser Cutting & Engraving' },
];

export function Portfolio() {
  const { t, lang } = useLang();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const portfolioItems = [
    {
      id: 1,
      title: lang === 'pt' ? 'Maquete Urbana 3D' : '3D Urban Model',
      category: '3d',
      image: `${import.meta.env.BASE_URL}real-3d-maquete.jpg`,
      description: lang === 'pt' ? 'Maquete urbana detalhada produzida com impressão 3D.' : 'Detailed urban model produced with 3D printing.',
      client: 'Indústria / Industry',
      year: '2024',
    },
    {
      id: 2,
      title: lang === 'pt' ? 'Gravação acrílico' : '"Good Vibes" Laser',
      category: 'laser_gravacao',
      image: `${import.meta.env.BASE_URL}real-laser-gravacao-1-acrilico_1.webp`,
      description: lang === 'pt' ? 'Gravação decorativa em acrílico.' : 'Decorative acrylic engraving.',
      client: 'Design',
      year: '2024',
    },
    {
      id: 3,
      title: lang === 'pt' ? 'Sinalização CNC' : 'CNC Signage',
      category: 'cnc',
      image: `${import.meta.env.BASE_URL}real-cnc-sinalizacao.jpg`,
      description: lang === 'pt' ? 'Placa "Rota das Fontes" usinada em CNC.' : '"Rota das Fontes" signage machined in CNC.',
      client: 'Turismo / Tourism',
      year: '2023',
    },
    {
      id: 4,
      title: lang === 'pt' ? 'Gravação em Cortiça' : 'Cork Engraving',
      category: 'laser_gravacao',
      image: `${import.meta.env.BASE_URL}real-laser-gravacao-2.webp`,
      description: lang === 'pt' ? 'Laser a gravar em cortiça.' : 'Laser engraving on cork.',
      client: 'Particular',
      year: '2024',
    },
    {
      id: 5,
      title: lang === 'pt' ? 'Processo de Corte CNC' : 'CNC Milling Process',
      category: 'cnc',
      image: `${import.meta.env.BASE_URL}real-cnc-sinalizacao.jpg`,
      video: `${import.meta.env.BASE_URL}video-cnc.mp4`,
      description: lang === 'pt' ? 'Demonstração do processo de corte de alta precisão.' : 'Demonstration of the high-precision cutting process.',
      client: 'Tecnologia / Tech',
      year: '2024',
    },
  ];

  const [lightboxIndex, setLightboxIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  const openLightbox = (item: typeof portfolioItems[0], index: number) => {
    setSelectedItem(item);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const nextImage = () => {
    const newIndex = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.portfolio-grid-item',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeFilter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, lightboxIndex, filteredItems]);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-tech-dark py-20">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <span className="inline-block text-tech-blue-light font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
            {t.nav.portfolio}
          </span>
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {lang === 'pt' ? 'Os Nossos' : 'Our'} <span className="text-gradient">{lang === 'pt' ? 'Trabalhos' : 'Works'}</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {lang === 'pt' ? 'Explore alguns dos projetos que realizamos para os nossos clientes.' : 'Explore some of the projects we have carried out for our clients.'}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section ref={sectionRef} className="section-padding bg-white">
        <div className="container-padding max-w-7xl mx-auto">
          {/* Filter */}
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
                {(category as any)[lang]}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-grid-item group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-tech-lg transition-all duration-500 cursor-pointer"
                onClick={() => openLightbox(item, index)}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${
                      item.image.includes('real-laser-gravacao-1-acrilico_1.webp') ? 'object-contain bg-tech-light p-4' : 'object-cover'
                    }`}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Zoom/Play icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.video ? (
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    ) : (
                      <ZoomIn className="w-6 h-6 text-white" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-tech-blue-light text-sm font-medium">
                      {(categories.find((c) => c.id === item.category) as any)?.[lang]}
                    </span>
                    <h3 className="font-montserrat font-bold text-xl text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image container */}
          <div
            className="max-w-5xl max-h-[80vh] px-20"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.video ? (
              <video
                src={selectedItem.video}
                autoPlay
                controls
                className="max-w-full max-h-[70vh] rounded-lg shadow-2xl"
              />
            ) : (
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            )}
            
            {/* Info */}
            <div className="mt-6 text-center">
              <span className="text-tech-blue-light text-sm font-medium">
                {(categories.find((c) => c.id === selectedItem.category) as any)?.[lang]}
              </span>
              <h3 className="font-montserrat font-bold text-2xl text-white mt-1">
                {selectedItem.title}
              </h3>
              <p className="text-white/70 mt-2">{selectedItem.description}</p>
              <div className="flex justify-center gap-6 mt-4 text-sm text-white/50">
                <span>Cliente: {selectedItem.client}</span>
                <span>Ano: {selectedItem.year}</span>
              </div>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}
    </main>
  );
}
