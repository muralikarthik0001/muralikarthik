import React from 'react';

interface ShapeViewer2DProps {
  name: string;
  color: string;
  className?: string;
}

export const ShapeViewer2D: React.FC<ShapeViewer2DProps> = ({ name, color, className = 'w-24 h-24' }) => {
  const renderShape = () => {
    switch (name) {
      case 'Circle':
        return <circle cx="50" cy="50" r="45" fill={color} />;
      case 'Square':
        return <rect x="5" y="5" width="90" height="90" fill={color} />;
      case 'Rectangle':
        return <rect x="5" y="20" width="90" height="60" fill={color} />;
      case 'Triangle':
        return <polygon points="50,5 95,95 5,95" fill={color} />;
      case 'Star':
        return <polygon points="50,5 61,40 98,40 68,62 79,96 50,75 21,96 32,62 2,40 39,40" fill={color} />;
      case 'Pentagon':
        return <polygon points="50,5 95,39 79,95 21,95 5,39" fill={color} />;
      case 'Hexagon':
        return <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill={color} />;
      case 'Oval':
        return <ellipse cx="50" cy="50" rx="45" ry="30" fill={color} />;
      case 'Rhombus':
        return <polygon points="50,5 90,50 50,95 10,50" fill={color} />;
      case 'Heart':
        return <path d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z" fill={color} />;
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {renderShape()}
    </svg>
  );
};