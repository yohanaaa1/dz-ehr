'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const newsItems = [
{
  id: 1,
  category: 'Annonce',
  categoryColor: 'text-primary bg-primary/8',
  date: 'Juil 2026',
  title: 'Généralisation nationale du DME dès cet été',
  desc: 'Le déploiement du dossier médical électronique s\'étend à toutes les wilayas.',
  icon: 'NewspaperIcon',
  accent: 'border-primary/20',
  wide: true
},
{
  id: 2,
  category: 'Campagne',
  categoryColor: 'text-accent bg-accent/8',
  date: 'Juil 2026',
  title: 'Campagne nationale de vaccination 2026',
  desc: 'Consultez votre carnet de vaccination numérique sur DZ EHR.',
  icon: 'ShieldCheckIcon',
  accent: 'border-accent/20',
  wide: false
},
{
  id: 3,
  category: 'Alerte',
  categoryColor: 'text-orange-600 bg-orange-50',
  date: 'Juil 2026',
  title: 'Nouvelle carte biométrique patient',
  desc: 'Identification immédiate via carte nationale biométrique.',
  icon: 'IdentificationIcon',
  accent: 'border-orange-200',
  wide: false
}];


const statsQuick = [
{ value: '48M+', label: 'Citoyens' },
{ value: '1 200+', label: 'Hôpitaux' },
{ value: '65 000+', label: 'Professionnels' }];


