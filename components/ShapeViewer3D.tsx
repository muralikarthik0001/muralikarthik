import React from 'react';

interface ShapeViewer3DProps {
  name: string;
  colorName: string;
  color: string;
  className?: string;
  isAnimated?: boolean;
}

// Helper function to calculate lighter or darker shades of a hex color
const adjustColor = (color: string, amount: number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, c => ('0'+Math.min(255, Math.max(0, parseInt(c, 16) + amount)).toString(16)).substr(-2));
};


export const ShapeViewer3D: React.FC<ShapeViewer3DProps> = ({ name, color, className = 'w-24 h-24', isAnimated = true }) => {
  const faceBaseClasses = 'absolute w-full h-full border-2';
  
  const renderShape = () => {
    const baseColor = color;
    const borderColor = adjustColor(color, -60);

    switch (name) {
      case 'Cube':
        return (
          <div className={`relative w-full h-full ${isAnimated ? 'animate-spin-slow' : ''}`} style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(30deg)' }}>
            <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, transform: 'rotateY(0deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, transform: 'rotateY(90deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, transform: 'rotateY(180deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, transform: 'rotateY(-90deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, transform: 'rotateX(90deg) translateZ(calc(var(--size) / 2))' }}></div>
            <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, transform: 'rotateX(-90deg) translateZ(calc(var(--size) / 2))' }}></div>
          </div>
        );
      case 'Sphere':
         return (
             <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle at 35% 35%, white, ${color})`, transform: 'rotateY(20deg)' }}></div>
         );
      case 'Cylinder':
        const cylTopCap = adjustColor(color, 20);
        const cylBottomCap = adjustColor(color, -60);
        const cylBodyGradient = `linear-gradient(to right, ${adjustColor(color, -80)}, ${adjustColor(color, 40)}, ${adjustColor(color, -80)})`;
        return (
           <div className={`relative w-full h-full flex items-center justify-center ${isAnimated ? 'animate-spin-slow' : ''}`} style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(30deg)' }}>
                <div className="absolute w-full h-[80%]" style={{ backgroundImage: cylBodyGradient }}></div>
                <div className="absolute top-[10%] w-full h-[30px] rounded-full" style={{ backgroundColor: cylTopCap, transform: 'rotateX(75deg)' }}></div>
                <div className="absolute bottom-[10%] w-full h-[30px] rounded-full" style={{ backgroundColor: cylBottomCap, transform: 'rotateX(75deg)' }}></div>
           </div>
        );
      case 'Cone':
          const coneBodyGradient = `linear-gradient(to right, ${adjustColor(color, -60)}, ${adjustColor(color, 40)}, ${adjustColor(color, -60)})`;
          const coneBottomColor = adjustColor(color, -40);
          const coneBorderColor = adjustColor(color, -80);
          return (
              <div className={`relative w-full h-full flex items-end justify-center ${isAnimated ? 'animate-spin-slow' : ''}`} style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateY(30deg)' }}>
                  <div className="w-[80%] h-[80%]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', backgroundImage: coneBodyGradient }}></div>
                  <div className="absolute bottom-[-10px] w-[80%] h-[30px] rounded-full" style={{ backgroundColor: coneBottomColor, border: `2px solid ${coneBorderColor}`, transform: 'rotateX(90deg)' }}></div>
              </div>
          );
      case 'Pyramid':
          return (
            <div className={`relative w-full h-full ${isAnimated ? 'animate-spin-slow' : ''}`} style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(30deg)' }}>
                <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotateY(0deg) translateZ(calc(var(--size) / 2.8)) rotateX(20deg)' }}></div>
                <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotateY(90deg) translateZ(calc(var(--size) / 2.8)) rotateX(20deg)' }}></div>
                <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotateY(180deg) translateZ(calc(var(--size) / 2.8)) rotateX(20deg)' }}></div>
                <div className={faceBaseClasses} style={{ backgroundColor: baseColor, borderColor, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotateY(-90deg) translateZ(calc(var(--size) / 2.8)) rotateX(20deg)' }}></div>
            </div>
          );
      case 'Cuboid':
        const faceClasses = `absolute border-2`;
        const width = 'var(--size)';
        const height = 'calc(var(--size) * 0.6)';
        const depth = 'calc(var(--size) * 0.8)';
        return (
          <div className={`relative w-full h-full ${isAnimated ? 'animate-spin-slow' : ''}`} style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(30deg)', width, height }}>
            {/* Front/Back */}
            <div className={faceClasses} style={{ backgroundColor: baseColor, borderColor, width: '100%', height: '100%', transform: `translateZ(calc(${depth} / 2))` }}></div>
            <div className={faceClasses} style={{ backgroundColor: baseColor, borderColor, width: '100%', height: '100%', transform: `rotateY(180deg) translateZ(calc(${depth} / 2))` }}></div>
            {/* Left/Right */}
            <div className={faceClasses} style={{ backgroundColor: baseColor, borderColor, width: depth, height: '100%', left: `calc(50% - ${depth} / 2)`, transform: `rotateY(90deg) translateZ(calc(${width} / 2))` }}></div>
            <div className={faceClasses} style={{ backgroundColor: baseColor, borderColor, width: depth, height: '100%', left: `calc(50% - ${depth} / 2)`, transform: `rotateY(-90deg) translateZ(calc(${width} / 2))` }}></div>
            {/* Top/Bottom */}
            <div className={faceClasses} style={{ backgroundColor: baseColor, borderColor, width: '100%', height: depth, top: `calc(50% - ${depth} / 2)`, transform: `rotateX(90deg) translateZ(calc(${height} / 2))` }}></div>
            <div className={faceClasses} style={{ backgroundColor: baseColor, borderColor, width: '100%', height: depth, top: `calc(50% - ${depth} / 2)`, transform: `rotateX(-90deg) translateZ(calc(${height} / 2))` }}></div>
          </div>
        );
      case 'Torus':
        const torusBodyColor = color;
        const torusInnerShadow = adjustColor(color, -60);
        const torusOuterGlow = adjustColor(color, 20);
        return (
            <div className={`w-[90%] h-[90%] rounded-full ${isAnimated ? 'animate-spin-slow' : ''}`} style={{ 
                border: `20px solid ${torusBodyColor}`,
                boxShadow: `inset 0 0 15px ${torusInnerShadow}, 0 0 5px ${torusOuterGlow}`,
                transform: 'rotateX(60deg)'
            }}></div>
        );
      default:
        return <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 p-2 text-xs">3D View Not Available</div>;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ '--size': '6rem' } as React.CSSProperties}>
       {renderShape()}
    </div>
  );
};