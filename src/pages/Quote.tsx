import { useState, useRef } from 'react';
import { Upload, File, X, Calculator, Check, ArrowRight, Info } from 'lucide-react';
import gsap from 'gsap';

interface QuoteForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  material: string;
  quantity: number;
  description: string;
}

const services = [
  { id: '3d', name: 'Impressão 3D', basePrice: 15 },
  { id: 'cnc', name: 'CNC', basePrice: 45 },
  { id: 'laser-cut', name: 'Corte a Laser', basePrice: 30 },
  { id: 'laser-engrave', name: 'Gravação a Laser', basePrice: 25 },
];

const materials = {
  '3d': [
    { id: 'pla', name: 'PLA', multiplier: 1 },
    { id: 'abs', name: 'ABS', multiplier: 1.2 },
    { id: 'petg', name: 'PETG', multiplier: 1.3 },
    { id: 'resina', name: 'Resina', multiplier: 2 },
  ],
  'cnc': [
    { id: 'mdf', name: 'MDF', multiplier: 1 },
    { id: 'madeira', name: 'Madeira', multiplier: 1.2 },
    { id: 'acrilico', name: 'Acrílico', multiplier: 1.5 },
    { id: 'aluminio', name: 'Alumínio', multiplier: 2.5 },
  ],
  'laser-cut': [
    { id: 'mdf', name: 'MDF', multiplier: 1 },
    { id: 'madeira', name: 'Madeira', multiplier: 1.2 },
    { id: 'acrilico', name: 'Acrílico', multiplier: 1.3 },
    { id: 'couro', name: 'Couro', multiplier: 1.5 },
  ],
  'laser-engrave': [
    { id: 'madeira', name: 'Madeira', multiplier: 1 },
    { id: 'acrilico', name: 'Acrílico', multiplier: 1.2 },
    { id: 'metal', name: 'Metal', multiplier: 1.8 },
    { id: 'vidro', name: 'Vidro', multiplier: 2 },
  ],
};

