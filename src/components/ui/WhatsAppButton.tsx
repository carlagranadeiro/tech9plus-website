import { useState } from 'react';

const WHATSAPP_NUMBER = '351965014578';
const WHATSAPP_MESSAGE = 'Olá! Vim através do website e gostaria de obter mais informações.';

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar via WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
      }}
    >
      {/* Tooltip */}
      <span
        style={{
          background: '#1a1a1a',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 600,
          padding: '6px 14px',
          borderRadius: '20px',
          whiteSpace: 'nowrap',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(10px)',
          transition: 'all 0.25s ease',
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        Fala connosco!
      </span>

      {/* Button */}
      <div style={{ position: 'relative' }}>
        {/* Pulse ring */}
        <span
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: 'rgba(37, 211, 102, 0.35)',
            animation: 'wa-pulse 2s ease-out infinite',
          }}
        />
        <div
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(37,211,102,0.5)',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.2s ease',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* WhatsApp SVG icon */}
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2C8.268 2 2 8.268 2 16c0 2.456.664 4.757 1.82 6.735L2 30l7.47-1.793A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
              fill="#25D366"
            />
            <path
              d="M16 4C9.373 4 4 9.373 4 16c0 2.222.607 4.304 1.664 6.09L4.5 27l5.05-1.328A11.938 11.938 0 0016 28c6.627 0 12-5.373 12-12S22.627 4 16 4z"
              fill="white"
            />
            <path
              d="M21.5 18.5c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.06 4.35.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
              fill="#25D366"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </a>
  );
}
