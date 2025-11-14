import Hero from '@/components/sections/Hero';
import SecuritySection from '@/components/sections/SecuritySection';
import WhatsAppSecuritySection from '@/components/sections/WhatsAppSecuritySection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import TransferSection from '@/components/sections/TransferSection';
import SupportSection from '@/components/sections/SupportSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import PartnersBanner from '@/components/sections/PartnersBanner';
import BlockchainSection from '@/components/sections/BlockchainSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';

export const metadata = {
  title: 'BackPay - Web3 Financial Transactions via WhatsApp',
  description: 'Send and receive cryptocurrencies through WhatsApp. BackPay brings blockchain transactions to your favorite messaging app with enterprise-grade security.',
  keywords: 'crypto, WhatsApp, blockchain, Ethereum, cryptocurrency, Web3, digital payments',
  icons: {
    icon: '/images/logo/backpay-icon.png',
  },
  openGraph: {
    title: 'BackPay - Web3 Financial Transactions via WhatsApp',
    description: 'Send and receive cryptocurrencies through WhatsApp with BackPay',
    type: 'website',
    url: 'https://backpay.com',
    images: [
      {
        url: '/images/og/backpay-og.png',
        width: 1200,
        height: 630,
        alt: 'BackPay - Web3 Financial Transactions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BackPay - Web3 Financial Transactions via WhatsApp',
    description: 'Send and receive cryptocurrencies through WhatsApp',
    images: ['/images/og/backpay-og.png'],
  },
};

export default function Home() {
  return (
    <main className="overflow-hidden bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <PartnersBanner />
      <HowItWorksSection />
      <BlockchainSection />
      <FeaturesSection />
      <TransferSection />
      <SecuritySection />
      <WhatsAppSecuritySection />
      <UseCasesSection />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
      <Footer />
    </main>
  );
}