'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import OtpInput from '@/components/OtpInput';
import { usePayMutation } from '@/hooks/use-pay.mutation';
import { useSearchParams } from 'next/navigation';

interface PurchaseConfirmationProps {
  imageSrc: string;
  className?: string;
  type: 'airtime' | 'data';
  amount: string;
  phoneNumber: string;
  countdownSeconds?: number;
  dataBundle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const PurchaseConfirmation: React.FC<PurchaseConfirmationProps> = ({
  imageSrc,
  className = '',
  type,
  amount,
  phoneNumber,
  countdownSeconds = 120,
  dataBundle,
  onConfirm,
  onCancel,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(countdownSeconds);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const { isSuccess, isPending, mutate, data } = usePayMutation();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirm = (): void => {
    mutate({
      oid: searchParams.get('oid') as string,
      pin: otp,
      type: type,
    });
  };

  const handleCancel = (): void => {
    onCancel?.();
  };

  const handleOtpComplete = (value: string): void => {
    setOtp(value);
  };

  useEffect(() => {
    if (data?.success) {
      window.location.href = 'https://wa.me/2349065577709';
    }
  }, [data]);

  return (
    <div className={`w-full max-w-md mx-auto rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Image
            src={imageSrc}
            alt={`${type} logo`}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          {type === 'data' ? 'Data Purchase' : 'Airtime Purchase'}
        </h2>
        <p className="text-2xl font-bold mt-2">₦{amount}</p>

        <div className="mt-6 text-center">
          {type === 'data' && dataBundle && (
            <p className="text-gray-800 font-medium mb-2">{dataBundle}</p>
          )}
          <p className="text-gray-600">To: {phoneNumber}</p>
        </div>
      </div>

      <div className="mb-6">
        {!isConfirmed && !isExpired && (
          <OtpInput
            value={otp}
            onChange={(value: string) => setOtp(value)}
            numInputs={4}
            isDisabled={isExpired}
            onComplete={handleOtpComplete}
          />
        )}
      </div>

      <div className="flex flex-col space-y-3">
        {isPending && (
          <button
            disabled={isPending}
            className="py-3 px-4 rounded-lg font-medium bg-gray-200 text-gray-500"
          >
            Processing...
          </button>
        )}
        {!isPending && (
          <button
            onClick={handleConfirm}
            disabled={
              isPending || isConfirmed || isExpired || otp.length !== 4
            }
            className={`py-3 px-4 rounded-lg font-medium ${
              isConfirmed
                ? 'bg-green-100 text-green-800'
                : isExpired
                  ? 'bg-gray-200 text-gray-500'
                  : otp.length === 4
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500'
            }`}
          >
            {isConfirmed
              ? 'Purchase Completed'
              : isExpired
                ? 'Session Expired'
                : otp.length === 4
                  ? 'Confirm Purchase'
                  : 'Enter OTP'}
          </button>
        )}

        <button
          onClick={handleCancel}
          className="py-3 px-4 rounded-lg font-medium text-red-600 border border-red-600 hover:bg-red-50"
        >
          Cancel Transaction
        </button>
      </div>

      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <span>⏱ {formatTime(timeLeft)}</span>
        <div className="flex items-center">
          <span>Secured by</span>
          <Image
            src="/images/laskad-logo.png"
            alt="Laskad Logo"
            width={68}
            height={68}
          />
        </div>
      </div>

      {isExpired && (
        <div className="mt-4 text-center text-red-500 text-sm">
          Session expired. Please start a new purchase.
        </div>
      )}
    </div>
  );
};

export default PurchaseConfirmation;