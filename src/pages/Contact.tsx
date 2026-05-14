import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, FileUp, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100081072357115',
    color: '#1877F2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/tech9plus',
    color: '#E1306C',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@tech9plus',
    color: '#FF0000',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@tech9plus',
    color: '#000000',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/tech9plus',
    color: '#0A66C2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/351965014578',
    color: '#25D366',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
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

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact.addressLabel,
      content: 'Centro Comercial Charlot\nR. Maj. Manuel Olival B, Loja 9\n8100-542 Loulé',
    },
    {
      icon: Phone,
      title: t.contact.phoneLabel,
      content: '+351 965 014 578',
      href: 'tel:+351965014578',
    },
    {
      icon: Mail,
      title: t.contact.emailLabel,
      content: 'geral@tech9plus.pt',
      href: 'mailto:geral@tech9plus.pt',
    },
    {
      icon: Clock,
      title: t.contact.hoursLabel,
      content: t.contact.hoursVal,
    },
  ];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-tech-dark py-20">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <span className="inline-block text-tech-blue-light font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
            {t.contact.hero}
          </span>
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            <span className="text-gradient">{t.contact.subtitle}</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t.contact.infoSub}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRef} className="section-padding bg-white">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-montserrat font-bold text-3xl text-tech-dark mb-6">
                {t.contact.info}
              </h2>
              <p className="text-tech-gray mb-8">{t.contact.infoSub}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-tech-light rounded-xl hover:shadow-tech transition-shadow"
                  >
                    <div className="w-12 h-12 bg-tech-blue/10 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-tech-blue" />
                    </div>
                    <h3 className="font-montserrat font-semibold text-tech-dark mb-2">
                      {item.title}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-tech-gray whitespace-pre-line hover:text-tech-blue transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-tech-gray whitespace-pre-line">{item.content}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mb-8">
                <h3 className="font-montserrat font-semibold text-xl text-tech-dark mb-4">
                  {t.contact.socialTitle}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-montserrat text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: social.color }}
                    >
                      {social.icon}
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://maps.google.com/maps?q=Centro+Comercial+Charlot+Loul%C3%A9+Portugal+37.139278,-8.020139&z=17&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Tech 9+"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-tech-lg p-8">
                {!isSubmitted ? (
                  <>
                    <h2 className="font-montserrat font-bold text-2xl text-tech-dark mb-2">
                      {t.contact.formTitle}
                    </h2>
                    <p className="text-tech-gray mb-6">{t.contact.formSub}</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-tech-dark mb-2">
                          {t.contact.nameLabel}
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                          placeholder={t.contact.namePlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-tech-dark mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                          placeholder={t.contact.emailPlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-tech-dark mb-2">
                          {t.contact.subjectLabel}
                        </label>
                        <select
                          required
                          value={form.subject}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, subject: e.target.value }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                        >
                          <option value="">{t.contact.subjectPlaceholder}</option>
                          <option value="orcamento">{t.contact.subjectOpt1}</option>
                          <option value="informacao">{t.contact.subjectOpt2}</option>
                          <option value="suporte">{t.contact.subjectOpt3}</option>
                          <option value="parceria">{t.contact.subjectOpt4}</option>
                          <option value="outro">{t.contact.subjectOpt5}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-tech-dark mb-2">
                          {t.contact.messageLabel}
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, message: e.target.value }))
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all resize-none"
                        placeholder={t.contact.messagePlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-tech-dark mb-2">
                          {t.contact.attachmentLabel}
                        </label>
                        <div className="space-y-4">
                          <div className="relative group">
                            <input
                              type="file"
                              multiple
                              onChange={(e) => {
                                if (e.target.files) {
                                  setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
                                }
                              }}
                              className="hidden"
                              id="file-upload"
                            />
                            <label
                              htmlFor="file-upload"
                              className="flex items-center gap-3 w-full px-4 py-3 border border-gray-200 rounded-lg cursor-pointer hover:border-tech-blue hover:bg-tech-blue/5 transition-all group-hover:ring-1 group-hover:ring-tech-blue"
                            >
                              <div className="w-10 h-10 bg-tech-blue/10 rounded-lg flex items-center justify-center group-hover:bg-tech-blue/20 transition-colors">
                                <FileUp className="w-5 h-5 text-tech-blue" />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-tech-dark truncate">
                                  {t.contact.attachmentPlaceholder}
                                </p>
                                <p className="text-xs text-tech-gray">
                                  Max 10MB (PDF, JPG, PNG, DXF, STL)
                                </p>
                              </div>
                            </label>
                          </div>

                          {/* File List */}
                          {files.length > 0 && (
                            <div className="space-y-2">
                              {files.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 p-3 bg-tech-light rounded-lg border border-gray-100"
                                >
                                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                                    <FileUp className="w-4 h-4 text-tech-blue" />
                                  </div>
                                  <span className="flex-1 text-sm text-tech-dark truncate">
                                    {file.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                                    className="text-tech-gray hover:text-red-500 transition-colors p-1"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-tech-blue text-white font-montserrat font-semibold rounded-lg hover:bg-tech-blue-light transition-colors"
                      >
                        <Send className="w-5 h-5" />
                        {t.contact.sendBtn}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="font-montserrat font-bold text-2xl text-tech-dark mb-4">
                      {t.contact.successTitle}
                    </h3>
                    <p className="text-tech-gray">{t.contact.successMsg}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
