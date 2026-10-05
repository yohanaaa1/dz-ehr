'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    id: 1,
    icon: 'UserCircleIcon',
    title: 'Portail Citoyen',
    desc: 'Consultez et gérez votre dossier médical personnel depuis n\'importe quel appareil.',
    color: 'text-primary',
    bg: 'from-primary/10 to-primary/5',
    tag: 'Populaire',
    tagColor: 'bg-primary/10 text-primary',
    wide: true,
    tall: false,
  },
  {
    id: 2,
    icon: 'UserGroupIcon',
    title: 'Portail Professionnel',
    desc: 'Accès sécurisé pour médecins, spécialistes et personnels de santé.',
    color: 'text-accent',
    bg: 'from-accent/10 to-accent/5',
    tag: 'Pro',
    tagColor: 'bg-accent/10 text-accent',
    wide: false,
    tall: true,
  },
  {
    id: 3,
    icon: 'CalendarDaysIcon',
    title: 'Rendez-vous',
    desc: 'Planifiez et gérez vos rendez-vous médicaux en ligne.',
    color: 'text-orange-500',
    bg: 'from-orange-50 to-orange-50/50',
    tag: null,
    tagColor: '',
    wide: false,
    tall: false,
  },
  {
    id: 4,
    icon: 'ClipboardDocumentListIcon',
    title: 'Ordonnances Électroniques',
    desc: 'Prescriptions numériques sécurisées, accessibles aux pharmacies connectées.',
    color: 'text-primary',
    bg: 'from-primary/8 to-secondary',
    tag: null,
    tagColor: '',
    wide: false,
    tall: false,
  },
  {
    id: 5,
    icon: 'BeakerIcon',
    title: 'Résultats Laboratoire',
    desc: 'Recevez et consultez vos résultats d\'analyses directement dans votre dossier.',
    color: 'text-accent',
    bg: 'from-accent/8 to-accent-light',
    tag: null,
    tagColor: '',
    wide: false,
    tall: false,
  },
  {
    id: 6,
    icon: 'PhotoIcon',
    title: 'Imagerie Médicale',
    desc: 'Radiographies, scanners et IRM archivés et accessibles à vos médecins.',
    color: 'text-primary',
    bg: 'from-primary/6 to-secondary',
    tag: null,
    tagColor: '',
    wide: false,
    tall: false,
  },
  {
    id: 7,
    icon: 'ShieldExclamationIcon',
    title: 'Accès Urgence',
    desc: 'En situation critique, les équipes d\'urgence accèdent immédiatement à votre dossier.',
    color: 'text-red-500',
    bg: 'from-red-50 to-red-50/40',
    tag: 'Critique',
    tagColor: 'bg-red-50 text-red-600',
    wide: true,
    tall: false,
  },
  {
    id: 8,
    icon: 'ClipboardDocumentCheckIcon',
    title: 'Carnet de Vaccination',
    desc: 'Historique vaccinal numérique, mis à jour en temps réel.',
    color: 'text-accent',
    bg: 'from-accent/8 to-accent-light',
    tag: null,
    tagColor: '',
    wide: false,
    tall: false,
  },
];

export default function KeyServices() {
  return (
    <section id="services" className="py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full accent-line" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Services</span>
            <div className="w-1 h-5 rounded-full accent-line" />
          </div>
          <h2 className="text-display text-foreground mb-4">Services Numériques de Santé</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une suite complète de services digitaux pour les citoyens, les professionnels et les institutions de santé.
          </p>
        </div>

        {/* BENTO GRID AUDIT for KeyServices (8 cards):
          Array: [CitizenPortal(wide), ProfPortal(tall), Appointments, ePrescriptions, LabResults, Imaging, EmergencyAccess(wide), Vaccination]
          Grid: 4 cols

          Row 1: [col1-2: CitizenPortal cs-2] [col3: ProfPortal cs-1 rs-2] [col4: Appointments cs-1]
          Row 2: [col1: ePrescriptions] [col2: LabResults] [col3: FILLED by ProfPortal] [col4: Imaging]
          Row 3: [col1-2: EmergencyAccess cs-2] [col3: Vaccination cs-1] [col4: (last card expands)] 
          → Vaccination expands to col-span-2 to fill row 3
          Row 3 revised: [col1-2: EmergencyAccess cs-2] [col3-4: Vaccination cs-2]
          Placed 8/8 ✓
        */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {/* CitizenPortal — cs-2, rs-1 */}
          <ServiceCard service={services[0]} style={{ gridColumn: 'span 2' }} />

          {/* ProfPortal — cs-1, rs-2 */}
          <ServiceCard service={services[1]} style={{ gridColumn: 'span 1', gridRow: 'span 2' }} tall />

          {/* Appointments — cs-1 */}
          <ServiceCard service={services[2]} />

          {/* ePrescriptions — cs-1 */}
          <ServiceCard service={services[3]} />

          {/* LabResults — cs-1 */}
          <ServiceCard service={services[4]} />

          {/* Imaging — cs-1 */}
          <ServiceCard service={services[5]} />

          {/* EmergencyAccess — cs-2 */}
          <ServiceCard service={services[6]} style={{ gridColumn: 'span 2' }} />

          {/* Vaccination — cs-2 (fills remaining 2 cols) */}
          <ServiceCard service={services[7]} style={{ gridColumn: 'span 2' }} />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  style,
  tall,
}: {
  service: typeof services[0];
  style?: React.CSSProperties;
  tall?: boolean;
}) {
  return (
    <div
      className={`group bg-white rounded-2xl p-7 border border-border card-lift cursor-pointer flex flex-col ${tall ? 'min-h-[280px]' : 'min-h-[160px]'}`}
      style={{ ...style, boxShadow: '0 2px 12px rgba(10,110,209,0.05)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          <Icon name={service.icon as any} size={20} className={service.color} />
        </div>
        {service.tag && (
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${service.tagColor}`}>
            {service.tag}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold text-foreground mb-2">{service.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.desc}</p>
      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Accéder <Icon name="ArrowRightIcon" size={14} />
      </div>
    </div>
  );
}