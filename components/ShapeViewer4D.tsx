import React from 'react';

interface ShapeViewer4DProps {
  name: string;
  color: string;
  className?: string;
  isAnimated?: boolean;
}

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return `rgba(200, 200, 200, ${alpha})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const adjustColor = (color: string, amount: number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, c => ('0'+Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)).substr(-2));
};

const Cube4D: React.FC<{color: string, size: string, isInner?: boolean}> = ({ color, size, isInner = false }) => {
    const faceBaseClasses = 'absolute w-full h-full border-2';
    const faceBgColor = hexToRgba(color, 0.7);
    const faceBorderColor = adjustColor(color, 20);

    const animationStyle: React.CSSProperties = isInner ? { animation: 'tesseract-inner-cube 10s ease-in-out infinite' } : {};
    
    const faceStyle = {
        backgroundColor: faceBgColor,
        borderColor: faceBorderColor
    };

    return (
        <div className="absolute w-full h-full" style={{ transformStyle: 'preserve-3d', ...animationStyle, '--size': size } as React.CSSProperties}>
            <div className={faceBaseClasses} style={{ ...faceStyle, transform: 'rotateY(0deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ ...faceStyle, transform: 'rotateY(90deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ ...faceStyle, transform: 'rotateY(180deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ ...faceStyle, transform: 'rotateY(-90deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ ...faceStyle, transform: 'rotateX(90deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ ...faceStyle, transform: 'rotateX(-90deg) translateZ(calc(var(--size) / 2))' }}></div>
        </div>
    )
}

export const ShapeViewer4D: React.FC<ShapeViewer4DProps> = ({ name, color, className = 'w-24 h-24', isAnimated = true }) => {
  
  const renderShape = () => {
    switch (name) {
      case 'Tesseract':
        return (
          <div className={`relative w-full h-full ${isAnimated ? 'animate-tesseract' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
              <Cube4D color={color} size="100%" />
              <Cube4D color={color} size="50%" isInner={true} />
          </div>
        );
      default:
        return <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 p-2 text-xs">4D View Not Available</div>;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ perspective: '1000px' }}>
       {renderShape()}
    </div>
  );
};