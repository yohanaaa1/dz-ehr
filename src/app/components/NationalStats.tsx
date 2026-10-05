'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { value: 48000000, suffix: '+', label: 'Citoyens Enregistrés', icon: 'UsersIcon', color: 'text-primary', bg: 'bg-primary/8', format: 'M' },
  { value: 1200, suffix: '+', label: 'Hôpitaux Connectés', icon: 'BuildingOffice2Icon', color: 'text-accent', bg: 'bg-accent/8', format: 'K' },
  { value: 65000, suffix: '+', label: 'Professionnels de Santé', icon: 'UserGroupIcon', color: 'text-primary', bg: 'bg-primary/8', format: 'K' },
  { value: 12000000, suffix: '+', label: 'Dossiers Médicaux', icon: 'DocumentTextIcon', color: 'text-orange-500', bg: 'bg-orange-50', format: 'M' },
  { value: 3500, suffix: '+', label: 'Laboratoires', icon: 'BeakerIcon', color: 'text-accent', bg: 'bg-accent/8', format: 'K' },
  { value: 8900, suffix: '+', label: 'Pharmacies Connectées', icon: 'ShoppingBagIcon', color: 'text-primary', bg: 'bg-primary/8', format: 'K' },
];

const faqs = [
  {
    q: 'Qui peut accéder à mon dossier médical électronique ?',
    a: 'Seuls les professionnels de santé autorisés et vous-même pouvez accéder à votre dossier. Chaque accès est tracé et sécurisé par votre identifiant national biométrique.',
  },
  {
    q: 'Comment créer mon dossier DZ EHR ?',
    a: 'Rendez-vous sur la plateforme DZ EHR et cliquez sur « Commencer ». Vous aurez besoin de votre carte nationale biométrique pour vous identifier et créer votre compte.',
  },
  {
    q: 'Mes données sont-elles sécurisées ?',
    a: 'Oui. Toutes les données sont chiffrées de bout en bout et stockées sur des serveurs sécurisés en Algérie, conformément à la réglementation nationale sur la protection des données.',
  },
  {
    q: 'DZ EHR est-il disponible dans toute l\'Algérie ?',
    a: 'Le déploiement est progressif. Dès l\'été 2026, DZ EHR sera généralisé à l\'ensemble des 48 wilayas, couvrant tous les établissements de santé publics et privés.',
  },
  {
    q: 'Que se passe-t-il en cas d\'urgence médicale ?',
    a: 'Les équipes d\'urgence ont un accès immédiat aux informations vitales de votre dossier (groupe sanguin, allergies, antécédents) pour une prise en charge rapide et efficace.',
  },
  {
    q: 'Les médecins du secteur privé ont-ils accès à DZ EHR ?',
    a: 'Oui, tous les professionnels de santé accrédités — secteur public et privé — peuvent accéder à DZ EHR avec leurs identifiants professionnels sécurisés.',
  },
];

function formatStatValue(value: number, format: string) {
  if (format === 'M') return (value / 1000000).toFixed(0) + 'M';
  if (format === 'K') return (value / 1000).toFixed(0) + 'K';
  return value.toLocaleString('fr-DZ');
}

function AnimatedCounter({ value, suffix, format }: { value: number; suffix: string; format: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              current = value;
              clearInterval(timer);
            }
            setCount(Math.floor(current));
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="counter-value">
      {formatStatValue(count, format)}{suffix}
    </span>
  );
}

export default function NationalStats() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Stats Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full accent-line" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Chiffres Clés</span>
            <div className="w-1 h-5 rounded-full accent-line" />
          </div>
          <h2 className="text-display text-foreground mb-4">La Santé Numérique en Chiffres</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            DZ EHR transforme le système de santé algérien à une échelle nationale.
          </p>
        </div>

        {/* Stats Grid — 3 cols × 2 rows = 6 cards. Placed 6/6 ✓ */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-8 border border-border card-lift"
              style={{
                transitionDelay: `${idx * 60}ms`,
                boxShadow: '0 2px 12px rgba(10,110,209,0.06)',
              }}
            >
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
                <Icon name={stat.icon as any} size={20} className={stat.color} />
              </div>
              <div className={`text-3xl font-extrabold ${stat.color} mb-1 tracking-tight`}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} format={stat.format} />
              </div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Campaigns Banner */}
        <div
          className="rounded-3xl p-10 mb-24 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 50%, #023E7D 100%)',
            boxShadow: '0 12px 48px rgba(10,110,209,0.30)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-[300px] h-[300px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,168,107,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-5">
                <Icon name="MegaphoneIcon" size={14} className="text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Campagnes Nationales</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight">
                Vaccination · Dépistage · Sensibilisation Santé
              </h3>
              <p className="text-white/75 leading-relaxed max-w-xl">
                Restez informé des campagnes nationales de santé publique. Consultez votre carnet de vaccination numérique et participez aux programmes de prévention.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Vaccination Grippe 2026', icon: 'ShieldCheckIcon' },
                { label: 'Dépistage Diabète', icon: 'HeartIcon' },
                { label: 'Santé Maternelle', icon: 'UserGroupIcon' },
              ].map((campaign) => (
                <div key={campaign.label} className="flex items-center gap-3 bg-white/12 rounded-xl px-4 py-3 border border-white/15">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={campaign.icon as any} size={15} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">{campaign.label}</span>
                  <Icon name="ArrowRightIcon" size={13} className="text-white/60 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full accent-line" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">FAQ</span>
            </div>
            <h2 className="text-display text-foreground mb-4">Questions Fréquentes</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tout ce que vous devez savoir sur DZ EHR et le dossier médical électronique national.
            </p>
            <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/15">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="ChatBubbleLeftRightIcon" size={18} className="text-primary" />
                </div>
                <span className="font-bold text-foreground">Besoin d'aide ?</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Notre équipe d'assistance est disponible 24h/24 pour vous accompagner.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                Contacter le support <Icon name="ArrowRightIcon" size={14} />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-border overflow-hidden"
                style={{ boxShadow: '0 1px 8px rgba(10,110,209,0.05)' }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="text-sm font-semibold text-foreground pr-4">{faq.q}</span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      openFaq === idx ? 'bg-primary text-white rotate-45' : 'bg-secondary text-primary'
                    }`}
                  >
                    <Icon name="PlusIcon" size={16} />
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}