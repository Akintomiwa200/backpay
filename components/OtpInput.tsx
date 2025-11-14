'use client';

import React, { useEffect, useRef } from 'react';

export interface OtpInputProps {
  value?: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  numInputs?: number;
  isDisabled?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  value = '',
  onChange,
  onComplete,
  numInputs = 4,
  isDisabled = false,
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (value.length === numInputs) {
      onComplete?.(value);
    }
  }, [value, numInputs, onComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 1); // allow only digits
    const newValue = value.substring(0, idx) + val + value.substring(idx + 1);
    onChange(newValue);

    if (val && idx < numInputs - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: numInputs }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          disabled={isDisabled}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}          
          value={value[idx] || ''}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-16 h-16 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
