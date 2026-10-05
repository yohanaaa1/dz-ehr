'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const categories = ['Tous', 'Hôpitaux', 'Cliniques', 'Laboratoires', 'Pharmacies'];

const institutions = [
{
  id: 1,
  name: 'CHU Mustapha Bacha',
  type: 'Hôpitaux',
  location: 'Alger Centre',
  services: '42 spécialités',
  status: 'Connecté',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b69d94a0-1769263634014.png",
  alt: 'Modern hospital building exterior with large glass windows, bright daytime, blue sky',
  beds: '1 200',
  rating: 4.8
},
{
  id: 2,
  name: 'CHU Beni Messous',
  type: 'Hôpitaux',
  location: 'Alger Ouest',
  services: '38 spécialités',
  status: 'Connecté',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d5499245-1775123960092.png",
  alt: 'Large modern hospital with clean facade, bright exterior, well-maintained grounds',
  beds: '980',
  rating: 4.7
},
{
  id: 3,
  name: 'Clinique El Azhar',
  type: 'Cliniques',
  location: 'Constantine',
  services: '12 spécialités',
  status: 'Connecté',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15a5bd6dd-1774248546076.png",
  alt: 'Modern private clinic with bright interior lobby, clean white walls and blue accents',
  beds: '120',
  rating: 4.9
},
{
  id: 4,
  name: 'Laboratoire Central d\'Analyses',
  type: 'Laboratoires',
  location: 'Oran',
  services: '200+ analyses',
  status: 'Connecté',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_176359527-1781590853978.png",
  alt: 'Modern medical laboratory with bright white equipment and clean sterile environment',
  beds: '—',
  rating: 4.8
},
{
  id: 5,
  name: 'Pharmacie Centrale',
  type: 'Pharmacies',
  location: 'Alger',
  services: 'Ordonnances électroniques',
  status: 'Connecté',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc77b8a6-1768683532632.png",
  alt: 'Bright modern pharmacy interior with organized shelves and clean white lighting',
  beds: '—',
  rating: 4.6
},
{
  id: 6,
  name: 'Hôpital de Annaba',
  type: 'Hôpitaux',
  location: 'Annaba',
  services: '28 spécialités',
  status: 'Connecté',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c463a68c-1775095263652.png",
  alt: 'Hospital building with modern architecture, blue sky background, well-lit exterior',
  beds: '650',
  rating: 4.5
}];


export default function HealthcareInstitutions() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filtered = activeCategory === 'Tous' ?
  institutions :
  institutions.filter((i) => i.type === activeCategory);

  return (
    <section id="institutions" className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 rounded-full accent-line" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Réseau</span>
            </div>
            <h2 className="text-display text-foreground mb-3">Institutions de Santé</h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Des milliers d'établissements connectés à travers toute l'Algérie.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 bg-secondary rounded-2xl p-1.5">
            {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
              activeCategory === cat ?
              'bg-white text-primary shadow-sm' :
              'text-muted-foreground hover:text-foreground'}`
              }>
              
                {cat}
              </button>
            )}
          </div>
        </div>

        {/* BENTO GRID AUDIT for Institutions (filtered, showing up to 6):
           Grid: 3 cols, auto rows
           Each card: cs-1. If only 1 card → cs-3 (full). 
           Shown: up to 6 cards in 3-col grid = 2 rows of 3. All filled ✓
          */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inst, idx) =>
          <InstitutionCard key={inst.id} institution={inst} delay={idx * 80} />
          )}
        </div>

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <button
            className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm font-bold text-primary border-2 border-primary/25 rounded-xl hover:bg-primary/5 transition-all duration-200">
            
            <Icon name="BuildingOffice2Icon" size={18} />
            Voir toutes les institutions
            <Icon name="ArrowRightIcon" size={16} />
          </button>
        </div>
      </div>
    </section>);

}

function InstitutionCard({ institution, delay }: {institution: typeof institutions[0];delay: number;}) {
  return (
    <div
      className="group bg-white rounded-2xl border border-border overflow-hidden card-lift"
      style={{ transitionDelay: `${delay}ms`, boxShadow: '0 2px 12px rgba(10,110,209,0.06)' }}>
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={institution.image}
          alt={institution.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
        {/* Status badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-[11px] font-semibold text-accent">{institution.status}</span>
        </div>
        {/* Type badge */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20">
            {institution.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-foreground mb-1">{institution.name}</h3>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Icon name="MapPinIcon" size={13} />
              {institution.location}
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-orange-500">
            <Icon name="StarIcon" size={13} className="text-orange-400" />
            {institution.rating}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm">
            <span className="font-semibold text-primary">{institution.services}</span>
          </div>
          {institution.beds !== '—' &&
          <div className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{institution.beds}</span> lits
            </div>
          }
        </div>

        <button className="mt-4 w-full py-2.5 text-sm font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
          Voir le profil
          <Icon name="ArrowRightIcon" size={14} />
        </button>
      </div>
    </div>);

}