export default function HeroSection() {
  const [activeNews, setActiveNews] = useState(0);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F0F7FF 0%, #EBF3FD 35%, #F5FAFF 65%, #FFFFFF 100%)'
      }}>
      
      {/* Background depth blobs */}
      <div
        className="absolute top-20 right-[-10%] w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(10,110,209,0.10) 0%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%'
        }} />
      
      <div
        className="absolute bottom-0 left-[-5%] w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,168,107,0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%'
        }} />
      

      {/* Geometric dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(10,110,209,0.07) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      

      <div className="max-w-[1440px] mx-auto px-8 pt-16 pb-20 relative z-10">
        <div className="grid grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN — 5 cols */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-8 pt-8">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 self-start bg-white border border-accent/30 rounded-full px-4 py-2 shadow-sm">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-accent animate-ping-slow opacity-60" />
                <span className="relative rounded-full w-2.5 h-2.5 bg-accent" />
              </span>
              <span className="text-xs font-semibold text-accent tracking-wide">
                Déploiement national — Été 2026
              </span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-hero text-foreground mb-4">
                Le Dossier{' '}
                <span
                  className="relative"
                  style={{
                    background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 60%, #00A86B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                  
                  Médical National
                </span>
                <br />
                de l'Algérie
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg font-medium">
                DZ EHR connecte les citoyens, les professionnels de santé, les hôpitaux, cliniques, pharmacies et laboratoires à travers un dossier médical électronique sécurisé.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <Link
                href="/sign-up-login"
                className="flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 100%)',
                  boxShadow: '0 6px 20px rgba(10,110,209,0.38)'
                }}>
                
                <Icon name="ArrowRightCircleIcon" size={18} />
                Commencer
              </Link>
              <a
                href="#about"
                className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-primary border-2 border-primary/25 rounded-xl hover:bg-primary/5 transition-all duration-200">
                
                En savoir plus
                <Icon name="ChevronRightIcon" size={16} />
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              {statsQuick.map((s) =>
              <div key={s.label}>
                  <div className="text-2xl font-extrabold text-primary tracking-tight">{s.value}</div>
                  <div className="text-xs font-medium text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN — 7 cols — Bento Grid */}
          <div className="col-span-12 lg:col-span-7 relative">
            {/* BENTO GRID AUDIT:
               Array: [MainVisual cs-5 rs-6, TopRightImg cs-7 rs-3, BottomRightImg cs-4 rs-3, CircleEl cs-3 rs-3]
               Row 1-6: [col1-5: MainVisual] [col6-12: TopRightImg rs-3]
               Row 4-6: [col1-5: FILLED] [col6-9: BottomRightImg rs-3] [col10-12: CircleEl rs-3]
               Placed 4/4 ✓
              */}
            <div
              className="grid gap-4 h-[620px]"
              style={{
                gridTemplateColumns: 'repeat(12, 1fr)',
                gridTemplateRows: 'repeat(6, 1fr)'
              }}>
              
              {/* Main tall card — col 1-5, row 1-6 */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-card-xl group cursor-pointer"
                style={{ gridColumn: '1 / 6', gridRow: '1 / 7' }}>
                
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1c55f3d24-1767737859940.png"
                  alt="Modern hospital interior with clean white corridors and blue accent lighting, bright airy medical facility"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 mb-3">
                    Portail Citoyen
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                    Votre santé, centralisée
                  </h3>
                  <p className="text-sm text-white/80">
                    Accédez à tout votre historique médical en un clic.
                  </p>
                </div>
              </div>

              {/* Top right wide — col 6-12, row 1-3 */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-card group cursor-pointer"
                style={{ gridColumn: '6 / 13', gridRow: '1 / 4' }}>
                
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_16d490565-1772257592158.png"
                  alt="Healthcare professionals in bright modern clinic reviewing digital records on screens, well-lit environment"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="glass-light px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/40">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs font-semibold text-foreground">Professionnel de Santé</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold text-white">Portail Médical</h3>
                  <p className="text-xs text-white/70 mt-0.5">Prescriptions · Résultats · Imagerie</p>
                </div>
              </div>

              {/* Bottom right image — col 6-9, row 4-6 */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-card group cursor-pointer"
                style={{ gridColumn: '6 / 10', gridRow: '4 / 7' }}>
                
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1cc77b8a6-1768683532632.png"
                  alt="Pharmacy with bright white shelves and organized medication, clean modern interior with blue accent lighting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Pharmacies</p>
                  <h3 className="text-base font-bold text-white">Ordonnances Électroniques</h3>
                </div>
              </div>

              {/* Circular element + floating card — col 10-12, row 4-6 */}
              <div
                className="relative flex flex-col items-center justify-center gap-3"
                style={{ gridColumn: '10 / 13', gridRow: '4 / 7' }}>
                
                {/* Spinning circle */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg
                    className="w-full h-full absolute animate-spin-slow text-primary/40"
                    viewBox="0 0 100 100">
                    
                    <path
                      id="circlePath"
                      d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                      fill="transparent" />
                    
                    <text className="text-[9px]" style={{ fontSize: '9px', fill: 'currentColor', fontWeight: 600, letterSpacing: '3px' }}>
                      <textPath xlinkHref="#circlePath">
                        • DZ EHR • SANTÉ • NUMÉRIQUE •
                      </textPath>
                    </text>
                  </svg>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center z-10 transition-transform duration-300 hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 100%)',
                      boxShadow: '0 4px 20px rgba(10,110,209,0.40)'
                    }}>
                    
                    <Icon name="HeartIcon" size={24} className="text-white" />
                  </div>
                </div>

                {/* Floating mini card */}
                <div className="w-full bg-white rounded-xl p-3 shadow-card border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon name="ShieldCheckIcon" size={14} className="text-accent" />
                    </div>
                    <span className="text-[11px] font-bold text-foreground">Sécurisé</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Données chiffrées · Identifiant national
                  </p>
                </div>
              </div>
            </div>

            {/* Floating UI card — outside grid, absolute */}
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-4 lg:top-1/3 bg-white rounded-2xl p-5 w-60 shadow-card-xl border border-border"
              style={{ zIndex: 20 }}>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dossier Patient</span>
                <Icon name="EllipsisHorizontalIcon" size={16} className="text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0A6ED1, #0556A8)' }}>
                  
                  <Icon name="UserIcon" size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Ahmed B.</p>
                  <p className="text-xs text-muted-foreground">Alger · ID: DZ-2890421</p>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Dernier accès</span>
                <span className="text-xs font-bold text-primary">Aujourd'hui</span>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-accent">
                <Icon name="CheckCircleIcon" size={14} />
                Dossier complet
              </div>
            </div>
          </div>
        </div>

        {/* NEWS ROW — below hero grid */}
        <div className="mt-20" id="news">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full accent-line" />
              <h2 className="text-lg font-bold text-foreground">Actualités & Annonces</h2>
            </div>
            <a href="#" className="text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors">
              Toutes les actualités
              <Icon name="ArrowRightIcon" size={14} />
            </a>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* Wide news card */}
            <div className="col-span-12 lg:col-span-5">
              <NewsCard item={newsItems[0]} />
            </div>
            {/* Two small cards */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              <NewsCard item={newsItems[1]} />
              <NewsCard item={newsItems[2]} />
            </div>
            {/* Stats mini card */}
            <div className="col-span-12 lg:col-span-3">
              <div
                className="h-full rounded-2xl p-6 flex flex-col justify-between"
                style={{
                  background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 100%)',
                  boxShadow: '0 8px 32px rgba(10,110,209,0.30)'
                }}>
                
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <Icon name="ChartBarIcon" size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-1">48 Wilayas</h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Couverture nationale complète d'ici fin 2026.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-white/80 text-xs font-medium">
                    <span>Avancement</span>
                    <span className="font-bold text-white">78%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full rounded-full bg-white" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function NewsCard({ item }: {item: typeof newsItems[0];}) {
  return (
    <div className={`bg-white rounded-2xl p-5 border ${item.accent} shadow-sm hover:shadow-card transition-all duration-300 card-lift h-full flex flex-col`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${item.categoryColor}`}>
          {item.category}
        </span>
        <span className="text-[11px] text-muted-foreground font-medium">{item.date}</span>
      </div>
      <h3 className="text-sm font-bold text-foreground mb-2 leading-snug">{item.title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
      <a href="#" className="mt-3 text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
        Lire la suite <Icon name="ArrowRightIcon" size={12} />
      </a>
    </div>);

}