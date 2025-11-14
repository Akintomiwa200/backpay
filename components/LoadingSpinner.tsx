'use client';

import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingSpinner = ({
  message = 'Loading...',
  fullScreen = true,
  className = '',
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${fullScreen ? 'min-h-screen' : ''} ${className}`}
    >
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute w-full h-full rounded-full border-4 border-gray-200"></div>
        {/* Spinning ring */}
        <div className="absolute w-full h-full rounded-full border-4 border-t-primary-500 border-r-primary-500 animate-spin"></div>
      </div>
      {message && (
        <p className="mt-4 text-gray-500 text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
