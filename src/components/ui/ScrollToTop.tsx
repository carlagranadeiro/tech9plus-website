import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div
      className={`fixed bottom-[100px] right-[28px] z-[9998] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="w-[58px] h-[58px] bg-white border border-tech-blue/20 text-tech-blue rounded-full flex items-center justify-center shadow-lg hover:shadow-tech hover:bg-tech-blue hover:text-white transition-all group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
      </button>
    </div>
  );
}
