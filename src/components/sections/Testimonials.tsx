import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'António Silva',
    role: 'Engenheiro Mecânico',
    content: 'Excelente trabalho na impressão 3D do meu projeto! A qualidade das peças superou todas as expectativas. Recomendo vivamente os serviços da Tech 9+.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Maria Santos',
    role: 'Designer de Interiores',
    content: 'Corte laser perfeito, superou as expectativas. O painel decorativo ficou exatamente como imaginei. Profissionalismo e atenção aos detalhes.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Pedro Costa',
    role: 'Empresário',
    content: 'Profissionalismo e qualidade impecáveis. A gravação a laser nas nossas placas de identificação ficou perfeita. Entrega rápida e preço justo.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ana Ferreira',
    role: 'Arquiteta',
    content: 'Trabalho CNC de alta precisão. As maquetas arquitetónicas ficaram com um acabamento excecional. Parabéns à equipa!',
    rating: 5,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title',
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
    if (carouselRef.current) {
      gsap.to(carouselRef.current, {
        rotateY: -activeIndex * (360 / testimonials.length),
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [activeIndex]);

  return (
    <section ref={sectionRef} className="section-padding bg-tech-light overflow-hidden">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="testimonials-title inline-block text-tech-blue font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
            Testemunhos
          </span>
          <h2 className="testimonials-title font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-tech-dark mb-6">
            O Que Dizem os <span className="text-gradient">Nossos Clientes</span>
          </h2>
        </div>

        {/* 3D Carousel */}
        <div className="relative perspective-[1000px]" style={{ perspective: '1000px' }}>
          <div
            ref={carouselRef}
            className="relative flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {testimonials.map((testimonial, index) => {
              const angle = (360 / testimonials.length) * index;
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={testimonial.id}
                  className={`absolute w-full max-w-2xl transition-all duration-500 ${
                    isActive ? 'opacity-100 z-10' : 'opacity-30 z-0'
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(400px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={`bg-white rounded-2xl p-8 md:p-10 shadow-lg transition-all duration-500 ${
                      isActive ? 'scale-100' : 'scale-90'
                    }`}
                  >
                    {/* Quote icon */}
                    <div className="w-12 h-12 bg-tech-blue/10 rounded-xl flex items-center justify-center mb-6">
                      <Quote className="w-6 h-6 text-tech-blue" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-tech-dark text-lg md:text-xl leading-relaxed mb-8">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-tech-blue rounded-full flex items-center justify-center">
                        <span className="text-white font-montserrat font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-montserrat font-semibold text-tech-dark">
                          {testimonial.name}
                        </div>
                        <div className="text-tech-gray text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-tech-blue hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-tech-blue hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? 'bg-tech-blue w-8'
                    : 'bg-tech-gray/30 hover:bg-tech-gray/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
