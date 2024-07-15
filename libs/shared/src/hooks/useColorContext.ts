import { useContext } from 'react';
import { ColorContext, ColorContextType } from '../contexts/ColorContext';

export const useColorContext = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within an ColorProvider');
  }
  return context;
};