export function Quote() {
  const [form, setForm] = useState<QuoteForm>({
    name: '',
    email: '',
    phone: '',
    service: '',
    material: '',
    quantity: 1,
    description: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateEstimate = () => {
    if (!form.service || !form.material) return;

    const service = services.find((s) => s.id === form.service);
    const materialList = materials[form.service as keyof typeof materials];
    const material = materialList?.find((m) => m.id === form.material);

    if (service && material) {
      const basePrice = service.basePrice;
      const materialMultiplier = material.multiplier;
      const quantity = form.quantity;
      const estimated = basePrice * materialMultiplier * quantity;
      setEstimatedPrice(estimated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    gsap.to('.quote-form', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        setIsSubmitted(true);
        gsap.fromTo(
          '.success-message',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      },
    });
  };

  const availableMaterials = form.service
    ? materials[form.service as keyof typeof materials]
    : [];

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-tech-dark py-20">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <span className="inline-block text-tech-blue-light font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
            Orçamento Rápido
          </span>
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Solicite o Seu <span className="text-gradient">Orçamento</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Faça upload dos seus ficheiros e obtenha uma estimativa de preço 
            em poucos minutos. Orçamento gratuito e sem compromisso.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-white">
        <div className="container-padding max-w-4xl mx-auto">
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="quote-form bg-white rounded-2xl shadow-tech-lg overflow-hidden"
            >
              {/* Progress steps */}
              <div className="bg-tech-light px-8 py-6">
                <div className="flex items-center justify-between">
                  {['Dados Pessoais', 'Serviço', 'Ficheiros', 'Confirmação'].map(
                    (step, index) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            index === 0
                              ? 'bg-tech-blue text-white'
                              : 'bg-white text-tech-gray'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`hidden md:block ml-2 text-sm ${
                            index === 0 ? 'text-tech-dark' : 'text-tech-gray'
                          }`}
                        >
                          {step}
                        </span>
                        {index < 3 && (
                          <div className="hidden md:block w-12 h-px bg-tech-gray/20 mx-4" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="md:col-span-2">
                    <h3 className="font-montserrat font-bold text-xl text-tech-dark mb-4">
                      Dados Pessoais
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-tech-dark mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                      placeholder="O seu nome"
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
                      placeholder="o.seu@email.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-tech-dark mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                      placeholder="+351 000 000 000"
                    />
                  </div>

                  {/* Service Selection */}
                  <div className="md:col-span-2 mt-6">
                    <h3 className="font-montserrat font-bold text-xl text-tech-dark mb-4">
                      Tipo de Serviço
                    </h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-tech-dark mb-2">
                      Serviço *
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          service: e.target.value,
                          material: '',
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Selecione um serviço</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-tech-dark mb-2">
                      Material *
                    </label>
                    <select
                      required
                      value={form.material}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, material: e.target.value }))
                      }
                      disabled={!form.service}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all disabled:bg-gray-100"
                    >
                      <option value="">Selecione um material</option>
                      {availableMaterials.map((material) => (
                        <option key={material.id} value={material.id}>
                          {material.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-tech-dark mb-2">
                      Quantidade *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={form.quantity}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          quantity: parseInt(e.target.value) || 1,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={calculateEstimate}
                      disabled={!form.service || !form.material}
                      className="flex items-center gap-2 px-6 py-3 bg-tech-light text-tech-dark font-medium rounded-lg hover:bg-tech-blue/10 transition-colors disabled:opacity-50"
                    >
                      <Calculator className="w-5 h-5" />
                      Calcular Estimativa
                    </button>
                  </div>

                  {/* Price Estimate */}
                  {estimatedPrice !== null && (
                    <div className="md:col-span-2">
                      <div className="bg-tech-blue/5 border border-tech-blue/20 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="w-5 h-5 text-tech-blue" />
                          <span className="font-medium text-tech-dark">
                            Estimativa de Preço
                          </span>
                        </div>
                        <p className="text-sm text-tech-gray mb-4">
                          Este valor é uma estimativa baseada nas informações fornecidas. 
                          O preço final pode variar consoante a complexidade do projeto.
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="font-montserrat font-bold text-4xl text-tech-blue">
                            {estimatedPrice.toFixed(2)}€
                          </span>
                          <span className="text-tech-gray">/ unidade</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="md:col-span-2 mt-6">
                    <h3 className="font-montserrat font-bold text-xl text-tech-dark mb-4">
                      Ficheiros
                    </h3>
                    <p className="text-sm text-tech-gray mb-4">
                      Faça upload dos ficheiros 3D (.stl, .obj, .step) ou desenhos (.pdf, .dxf, .ai)
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-tech-blue hover:bg-tech-blue/5 transition-all"
                    >
                      <Upload className="w-12 h-12 text-tech-gray mx-auto mb-4" />
                      <p className="text-tech-dark font-medium mb-2">
                        Clique para fazer upload
                      </p>
                      <p className="text-sm text-tech-gray">
                        ou arraste os ficheiros para aqui
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".stl,.obj,.step,.pdf,.dxf,.ai,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="md:col-span-2">
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-tech-light rounded-lg"
                          >
                            <File className="w-5 h-5 text-tech-blue" />
                            <span className="flex-1 text-sm text-tech-dark truncate">
                              {file.name}
                            </span>
                            <span className="text-xs text-tech-gray">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="md:col-span-2 mt-6">
                    <label className="block text-sm font-medium text-tech-dark mb-2">
                      Descrição do Projeto
                    </label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Descreva o seu projeto, dimensões, acabamentos desejados, etc."
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-8 pt-6 border-t">
                  <button
                    type="submit"
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-tech-blue text-white font-montserrat font-semibold rounded-lg hover:bg-tech-blue-light transition-colors"
                  >
                    Enviar Pedido de Orçamento
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="success-message bg-white rounded-2xl shadow-tech-lg p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="font-montserrat font-bold text-3xl text-tech-dark mb-4">
                Pedido Enviado com Sucesso!
              </h2>
              <p className="text-tech-gray text-lg max-w-md mx-auto mb-8">
                Obrigado pelo seu pedido. Vamos analisar o seu projeto e entrar 
                em contacto consigo em breve com o orçamento detalhado.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/"
                  className="px-8 py-4 bg-tech-blue text-white font-montserrat font-semibold rounded-lg hover:bg-tech-blue-light transition-colors"
                >
                  Voltar à Página Inicial
                </a>
                <a
                  href="/loja"
                  className="px-8 py-4 border-2 border-tech-blue text-tech-blue font-montserrat font-semibold rounded-lg hover:bg-tech-blue hover:text-white transition-colors"
                >
                  Ver Loja
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
