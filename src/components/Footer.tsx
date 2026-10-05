import React from 'react';

import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="max-w-[1440px] mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + copyright */}
        <div className="flex items-center gap-4">
          <AppLogo size={32} />
          <div>
            <span className="font-bold text-base text-primary tracking-tight">DZ EHR</span>
            <p className="text-xs text-muted-foreground mt-0.5">© 2026 Ministère de la Santé — République Algérienne</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-primary transition-colors">Conditions</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
        </div>

        {/* Social */}
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-primary/5 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
            <Icon name="GlobeAltIcon" size={16} />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-primary/5 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
            <Icon name="BuildingOffice2Icon" size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}