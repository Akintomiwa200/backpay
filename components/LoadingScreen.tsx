'use client';

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = 'Loading purchase details...' }: LoadingScreenProps) => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center">
      <LoadingSpinner message={message} fullScreen />
    </div>
  );
};

export default LoadingScreen;