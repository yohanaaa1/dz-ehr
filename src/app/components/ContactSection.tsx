import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const contacts = [
  { icon: 'PhoneIcon', label: 'Numéro Vert', value: '3030', sub: 'Gratuit · 24h/24 · 7j/7' },
  { icon: 'EnvelopeIcon', label: 'Email Officiel', value: 'contact@dzehr.gov.dz', sub: 'Réponse sous 48h' },
  { icon: 'MapPinIcon', label: 'Siège', value: 'Ministère de la Santé', sub: 'Alger, Algérie' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full accent-line" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Contact</span>
            </div>
            <h2 className="text-display text-foreground mb-4">Nous Contacter</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Une question sur DZ EHR ? Notre équipe d'assistance nationale est à votre disposition.
            </p>

            <div className="space-y-4">
              {contacts.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-5 p-5 bg-secondary rounded-2xl border border-border card-lift"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon as any} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{c.label}</div>
                    <div className="text-base font-bold text-foreground">{c.value}</div>
                    <div className="text-xs text-muted-foreground">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA card */}
          <div
            className="rounded-3xl p-10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #F0F7FF 0%, #E8F2FB 100%)',
              border: '1px solid rgba(10,110,209,0.12)',
              boxShadow: '0 8px 32px rgba(10,110,209,0.10)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(10,110,209,0.08) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Icon name="ArrowRightCircleIcon" size={26} className="text-primary" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-3">
                Prêt à rejoindre DZ EHR ?
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Créez votre compte citoyen en quelques minutes avec votre carte nationale biométrique. Accédez immédiatement à votre dossier médical national.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/sign-up-login"
                  className="flex items-center justify-center gap-2.5 py-4 text-sm font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 100%)',
                    boxShadow: '0 6px 20px rgba(10,110,209,0.35)',
                  }}
                >
                  <Icon name="UserPlusIcon" size={18} />
                  Créer mon Dossier Médical
                </Link>
                <Link
                  href="/sign-up-login"
                  className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-primary border-2 border-primary/25 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  <Icon name="ArrowLeftOnRectangleIcon" size={18} />
                  Déjà inscrit ? Se connecter
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-border flex items-center gap-3 text-sm text-muted-foreground">
                <Icon name="LockClosedIcon" size={14} className="text-accent" />
                <span>Service officiel du Ministère de la Santé — Gratuit pour tous les citoyens</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}