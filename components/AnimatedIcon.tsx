'use client';

interface AnimatedIconProps {
  name: 'check' | 'gear' | 'lightning' | 'zap' | 'network' | 'brain';
  size?: number;
  className?: string;
}

export default function AnimatedIcon({ name, size = 32, className = '' }: AnimatedIconProps) {
  const iconSize = size;

  switch (name) {
    case 'check':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className={`${className} animate-pulse`}>
          <path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            fill="currentColor"
          />
        </svg>
      );

    case 'gear':
      return (
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          className={className}
          style={{ animation: 'spin 3s linear infinite' }}
        >
          <path
            d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.62l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.48.1.62l2.03 1.58c-.05.3-.07.62-.07.94 0 .33.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.62l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.48-.1-.62l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
            fill="currentColor"
          />
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </svg>
      );

    case 'lightning':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className={className}>
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            fill="currentColor"
            style={{ animation: 'bolt 2s ease-in-out infinite' }}
          />
          <style>{`
            @keyframes bolt {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
          `}</style>
        </svg>
      );

    case 'network':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className={className}>
          <circle cx="4" cy="4" r="2" fill="currentColor" />
          <circle cx="20" cy="4" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="4" cy="20" r="2" fill="currentColor" />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="4" y1="20" x2="12" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="20" y1="20" x2="12" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      );

    case 'brain':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" className={className}>
          <path
            d="M9 3C7.34 3 6 4.34 6 6c0 1.39.84 2.58 2.04 3.1-.1 1.54-.37 2.67-1.04 3.4C6 12.8 5 13.5 5 14c0 1.66 1.34 3 3 3h1v5h6v-5h1c1.66 0 3-1.34 3-3 0-.5-1-1.2-1.04-1.5-.67-.73-.94-1.86-1.04-3.4 1.2-.52 2.04-1.71 2.04-3.1 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.39.84 2.58 2.04 3.1-.02.29-.05.57-.08.87H9.08c-.03-.3-.06-.58-.08-.87 1.2-.52 2.04-1.71 2.04-3.1 0-1.66-1.34-3-3-3z"
            fill="currentColor"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}
          />
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
          `}</style>
        </svg>
      );

    default:
      return null;
  }
}
