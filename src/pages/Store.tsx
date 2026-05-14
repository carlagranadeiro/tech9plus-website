import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Plus, Minus, X, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Kit Iniciante 3D',
    category: 'kits',
    price: 49.90,
    image: '/portfolio-3d-1.jpg',
    description: 'Kit completo para iniciantes em impressão 3D.',
    inStock: true,
  },
  {
    id: 2,
    name: 'Peça Mecânica Personalizada',
    category: 'pecas',
    price: 25.00,
    image: '/portfolio-cnc-1.jpg',
    description: 'Peça mecânica fabricada sob encomenda.',
    inStock: true,
  },
  {
    id: 3,
    name: 'Painel Decorativo Laser',
    category: 'decoracao',
    price: 35.00,
    image: '/portfolio-laser-1.jpg',
    description: 'Painel decorativo em madeira cortado a laser.',
    inStock: true,
  },
  {
    id: 4,
    name: 'Serviço de Impressão 3D',
    category: 'servicos',
    price: 15.00,
    image: '/service-3d-print.jpg',
    description: 'Serviço de impressão 3D por hora.',
    inStock: true,
  },
  {
    id: 5,
    name: 'Serviço de Corte CNC',
    category: 'servicos',
    price: 45.00,
    image: '/service-cnc.jpg',
    description: 'Serviço de corte CNC por hora.',
    inStock: true,
  },
  {
    id: 6,
    name: 'Serviço de Laser',
    category: 'servicos',
    price: 30.00,
    image: '/service-laser-cut.jpg',
    description: 'Serviço de corte/gravação laser por hora.',
    inStock: true,
  },
  {
    id: 7,
    name: 'Placa Personalizada',
    category: 'decoracao',
    price: 20.00,
    image: '/portfolio-engrave-1.jpg',
    description: 'Placa personalizada com gravação a laser.',
    inStock: true,
  },
  {
    id: 8,
    name: 'Protótipo 3D',
    category: 'pecas',
    price: 40.00,
    image: '/portfolio-3d-2.jpg',
    description: 'Protótipo funcional impresso em 3D.',
    inStock: true,
  },
];

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'pecas', name: 'Peças' },
  { id: 'kits', name: 'Kits' },
  { id: 'decoracao', name: 'Decoração' },
  { id: 'servicos', name: 'Serviços' },
];

export function Store() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeFilter);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.store-title',
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
      '.product-card',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeFilter]);

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-tech-dark py-20">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="inline-block text-tech-blue-light font-montserrat font-semibold text-sm uppercase tracking-wider mb-4">
                Loja Online
              </span>
              <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                Produtos <span className="text-gradient">e Serviços</span>
              </h1>
              <p className="text-white/70 text-lg max-w-xl">
                Peças prontas, kits e serviços disponíveis para compra online.
              </p>
            </div>

            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-tech-blue text-white text-sm rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section ref={sectionRef} className="section-padding bg-white">
        <div className="container-padding max-w-7xl mx-auto">
          {/* Filter */}
          <div className="store-title flex flex-wrap justify-center gap-3 mb-12">
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

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-tech-lg transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-tech-blue text-xs font-medium uppercase">
                    {categories.find((c) => c.id === product.category)?.name}
                  </span>
                  <h3 className="font-montserrat font-bold text-lg text-tech-dark mt-1 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-tech-gray text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-montserrat font-bold text-xl text-tech-blue">
                      {product.price.toFixed(2)}€
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-tech-blue text-white text-sm font-medium rounded-lg hover:bg-tech-blue-light transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full overflow-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="font-montserrat font-bold text-xl text-tech-dark">
                Carrinho ({cartCount})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 bg-tech-light rounded-full flex items-center justify-center hover:bg-tech-blue/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-tech-gray/30 mx-auto mb-4" />
                  <p className="text-tech-gray">O seu carrinho está vazio</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-tech-light rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-montserrat font-semibold text-tech-dark">
                          {item.name}
                        </h4>
                        <p className="text-tech-blue font-bold">
                          {item.price.toFixed(2)}€
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-tech-blue hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-tech-blue hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-tech-gray hover:text-red-500 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-tech-gray">Total</span>
                  <span className="font-montserrat font-bold text-2xl text-tech-dark">
                    {cartTotal.toFixed(2)}€
                  </span>
                </div>
                <button className="w-full py-4 bg-tech-blue text-white font-montserrat font-semibold rounded-lg hover:bg-tech-blue-light transition-colors">
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-tech-dark text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-slide-up">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Produto adicionado!</p>
            <p className="text-sm text-white/70">Ao carrinho com sucesso</p>
          </div>
        </div>
      )}
    </main>
  );
}
