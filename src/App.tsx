import { MotionConfig } from 'motion/react';
import { useState } from 'react';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FoundersSection } from './components/FoundersSection';
import { GrowthPeakSection } from './components/GrowthPeakSection';
import { HeroSection } from './components/HeroSection';
import { InquiryModal } from './components/InquiryModal';
import { Navbar } from './components/Navbar';
import { PackagesSection } from './components/PackagesSection';
import { ProtocolSection } from './components/ProtocolSection';
import { ReelsSection } from './components/ReelsSection';
import { ResultsSection } from './components/ResultsSection';

export default function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (packageName?: string) => {
    setSelectedPackage(packageName);
    setInquiryOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FCFBF9] text-[#0D0F14] flex flex-col">
        <Navbar onOpenInquiry={handleOpenInquiry} />

        <main className="flex-1">
          <HeroSection onOpenInquiry={handleOpenInquiry} />
          <ResultsSection />
          <ReelsSection onOpenInquiry={handleOpenInquiry} />
          <ProtocolSection />
          <PackagesSection onSelectPackage={handleOpenInquiry} />
          <GrowthPeakSection />
          <FoundersSection />
          <FaqSection />
        </main>

        <Footer onOpenInquiry={handleOpenInquiry} />

        <InquiryModal
          isOpen={inquiryOpen}
          initialPackage={selectedPackage}
          onClose={() => setInquiryOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
