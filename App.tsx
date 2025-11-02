import React, { useState, useMemo } from 'react';
import { SHAPES } from './constants';
import { Shape } from './types';
import { ShapeCard } from './components/ShapeCard';
import { Header } from './components/Header';
import { ShapeModal } from './components/ShapeModal';
import { AnimatePresence } from 'framer-motion';

type ViewMode = 'All' | '2D' | '3D' | '4D';

const App: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('All');

  const handleSelectShape = (shape: Shape) => {
    setSelectedShape(shape);
  };

  const handleCloseModal = () => {
    setSelectedShape(null);
  };

  const filteredShapes = useMemo(() => {
    if (viewMode === 'All') return SHAPES;
    return SHAPES.filter(shape => shape.type === viewMode);
  }, [viewMode]);

  const FilterButton: React.FC<{mode: ViewMode, children: React.ReactNode}> = ({ mode, children }) => {
    const isActive = viewMode === mode;
    const baseClasses = "px-6 py-3 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105";
    const activeClasses = "bg-white text-blue-600 shadow-lg";
    const inactiveClasses = "bg-white/50 text-slate-600 hover:bg-white/80";

    return (
        <button onClick={() => setViewMode(mode)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
  };


  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <Header />
      
      <div className="flex justify-center items-center gap-2 sm:gap-4 my-8 flex-wrap">
        <FilterButton mode="All">All Shapes</FilterButton>
        <FilterButton mode="2D">2D Shapes</FilterButton>
        <FilterButton mode="3D">3D Shapes</FilterButton>
        <FilterButton mode="4D">4D Shapes</FilterButton>
      </div>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredShapes.map(shape => (
              <ShapeCard key={shape.name} shape={shape} onSelect={handleSelectShape} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {selectedShape && <ShapeModal shape={selectedShape} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;