import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { LangProvider } from '@/lib/i18n';
import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { Portfolio } from '@/pages/Portfolio';
import { Quote } from '@/pages/Quote';
import { Contact } from '@/pages/Contact';
import { Login } from '@/pages/Login';

function App() {
  return (
    <LangProvider>
      <Router basename="/tech9plus-website">
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/orcamento" element={<Quote />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </div>
      </Router>
    </LangProvider>
  );
}

export default App;