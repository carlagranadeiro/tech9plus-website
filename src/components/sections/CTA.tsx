import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { y: 60, opacity: 0 },
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

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="cta-content relative bg-tech-blue rounded-3xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16">
            {/* Content */}
            <div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-6">
                Pronto para Transformar as Suas Ideias em Realidade?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Entre em contacto connosco e descubra como podemos ajudar no seu 
                próximo projeto. Orçamento gratuito e sem compromisso.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/orcamento">
                  <Button
                    size="lg"
                    className="bg-white text-tech-blue hover:bg-white/90 font-montserrat font-semibold px-8 py-6 text-base group"
                  >
                    Solicitar Orçamento
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/contacto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 font-montserrat font-semibold px-8 py-6 text-base"
                  >
                    Contactar
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="font-montserrat font-semibold text-xl text-white mb-6">
                  Contactos Rápidos
                </h3>

                <div className="space-y-4">
                  <a
                    href="tel:+351965014578"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Telefone</div>
                      <div className="text-white font-semibold">+351 965 014 578</div>
                    </div>
                  </a>

                  <a
                    href="mailto:geral@tech9plus.pt"
                    className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Email</div>
                      <div className="text-white font-semibold">geral@tech9plus.pt</div>
                    </div>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="text-white/60 text-sm mb-2">Localização</div>
                  <div className="text-white">
                    Centro Comercial Charlot<br />
                    R. Maj. Manuel Olival B, Loja 9<br />
                    8100-542 Loulé
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
