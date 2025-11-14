// app/transfer/[id]/page.tsx
'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import StageWrapper from '@/components/StageWrapper';
import TransferConfirmation from '@/components/TransferConfirmation';
import { useGetOrderQuery } from '@/hooks/use-get-order.query';

// Comprehensive list of Nigerian banks
const nigerianBanks = {
  // Tier 1 Banks
  gtbank: {
    bankLogo: '/images/banks/guaranty-trust-bank.svg',
    bankName: 'Guaranty Trust Bank',
    code: '058',
  },
  zenith: {
    bankLogo: '/images/banks/zenith-logo.png',
    bankName: 'Zenith Bank',
    code: '057',
  },
  access: {
    bankLogo: '/images/banks/access-bank-plc.svg',
    bankName: 'Access Bank',
    code: '044',
  },
  firstbank: {
    bankLogo: '/images/banks/firstbank-logo.png',
    bankName: 'First Bank of Nigeria',
    code: '011',
  },
  uba: {
    bankLogo: '/images/banks/uba-logo.png',
    bankName: 'United Bank for Africa',
    code: '033',
  },

  // Tier 2 Banks
  fidelity: {
    bankLogo: '/images/banks/fidelity-logo.png',
    bankName: 'Fidelity Bank',
    code: '070',
  },
  stanbic: {
    bankLogo: '/images/banks/stanbic-logo.png',
    bankName: 'Stanbic IBTC Bank',
    code: '221',
  },
  union: {
    bankLogo: '/images/banks/union-logo.png',
    bankName: 'Union Bank',
    code: '032',
  },

  // Digital Banks
  kuda: {
    bankLogo: '/images/banks/kuda-logo.png',
    bankName: 'Kuda Bank',
    code: '50211',
  },
  opay: {
    bankLogo: '/images/banks/OPay.svg',
    bankName: 'OPay',
    code: '566',
  },

  // Other notable banks
  polaris: {
    bankLogo: '/images/banks/polaris-logo.png',
    bankName: 'Polaris Bank',
    code: '076',
  },
  sterling: {
    bankLogo: '/images/banks/sterling-logo.png',
    bankName: 'Sterling Bank',
    code: '232',
  },
  keystone: {
    bankLogo: '/images/banks/keystone-logo.png',
    bankName: 'Keystone Bank',
    code: '082',
  },
  ecobank: {
    bankLogo: '/images/banks/ecobank-logo.png',
    bankName: 'Ecobank Nigeria',
    code: '050',
  },
  heritage: {
    bankLogo: '/images/banks/heritage-logo.png',
    bankName: 'Heritage Bank',
    code: '030',
  },
  wema: {
    bankLogo: '/images/banks/wema-logo.png',
    bankName: 'Wema Bank',
    code: '035',
  },
  providus: {
    bankLogo: '/images/banks/providus-logo.png',
    bankName: 'Providus Bank',
    code: '101',
  },
  titi: {
    bankLogo: '/images/banks/titan-logo.png',
    bankName: 'Titan Trust Bank',
    code: '102',
  },
};

const TransferPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading } = useGetOrderQuery();

  // Get the bank ID from the URL
  const bankId = params.id as string;
  const currentBank = nigerianBanks[bankId as keyof typeof nigerianBanks];

  // Get transfer data from query params (fallback to mock data if missing)
  const senderName = searchParams.get('sender') || 'Your Name';
  const wallet = searchParams.get('wallet') || '1234-5678-9012';
  const accountNumber = searchParams.get('accountNumber') || '0245678910';
  const accountName = searchParams.get('accountName') || 'John Doe';
  const amount = searchParams.get('amount') || '50,000.00';
  const qpBankName = searchParams.get('bankName');
  const qpBankCode = searchParams.get('bankCode');
  const qpBankLogo = searchParams.get('bankLogo');

  // If not in hardcoded list, use query params for bank details
  const isCustomBank = !currentBank && qpBankName;
  const transferData = isCustomBank
    ? {
        amount,
        accountNumber,
        accountName,
        bankName: qpBankName,
        code: qpBankCode || 'N/A',
        bankLogo: qpBankLogo || '/images/banks/default-bank.svg',
      }
    : {
        amount,
        accountNumber,
        accountName,
        ...currentBank,
      };

  // if (!currentBank && !isCustomBank) {
  //   return (
  //     <StageWrapper>
  //       <div className="flex flex-col items-center justify-center min-h-screen p-4">
  //         <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
  //           <h2 className="text-xl font-bold text-red-600 mb-2">
  //             Invalid Bank
  //           </h2>
  //           <p className="text-gray-600 mb-4">
  //             The bank you're trying to transfer to doesn't exist or isn't
  //             supported.
  //           </p>
  //           <button
  //             onClick={() => router.push('/')}
  //             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  //           >
  //             Go Back Home
  //           </button>
  //         </div>
  //       </div>
  //     </StageWrapper>
  //   );
  // }

  const handleConfirm = () => {
    // Format WhatsApp receipt message
    const message =
      `You have successfully transferred ₦${amount} to ${accountName} (${accountNumber}) at ${currentBank.bankName}.\n` +
      `Sender: ${senderName}\n` +
      `Wallet: ${wallet}\n` +
      `This message serves as your ${'receipt'}.`;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/2349065577709?text=${encodedMessage}`;
  };

  const handleCancel = () => {
    console.log('Transfer cancelled');
    router.push('/');
  };

  console.log({ data });

  return (
    <StageWrapper>
      <TransferConfirmation
        bankLogo={transferData.bankLogo}
        amount={data?.data?.amount}
        accountNumber={data?.data?.account_number}
        accountName={data?.data?.account_name}
        bankName={data?.data?.bank_name}
        type={data?.data?.type}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </StageWrapper>
  );
};

export default TransferPage;
