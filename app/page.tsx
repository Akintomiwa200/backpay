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

export const metadata = {
  title: 'Laskad - WhatsApp Payments Platform',
  description:
    'A conversational payments platform that turns WhatsApp into a powerful tool for financial transactions.',
  icons: {
    icon: '../images/banks/Laskad_secondary_logo_2.png',
  },
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <TransferSection />
      <SecuritySection />
      <PartnersBanner />
      <SupportSection />
      <FeaturesSection />
      <WhatsAppSecuritySection />
      <UseCasesSection />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
      <Footer />
    </main>
  );
}
