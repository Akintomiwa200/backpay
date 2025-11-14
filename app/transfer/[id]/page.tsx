'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useRegisterQuery } from '@/hooks/use-register.query';
import { useRegisterUserMutate } from '@/hooks/use-register.mutation';
import Image from 'next/image';
import { useGetOrderQuery } from '@/hooks/use-get-order.query';
import LoadingSpinner from '@/components/LoadingSpinner';
import { usePayMutation } from '@/hooks/use-pay.mutation';
import { useCancelTransactionMutation } from '@/hooks/use-cancel-transaction.mutation';

const SuccessState = () => (
  <div className="text-center animate-fade-in">
    <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center animate-bounce-gentle">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    <h3 className="text-2xl font-bold text-success-700 mb-2">
      Transaction Successful!
    </h3>
    <p className="text-text-secondary mb-6">
      Your transfer of ₦{1000} has been completed successfully.
    </p>

    <div className="space-y-3">
      <button
        onClick={() => {}}
        className="w-full py-3 px-4 border border-border-medium text-text-secondary hover:text-text-primary hover:border-border-dark font-medium rounded-xl transition-colors duration-200"
      >
        Back to Whatsapp
      </button>
    </div>
  </div>
);

// Failed State Component
const FailedState = () => (
  <div className="text-center animate-fade-in">
    <div className="w-20 h-20 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <div className="w-16 h-16 bg-error-500 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>

    <h3 className="text-2xl font-bold text-error-700 mb-2">
      Transaction Failed
    </h3>
    <p className="text-text-secondary mb-6">
      We couldn't process your transfer at this time. Please try again.
    </p>

    <div className="space-y-3">
      {/* <button
        onClick={() => {}}
        className="w-full py-3 px-4 bg-error-600 hover:bg-error-700 text-white font-semibold rounded-xl transition-colors duration-200"
      >
        Try Again
      </button> */}
      <button
        onClick={() => {}}
        className="w-full py-3 px-4 border border-border-medium text-text-secondary hover:text-text-primary hover:border-border-dark font-medium rounded-xl transition-colors duration-200"
      >
        Contact Support
      </button>
    </div>
  </div>
);

// Not Found State Component
const NotFoundState = () => (
  <div className="text-center animate-fade-in">
    <div className="w-20 h-20 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <div className="w-16 h-16 bg-warning-500 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
    </div>

    <h3 className="text-2xl font-bold text-warning-700 mb-2">
      Transaction Not Found
    </h3>
    <p className="text-text-secondary mb-6">
      We couldn't find the transaction details you're looking for.
    </p>

    <div className="space-y-3">
      <button
        onClick={() => {}}
        className="w-full py-3 px-4 bg-warning-600 hover:bg-warning-700 text-white font-semibold rounded-xl transition-colors duration-200"
      >
        Start New Transaction
      </button>
      <button
        onClick={() => {}}
        className="w-full py-3 px-4 border border-border-medium text-text-secondary hover:text-text-primary hover:border-border-dark font-medium rounded-xl transition-colors duration-200"
      >
        Check Transaction History
      </button>
    </div>
  </div>
);

