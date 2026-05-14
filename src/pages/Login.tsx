import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, UserPlus } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login/register
  };

  return (
    <main className="pt-24 min-h-screen bg-tech-light">
      <div className="container-padding max-w-md mx-auto py-16">
        <div className="bg-white rounded-2xl shadow-tech-lg overflow-hidden">
          {/* Header */}
          <div className="bg-tech-blue p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-montserrat font-bold text-2xl">T9</span>
            </div>
            <h1 className="font-montserrat font-bold text-2xl text-white mb-2">
              {isLogin ? 'Área de Cliente' : 'Criar Conta'}
            </h1>
            <p className="text-white/70">
              {isLogin
                ? 'Inicie sessão para aceder à sua conta'
                : 'Registe-se para aceder aos nossos serviços'}
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-tech-dark mb-2">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tech-gray" />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                      placeholder="O seu nome"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-tech-dark mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tech-gray" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                    placeholder="o.seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-tech-dark mb-2">
                  Palavra-passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tech-gray" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, password: e.target.value }))
                    }
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-tech-gray hover:text-tech-dark"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-tech-dark mb-2">
                    Confirmar Palavra-passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tech-gray" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tech-blue focus:border-transparent outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-tech-blue rounded focus:ring-tech-blue"
                    />
                    <span className="text-sm text-tech-gray">Lembrar-me</span>
                  </label>
                  <Link
                    to="#"
                    className="text-sm text-tech-blue hover:text-tech-blue-light"
                  >
                    Esqueceu a palavra-passe?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-tech-blue text-white font-montserrat font-semibold rounded-lg hover:bg-tech-blue-light transition-colors"
              >
                {isLogin ? 'Iniciar Sessão' : 'Criar Conta'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-tech-gray">
                {isLogin ? 'Ainda não tem conta?' : 'Já tem conta?'}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-tech-blue font-semibold hover:text-tech-blue-light"
                >
                  {isLogin ? 'Registe-se' : 'Inicie sessão'}
                </button>
              </p>
            </div>

            {/* Back to home */}
            <div className="mt-6 pt-6 border-t text-center">
              <Link to="/" className="text-tech-gray hover:text-tech-blue text-sm">
                ← Voltar à página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
