import React from 'react';

interface LoaderProps {
  style?: React.CSSProperties;
  className?: string;
}
const Loader: React.FC<LoaderProps> = ({ style, className }) => {
  return (
    <span
      className={`animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle ${className}`}
      style={style}
    ></span>
  );
};
export default Loader;
