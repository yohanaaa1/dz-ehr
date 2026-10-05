'use client';
import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const features = [
  {
    icon: 'ShieldCheckIcon',
    title: 'Sécurité & Confidentialité',
    desc: 'Chiffrement de bout en bout. Accès contrôlé par identifiant national biométrique. Vos données médicales sont protégées par les plus hauts standards.',
    color: 'text-primary',
    bg: 'bg-primary/8',
    border: 'border-primary/15',
    wide: false,
  },
  {
    icon: 'BuildingOffice2Icon',
    title: 'Réseau National Interconnecté',
    desc: 'Tous les hôpitaux, cliniques, pharmacies et laboratoires d\'Algérie sont connectés à une base de données centrale. Consultez depuis n\'importe quel établissement.',
    color: 'text-accent',
    bg: 'bg-accent/8',
    border: 'border-accent/15',
    wide: true,
  },
  {
    icon: 'DocumentTextIcon',
    title: 'Dossier Médical Unique',
    desc: 'Un identifiant national unique pour chaque citoyen. Tous vos actes médicaux, paramédicaux et antécédents centralisés en un seul endroit.',
    color: 'text-primary',
    bg: 'bg-primary/8',
    border: 'border-primary/15',
    wide: false,
  },
  {
    icon: 'ClockIcon',
    title: 'Gain de Temps & Efficacité',
    desc: 'Élimination des examens répétés. Accès immédiat aux résultats, ordonnances et historique. Moins de paperasse, plus de soins.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    wide: false,
  },
  {
    icon: 'DevicePhoneMobileIcon',
    title: 'Accessible Partout',
    desc: 'Depuis votre smartphone, tablette ou ordinateur — accédez à votre dossier médical national 24h/24, 7j/7.',
    color: 'text-primary',
    bg: 'bg-primary/8',
    border: 'border-primary/15',
    wide: false,
  },
];

export default function WhyDZEHR() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    const cards = sectionRef.current?.querySelectorAll('.reveal-card');
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 bg-white" ref={sectionRef}>
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full accent-line" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Notre Mission</span>
            </div>
            <h2 className="text-display text-foreground mb-4">
              Pourquoi DZ EHR ?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Un système de santé numérique au service de chaque Algérien — conçu pour simplifier, sécuriser et moderniser l'accès aux soins.
            </p>
          </div>
          <div
            className="flex-shrink-0 px-6 py-4 rounded-2xl border border-border bg-secondary"
          >
            <div className="text-3xl font-extrabold text-primary mb-1">2025–2026</div>
            <div className="text-sm text-muted-foreground font-medium">Déploiement national progressif</div>
          </div>
        </div>

        {/* BENTO GRID AUDIT for WhyDZEHR:
          Array: [Security, Network(wide), UniqueRecord, TimeEfficiency, Accessible]
          Row 1: [col1-2: Security cs-1] [col3-5: Network cs-2] [col5-6: (needs 3rd col)]
          Layout: 3-col grid, Network spans 2
          Row 1: [Security cs-1] [Network cs-2]
          Row 2: [UniqueRecord cs-1] [TimeEfficiency cs-1] [Accessible cs-1]
          Placed 5/5 ✓
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Security — col 1, row 1 */}
          <FeatureCard feature={features[0]} delay={0} />

          {/* Network — col 2-3, row 1 (wide) */}
          <div className="lg:col-span-2">
            <FeatureCard feature={features[1]} delay={100} />
          </div>

          {/* UniqueRecord — col 1, row 2 */}
          <FeatureCard feature={features[2]} delay={150} />

          {/* TimeEfficiency — col 2, row 2 */}
          <FeatureCard feature={features[3]} delay={200} />

          {/* Accessible — col 3, row 2 */}
          <FeatureCard feature={features[4]} delay={250} />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, delay }: { feature: typeof features[0]; delay: number }) {
  return (
    <div
      className={`reveal-card opacity-100 group bg-white rounded-2xl p-8 border ${feature.border} card-lift h-full`}
      style={{ transitionDelay: `${delay}ms`, boxShadow: '0 2px 12px rgba(10,110,209,0.06)' }}
    >
      <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
        <Icon name={feature.icon as any} size={22} className={feature.color} />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
      <div className={`mt-5 w-8 h-0.5 rounded-full ${feature.bg.replace('/8', '')} group-hover:w-16 transition-all duration-300`}
        style={{ background: feature.color.replace('text-', '').includes('primary') ? 'var(--primary)' : feature.color.includes('accent') ? 'var(--accent)' : '#f97316' }}
      />
    </div>
  );
}