export default function PinVerificationPage() {
  // const { isError, error: errorRegister } = useRegisterQuery();
  // const {
  //   mutate,
  //   isPending,
  //   data: registerUserData,
  //   error: registerUserError,
  // } = useRegisterUserMutate();
  const [step, setStep] = useState<1 | 2>(1); // 1 = Set Pin, 2 = Confirm Pin
  const [pin, setPin] = useState<string[]>(Array(4).fill(''));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(4).fill(''));
  // const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [processId, setProcessId] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const {
    data,
    isLoading: getOrderQueryLoading,
    error,
    isError,
    isSuccess: isGetSuccess,
  } = useGetOrderQuery();

  const {
    isSuccess,
    isPending,
    mutate,
    data: mutationData,
    isError: isPayError,
    error: payError,
  } = usePayMutation();
  const {
    mutate: cancelMutate,
    isSuccess: isCancelSucess,
    data: cancelData,
    error: cancelError,
  } = useCancelTransactionMutation();

  const handlePinChange = (index: number, value: string, isConfirm = false) => {
    console.log({
      index,
      value,
      isConfirm,
    });
    if (!/^\d*$/.test(value)) return;

    const targetPin = isConfirm ? [...confirmPin] : [...pin];
    targetPin[index] = value;

    if (isConfirm) {
      setConfirmPin(targetPin);
      setPin(targetPin);
    } else {
      setPin(targetPin);
    }

    // Clear error when user starts typing
    // if (error) setError('');

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(
        isConfirm ? `confirm-pin-${index + 1}` : `pin-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    isConfirm = false
  ) => {
    const input = e.currentTarget as HTMLInputElement;

    if (e.key === 'Backspace' && !input.value && index > 0) {
      const prevInput = document.getElementById(
        isConfirm ? `confirm-pin-${index - 1}` : `pin-${index - 1}`
      ) as HTMLInputElement;

      prevInput?.focus();
    }
  };

  console.log({ cancelData, cancelError });

  const renderPinInputs = (pinArray: string[], isConfirm = true) => (
    <div className="flex justify-center gap-4">
      {pinArray.map((digit, index) => (
        <input
          key={`${isConfirm ? 'confirm-' : ''}pin-${index}`}
          id={`${isConfirm ? 'confirm-' : ''}pin-${index}`}
          type="password"
          maxLength={1}
          value={digit}
          onChange={(e) => handlePinChange(index, e.target.value, isConfirm)}
          onKeyDown={(e) => handleKeyDown(e, index, isConfirm)}
          className="w-12 h-12 text-center text-lg font-semibold border border-border-light rounded-md focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          autoFocus={index === 0}
          // @ts-ignore
          disabled={(isError && error?.status === 404) || isCancelSucess}
        />
      ))}
    </div>
  );
  function formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isGetSuccess) {
      setTimeLeft(data?.data?.duration);
    }
  }, [isGetSuccess]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    } else {
      setIsExpired(false);
    }

    if (isSuccess || isCancelSucess) {
      window.location.href = 'https://wa.me/2349065577709';
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (getOrderQueryLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background-secondary via-primary-50 to-secondary-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background-secondary via-primary-50 to-secondary-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <NotFoundState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-secondary via-primary-50 to-secondary-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header Section */}

        <div className="flex flex-col items-center animate-fade-in">
          {/* Logo/Icon */}
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 shadow-medium">
            <Image
              src="/images/banks/laskad_png_transparent.png"
              alt="Laskad Logo"
              width={16}
              height={16}
              className="w-full h-full"
            />
          </div>

          {/* Transaction Type */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 mb-4">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Transfer
          </div>

          {/* Amount */}
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-text-primary mb-2">
              ₦{formatAmount(data?.data?.amount)}
            </p>
            <div className="space-y-1">
              <p className="text-text-secondary text-base">
                To: <br />
                <span className="font-medium text-text-primary">
                  {data?.data?.account_name}
                </span>
              </p>
              <p className="text-text-tertiary text-sm">
                {data?.data?.account_number} <br />{' '}
                {data?.data?.account_bank || data?.data?.bank_name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PIN Input Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-slide-up">
        <div className="bg-white py-8 px-6 shadow-soft rounded-2xl border border-border-light">
          <div className="space-y-6">
            {(isError || isPayError) && (
              <div className="rounded-md bg-error-50 border border-error-200 p-4 animate-fade-in">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-error-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-error-800">
                      {
                        // @ts-ignore
                        error?.response?.data?.error ||
                          // @ts-ignore
                          payError?.response?.data?.message
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Enter your PIN
              </h3>
              <p className="text-text-secondary text-sm mb-6">
                Please enter your 4-digit PIN to authorize this transaction
              </p>
              {renderPinInputs(pin)}
            </div>
            {/* Error Message */}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  mutate({
                    oid: searchParams.get('oid') as string,
                    pin: pin.join(''),
                    type: data?.data?.type,
                  });
                }}
                disabled={
                  confirmPin.some((digit) => digit === '') || isCancelSucess
                }
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-soft text-base font-semibold text-white bg-gradient-primary hover:shadow-medium focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isPending ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    loading...
                  </div>
                ) : (
                  'Confirm Transaction'
                )}
              </button>

              {/* Cancel Section */}
              <div className="text-center pt-4 border-t border-border-light">
                <button
                  type="button"
                  onClick={() => {
                    cancelMutate(searchParams.get('oid') as string);
                  }}
                  className="cursor-pointer text-sm font-medium text-text-tertiary hover:text-error-600 transition-colors duration-200"
                >
                  Cancel Transaction
                </button>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  Your PIN is encrypted and used only to secure this transaction
                </p>
                <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                  <span>⏱ {formatTime(timeLeft)}</span>
                  <div className="flex items-center">
                    <span className="text-xs text-text-muted leading-relaxed">
                      Secured by
                    </span>
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
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-border-light shadow-soft">
            <svg
              className="w-4 h-4 text-success-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-xs font-medium text-text-secondary">
              256-bit SSL encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
    // <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    //   <Head>
    //     <title>Enter pin - Laskad</title>
    //     <meta
    //       name="description"
    //       content="Create a secure 4-digit PIN for your Laskad account"
    //     />
    //   </Head>

    //   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //     <div className="flex flex-col items-center">
    //       {/* <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
    //         <Image
    //           src={bankLogo}
    //           alt={`${bankName} logo`}
    //           width={40}
    //           height={40}
    //           className="object-contain"
    //         />
    //       </div> */}

    //       <div className="flex justify-center">
    //         <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
    //           <svg
    //             className="w-6 h-6 text-white"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    //             />
    //           </svg>
    //         </div>
    //       </div>
    //       <h2 className="text-lg  text-gray-700 my-2">Transfer</h2>
    //       <p className="text-2xl font-bold my-2">₦{1000}</p>
    //       <div className=" text-center">
    //         <p className="text-gray-600">To: {'Mbiplang Ardel Nathaniel'}</p>
    //         <p className="text-gray-800 font-medium">
    //           {'3039094800'} • {'First Bank'}
    //         </p>
    //       </div>
    //     </div>
    //     {/* <p className="mt-2 text-center text-sm text-gray-600">
    //       Enter 4-digit pin
    //     </p> */}
    //   </div>

    //   <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
    //     <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
    //       <form onSubmit={handleSubmit} className="space-y-8">
    //         {step === 1 ? (
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 text-center mb-4">
    //               Enter your 4-digit pin
    //             </label>
    //             {renderPinInputs(pin)}
    //           </div>
    //         ) : (
    //           <div>
    //             <label className="block text-sm font-medium text-gray-700 text-center mb-4">
    //               Confirm your PIN
    //             </label>
    //             {renderPinInputs(confirmPin, true)}
    //           </div>
    //         )}

    //         {error && (
    //           <div className="rounded-md bg-red-50 p-4">
    //             <div className="flex">
    //               <div className="flex-shrink-0">
    //                 <svg
    //                   className="h-5 w-5 text-red-400"
    //                   viewBox="0 0 20 20"
    //                   fill="currentColor"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //               </div>
    //               <div className="ml-3">
    //                 <p className="text-sm text-red-800">{error}</p>
    //               </div>
    //             </div>
    //           </div>
    //         )}

    //         <div className="space-y-4">
    //           <button
    //             type="button"
    //             onClick={() => {}}
    //             disabled={pin.some((digit) => digit === '') || !processId}
    //             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    //           >
    //             Confirm
    //           </button>

    //           <div className="text-center">
    //             <p className="text-xs text-gray-400 font-semibold my-2">
    //               Cancel transaction
    //             </p>
    //             <p className="text-xs text-gray-500">
    //               Your PIN will be used to secure sensitive account actions
    //             </p>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}
