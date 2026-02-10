interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const brandColor = '#b677ce';
  const textColor = '#2D2D2F';
  
  const sizes = {
    sm: { card: 32, icon: 22, text: 18 },
    md: { card: 38, icon: 28, text: 22 },
    lg: { card: 48, icon: 34, text: 28 },
  };

  const s = sizes[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span 
        style={{
          color: brandColor,
          fontFamily: "'Fredoka', sans-serif",
          fontSize: s.icon * 1.4,
          fontWeight: 600,
          lineHeight: 1,
        }}
      >
        ≈
      </span>
      {showText && (
        <span 
          style={{ 
            fontSize: s.text, 
            color: textColor, 
            fontWeight: 600,
            fontFamily: "'Fredoka', 'Nunito', sans-serif",
          }}
        >
          Close Enough
        </span>
      )}
    </div>
  );
}
