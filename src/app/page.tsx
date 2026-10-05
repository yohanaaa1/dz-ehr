import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import RibbonSeparator from '@/app/components/RibbonSeparator';
import WhyDZEHR from '@/app/components/WhyDZEHR';
import KeyServices from '@/app/components/KeyServices';
import HealthcareInstitutions from '@/app/components/HealthcareInstitutions';
import NationalStats from '@/app/components/NationalStats';
import ContactSection from '@/app/components/ContactSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <RibbonSeparator />
      <WhyDZEHR />
      <KeyServices />
      <RibbonSeparator thin />
      <HealthcareInstitutions />
      <NationalStats />
      <ContactSection />
      <Footer />
    </main>
  );
}