import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Lang = 'pt' | 'en';

interface Translations {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    contact: string;
  };
  header: {
    quoteBtn: string;
  };
  hero: {
    since: string;
    solutions: string;
    print3d: string;
    cncAndLaser: string;
    description: string;
    quoteBtn: string;
    portfolioBtn: string;
    exp: string;
    projects: string;
    partners: string;
  };
  homeServices: {
    title: string;
    subtitle: string;
    desc: string;
    learnMore: string;
    viewAll: string;
  };
  footer: {
    tagline: string;
    services: string;
    company: string;
    support: string;
    address: string;
    phone: string;
    email: string;
    rights: string;
    followUs: string;
  };
  contact: {
    hero: string;
    subtitle: string;
    title: string;
    info: string;
    infoSub: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hoursVal: string;
    formTitle: string;
    formSub: string;
    nameLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    subjectOpt1: string;
    subjectOpt2: string;
    subjectOpt3: string;
    subjectOpt4: string;
    subjectOpt5: string;
    messageLabel: string;
    messagePlaceholder: string;
    attachmentLabel: string;
    attachmentPlaceholder: string;
    sendBtn: string;
    successTitle: string;
    successMsg: string;
    socialTitle: string;
  };
}

const translations: Record<Lang, Translations> = {
  pt: {
    nav: {
      home: 'Home',
      services: 'Serviços',
      portfolio: 'Portefólio',
      contact: 'Contacto',
    },
    header: { quoteBtn: 'Orçamento' },
    hero: {
      since: 'Desde 2020 em Loulé',
      solutions: 'Soluções de',
      print3d: 'Impressão 3D',
      cncAndLaser: 'CNC e Laser',
      description: 'Transformamos as suas ideias em realidade com tecnologia de ponta. Precisão, qualidade e inovação em cada projeto.',
      quoteBtn: 'Solicitar Orçamento',
      portfolioBtn: 'Ver Portefólio',
      exp: 'Anos de Experiência',
      projects: 'Projetos Concluídos',
      partners: 'Parceiros',
    },
    homeServices: {
      title: 'Soluções Completas em',
      subtitle: 'Fabricação Digital',
      desc: 'Oferecemos serviços profissionais de impressão 3D, CNC e corte e gravação a laser para transformar as suas ideias em realidade.',
      learnMore: 'Saber mais',
      viewAll: 'Ver Todos os Serviços',
    },
    footer: {
      tagline: 'Especialistas em impressão 3D, CNC e corte e gravação a laser. Transformamos as suas ideias em realidade desde 2020.',
      services: 'Serviços',
      company: 'Empresa',
      support: 'Suporte',
      address: 'Morada',
      phone: 'Telefone',
      email: 'Email',
      rights: 'Todos os direitos reservados.',
      followUs: 'Siga-nos',
    },
    contact: {
      hero: 'Contacto',
      subtitle: 'Entre em Contacto',
      title: 'Entre em Contacto',
      info: 'Informações de Contacto',
      infoSub: 'Estamos disponíveis para responder às suas perguntas e discutir as suas necessidades. Não hesite em contactar-nos.',
      addressLabel: 'Morada',
      phoneLabel: 'Telefone',
      emailLabel: 'Email',
      hoursLabel: 'Horário',
      hoursVal: 'Segunda a Sexta: 9h - 18h\nSábado: 10h - 14h',
      formTitle: 'Envie uma Mensagem',
      formSub: 'Preencha o formulário abaixo e responderemos o mais breve possível.',
      nameLabel: 'Nome Completo *',
      namePlaceholder: 'O seu nome',
      emailPlaceholder: 'o.seu@email.com',
      subjectLabel: 'Assunto *',
      subjectPlaceholder: 'Selecione um assunto',
      subjectOpt1: 'Pedido de Orçamento',
      subjectOpt2: 'Informação Geral',
      subjectOpt3: 'Suporte Técnico',
      subjectOpt4: 'Parceria',
      subjectOpt5: 'Outro',
      messageLabel: 'Mensagem *',
      messagePlaceholder: 'Escreva a sua mensagem...',
      attachmentLabel: 'Anexar Ficheiro (opcional)',
      attachmentPlaceholder: 'Escolher ficheiro ou imagem',
      sendBtn: 'Enviar Mensagem',
      successTitle: 'Mensagem Enviada!',
      successMsg: 'Obrigado pelo contacto. Responderemos o mais breve possível.',
      socialTitle: 'Redes Sociais',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    header: { quoteBtn: 'Get a Quote' },
    hero: {
      since: 'Since 2020 in Loulé',
      solutions: 'Solutions for',
      print3d: '3D Printing',
      cncAndLaser: 'CNC and Laser',
      description: 'We transform your ideas into reality with cutting-edge technology. Precision, quality and innovation in every project.',
      quoteBtn: 'Get a Quote',
      portfolioBtn: 'View Portfolio',
      exp: 'Years of Experience',
      projects: 'Completed Projects',
      partners: 'Partners',
    },
    homeServices: {
      title: 'Complete Solutions in',
      subtitle: 'Digital Fabrication',
      desc: 'We offer professional 3D printing, CNC and laser cutting and engraving services to turn your ideas into reality.',
      learnMore: 'Learn more',
      viewAll: 'View All Services',
    },
    footer: {
      tagline: 'Specialists in 3D printing, CNC and laser cutting and engraving. Turning your ideas into reality since 2020.',
      services: 'Services',
      company: 'Company',
      support: 'Support',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      rights: 'All rights reserved.',
      followUs: 'Follow us',
    },
    contact: {
      hero: 'Contact',
      subtitle: 'Get in Touch',
      title: 'Get in Touch',
      info: 'Contact Information',
      infoSub: 'We are available to answer your questions and discuss your needs. Do not hesitate to contact us.',
      addressLabel: 'Address',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      hoursLabel: 'Opening Hours',
      hoursVal: 'Monday to Friday: 9am - 6pm\nSaturday: 10am - 2pm',
      formTitle: 'Send a Message',
      formSub: 'Fill in the form below and we will get back to you as soon as possible.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      subjectLabel: 'Subject *',
      subjectPlaceholder: 'Select a subject',
      subjectOpt1: 'Quote Request',
      subjectOpt2: 'General Information',
      subjectOpt3: 'Technical Support',
      subjectOpt4: 'Partnership',
      subjectOpt5: 'Other',
      messageLabel: 'Message *',
      messagePlaceholder: 'Write your message...',
      attachmentLabel: 'Attach File (optional)',
      attachmentPlaceholder: 'Choose file or image',
      sendBtn: 'Send Message',
      successTitle: 'Message Sent!',
      successMsg: 'Thank you for reaching out. We will reply as soon as possible.',
      socialTitle: 'Social Media',
    },
  },
};

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: 'pt',
  setLang: () => {},
  t: translations.pt,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
