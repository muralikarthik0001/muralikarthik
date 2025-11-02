import React from 'react';
import { Shape } from '../types';
import { ShapeViewer2D } from './ShapeViewer2D';
import { ShapeViewer3D } from './ShapeViewer3D';
import { ShapeViewer4D } from './ShapeViewer4D';
import { motion } from 'framer-motion';

interface ShapeCardProps {
  shape: Shape;
  onSelect: (shape: Shape) => void;
}

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '';
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const ShapeCard: React.FC<ShapeCardProps> = ({ shape, onSelect }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const renderViewer = () => {
    switch (shape.type) {
      case '2D':
        return <ShapeViewer2D name={shape.name} color={shape.color} className="w-24 h-24 sm:w-32 sm:h-32"/>;
      case '3D':
        return <ShapeViewer3D name={shape.name} colorName={shape.colorName} color={shape.color} className="w-24 h-24 sm:w-32 sm:h-32" />;
      case '4D':
        return <ShapeViewer4D name={shape.name} color={shape.color} className="w-24 h-24 sm:w-32 sm:h-32" />;
      default:
        return null;
    }
  };

  const shadowRgba = hexToRgba(shape.color, 0.4);
  const cardStyle: React.CSSProperties = {
    borderColor: shape.color,
    boxShadow: isHovered ? `0 10px 25px -5px ${shadowRgba}, 0 8px 10px -6px ${shadowRgba}` : 'none',
    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={() => onSelect(shape)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={cardStyle}
      className={`bg-white rounded-2xl p-4 flex flex-col items-center justify-between cursor-pointer border-4 transform hover:-translate-y-2 aspect-square`}
    >
      <div className="flex-grow flex items-center justify-center w-full">
        {renderViewer()}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mt-4 text-center">{shape.name}</h3>
    </motion.div>
  );
};