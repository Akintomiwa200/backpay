// StageWrapper.tsx
import React from "react";

interface StageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const StageWrapper: React.FC<StageWrapperProps> = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen overflow-hidden flex items-center justify-center bg-[#fdf9f6] ${className}`}>
      <div className="bg-white rounded-xl w-full max-w-2xl">
        {children}
      </div>
    </div>
  );
};

export default StageWrapper;