'use client';

import { useRouter, useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import StageWrapper from '@/components/StageWrapper';
import AirtimeConfirmation from '@/components/AirtimeConfirmationProps';
import { useGetOrderQuery } from '@/hooks/use-get-order.query';
import { usePayMutation } from '@/hooks/use-pay.mutation';
import LoadingScreen from '@/components/LoadingScreen';

const nigerianNetworks = {
  mtn: {
    imageSrc: '/images/mtn-logo.png',
    name: 'MTN Nigeria',
  },
  airtel: {
    imageSrc: '/images/airtel-logo.png',
    name: 'Airtel Nigeria',
  },
  glo: {
    imageSrc: '/images/glo-logo.png',
    name: 'Glo Nigeria',
  },
  '9mobile': {
    imageSrc: '/images/9mobile-logo.png',
    name: '9mobile',
  },
  jedc: {
    imageSrc: '/images/jedc-logo.png',
    name: 'JEDC',
  },
  aedc: {
    imageSrc: '/images/aedc-logo.png',
    name: 'AEDC',
  },
} as const;

const PurchasePage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading } = useGetOrderQuery();

  if (isLoading) {
    return (
      <StageWrapper>
        <LoadingScreen />
      </StageWrapper>
    );
  }

  const networkId = params.id as keyof typeof nigerianNetworks;
  const currentNetwork = nigerianNetworks[networkId];

  // Get details from query params or API data
  const qpNetworkName = searchParams.get('networkName');
  const qpNetworkLogo = searchParams.get('networkLogo');
  const qpType = searchParams.get('type');
  const isCustomNetwork = !currentNetwork && qpNetworkName;

  if (!currentNetwork && !isCustomNetwork) {
    return (
      <StageWrapper>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Invalid Network
            </h2>
            <p className="text-gray-600 mb-4">
              The network you're trying to purchase from doesn't exist or isn't supported.
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </StageWrapper>
    );
  }

  const purchaseData = {
    imageSrc: currentNetwork?.imageSrc || qpNetworkLogo || '/images/networks/default-network.svg',
    type: data?.data?.type || qpType || 'airtime',
    amount: data?.data?.amount || searchParams.get('amount') || '1,000',
    phoneNumber: data?.data?.recipient || searchParams.get('phoneNumber') || '',
    duration: data?.data?.duration || 120,
    dataBundle: data?.data?.type === 'data' ? data.data.dataBundle : searchParams.get('dataBundle'),
    networkName: currentNetwork?.name || qpNetworkName || 'Unknown Network'
  };

  const handleConfirm = () => {
    const message = [
      `✅ Purchase Successful`,
      `Type: ${purchaseData.type === 'data' ? 'Data' : 'Airtime'}`,
      `Amount: ₦${purchaseData.amount}`,
      `Recipient: ${purchaseData.phoneNumber}`,
      `Network: ${purchaseData.networkName}`,
      ...(purchaseData.type === 'data' ? [`Data Bundle: ${purchaseData.dataBundle}`] : []),
      `\nThis serves as your receipt. Thank you for using our service!`
    ].join('\n');
    
    window.location.href = `https://wa.me/2349065577709?text=${encodeURIComponent(message)}`;
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <StageWrapper>
      <AirtimeConfirmation
        imageSrc={purchaseData.imageSrc}
        type={purchaseData.type}
        amount={purchaseData.amount}
        phoneNumber={purchaseData.phoneNumber}
        countdownSeconds={purchaseData.duration}
        dataBundle={purchaseData.dataBundle}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </StageWrapper>
  );
};

export default PurchasePage;