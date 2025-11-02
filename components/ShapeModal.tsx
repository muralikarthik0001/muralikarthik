import React from 'react';
import { Shape } from '../types';
import { ShapeViewer2D } from './ShapeViewer2D';
import { ShapeViewer3D } from './ShapeViewer3D';
import { ShapeViewer4D } from './ShapeViewer4D';

interface ShapeModalProps {
  shape: Shape;
  onClose: () => void;
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

export const ShapeModal: React.FC<ShapeModalProps> = ({ shape, onClose }) => {
  const renderViewer = () => {
    switch(shape.type) {
        case '2D':
            return <ShapeViewer2D name={shape.name} color={shape.color} className="w-full h-full max-w-[250px]"/>;
        case '3D':
            return <ShapeViewer3D name={shape.name} colorName={shape.colorName} color={shape.color} className="w-full h-full max-w-[250px]" isAnimated={true} />;
        case '4D':
            return <ShapeViewer4D name={shape.name} color={shape.color} className="w-full h-full max-w-[250px]" isAnimated={true} />;
        default:
            return null;
    }
  };

  const modalBgColor = hexToRgba(shape.color, 0.1);
  const titleTextColor = adjustColor(shape.color, -80);

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full p-2 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`rounded-2xl flex items-center justify-center p-6 aspect-square`} style={{ backgroundColor: modalBgColor }}>
                 {renderViewer()}
            </div>
            
            <div className="flex flex-col gap-4">
                 <h2 className={`text-4xl sm:text-5xl font-extrabold`} style={{ color: titleTextColor }}>{shape.name}</h2>
                 <p className="text-gray-600 text-lg">{shape.description}</p>
                 
                 <div className="mt-4">
                     <h4 className="text-xl font-bold text-gray-700 mb-2">Properties:</h4>
                     <ul className="space-y-2">
                        {Object.entries(shape.properties).map(([key, value]) => (
                             <li key={key} className="flex items-center text-lg">
                                <span className={`inline-block w-4 h-4 rounded-full mr-3`} style={{ backgroundColor: shape.color }}></span>
                                <span className="font-semibold text-gray-600">{key}:</span>
                                <span className="ml-2 text-gray-800">{value}</span>
                             </li>
                        ))}
                     </ul>
                 </div>
            </div>
        </div>
        
      </div>
    </div>
  );
};