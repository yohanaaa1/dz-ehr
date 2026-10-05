'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type AuthTab = 'login' | 'register';

const trustBadges = [
  { icon: 'ShieldCheckIcon', text: 'Données chiffrées' },
  { icon: 'LockClosedIcon', text: 'Identifiant national' },
  { icon: 'BuildingOffice2Icon', text: 'Service officiel' },
];

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<AuthTab>(searchParams.get('tab') === 'register' ? 'register' : 'login');
  const [showPass, setShowPass] = useState(false);
  const [loginForm, setLoginForm] = useState({ id: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    role: '',
    nationalId: '',
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    professionalId: '',
    profession: '',
    specialty: '',
    grade:'',
    institution: '',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect to backend here
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. Check password confirmation
  if (registerForm.password !== registerForm.confirmPassword) {
    console.error("Les mots de passe ne correspondent pas.");
    return;
  }

  // 2. Check account type
  if (!registerForm.role) {
    console.error("Veuillez sélectionner un type de compte.");
    return;
  }

  // 3. Create Firebase Authentication account
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerForm.email,
      registerForm.password
    );

    // Firebase automatically gives the user a UID
    console.log("Account created:", userCredential.user.uid);

  } catch (error) {
    console.error("Registration error:", error);
  }
};

  return (
    <div className="min-h-screen bg-white flex">

      {/* LEFT PANEL — Branding */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0A6ED1 0%, #0556A8 40%, #023E7D 80%, #011F4B 100%)',
        }}
      >
        {/* Background depth */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,168,107,0.15) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <Link href="/" className="flex items-center gap-3">
            <AppLogo size={40} />
            <div>
              <div className="font-extrabold text-2xl text-white tracking-tight leading-none">DZ EHR</div>
              <div className="text-xs font-medium text-white/60 tracking-widest uppercase mt-0.5">Santé Numérique</div>
            </div>
          </Link>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-10 pb-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2 mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-white tracking-wide">Service National Officiel</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Votre Dossier<br />
              <span className="text-white/70">Médical National</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-md">
              Accédez à l'ensemble de votre historique médical, connectez-vous avec vos médecins et gérez votre santé depuis une seule plateforme sécurisée.
            </p>
          </div>

          {/* Visual card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 mb-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Icon name="UserCircleIcon" size={24} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-white">Karim Mansouri</div>
                <div className="text-xs text-white/60">ID: DZ-1998-ALGER-4421</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 bg-accent/20 border border-accent/30 rounded-full px-2.5 py-1">
                <Icon name="CheckCircleIcon" size={12} className="text-accent" />
                <span className="text-[11px] font-bold text-accent">Actif</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Consultations', value: '12' },
                { label: 'Ordonnances', value: '8' },
                { label: 'Analyses', value: '5' },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-extrabold text-white">{item.value}</div>
                  <div className="text-[11px] text-white/60 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-3">
            {trustBadges.map((badge) => (
              <div key={badge.text} className="flex items-center gap-3 text-sm text-white/70">
                <Icon name={badge.icon as any} size={16} className="text-white/50" />
                {badge.text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom flag accent */}
        <div className="relative z-10 px-10 pb-8">
          <div className="flex items-center gap-2">
            <div className="h-0.5 flex-1 rounded-full bg-white/20" />
            <span className="text-xs text-white/40 font-medium">République Algérienne Démocratique et Populaire</span>
            <div className="h-0.5 flex-1 rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo size={32} />
            <span className="font-bold text-lg text-primary">DZ EHR</span>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <Icon name="ArrowLeftIcon" size={14} />
            Retour
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">

            {/* Back link (desktop) */}
            <Link href="/" className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors w-fit">
              <Icon name="ArrowLeftIcon" size={16} />
              Retour à l'accueil
            </Link>

            {/* Tab switcher */}
            <div className="flex bg-secondary rounded-2xl p-1.5 mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                  activeTab === 'login' ?'bg-white text-primary shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
                  activeTab === 'register' ?'bg-white text-primary shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Créer un compte
              </button>
            </div>

            {activeTab === 'login' ? (
              <LoginForm
                form={loginForm}
                setForm={setLoginForm}
                showPass={showPass}
                setShowPass={setShowPass}
                onSubmit={handleLoginSubmit}
              />
            ) : (
              <RegisterForm
                form={registerForm}
                setForm={setRegisterForm}
                onSubmit={handleRegisterSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({
  form, setForm, showPass, setShowPass, onSubmit,
}: {
  form: { id: string; password: string };
  setForm: (f: { id: string; password: string }) => void;
  showPass: boolean;
  setShowPass: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-foreground mb-1.5">Bon retour</h1>
        <p className="text-sm text-muted-foreground">Connectez-vous avec votre identifiant national.</p>
      </div>

      

      {/* National ID */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Identifiant National</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon name="IdentificationIcon" size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Ex: DZ-1985-ALGER-1234"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Mot de passe</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon name="LockClosedIcon" size={18} className="text-muted-foreground" />
          </div>
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full pl-11 pr-12 py-3.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name={showPass ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
          <span className="text-muted-foreground">Se souvenir de moi</span>
        </label>
        <a href="#" className="font-semibold text-primary hover:text-primary-dark transition-colors">
          Mot de passe oublié ?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-4 text-sm font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 100%)',
          boxShadow: '0 6px 20px rgba(10,110,209,0.35)',
        }}
      >
        <Icon name="ArrowRightCircleIcon" size={18} />
        Se connecter
      </button>

      <div className="relative flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Biometric option */}
      <button
        type="button"
        className="w-full py-4 text-sm font-semibold text-foreground border-2 border-border rounded-xl hover:border-primary/30 hover:bg-primary/3 transition-all flex items-center justify-center gap-2"
      >
        <Icon name="FingerPrintIcon" size={18} className="text-primary" />
        Connexion biométrique (Carte nationale)
      </button>

      <p className="text-center text-sm text-muted-foreground pt-2">
        Pas encore inscrit ?{' '}
        <button
          type="button"
          className="font-bold text-primary hover:text-primary-dark"
          onClick={() => {}}
        >
          Créer un dossier
        </button>
      </p>
    </form>
  );
}

function RegisterForm({
  form, setForm, onSubmit,
}: {
  form: {
    role: string; nationalId: string; firstName: string; lastName: string; dob: string;
    phone: string; email: string; password: string; confirmPassword: string; professionalId: string;
  profession: string; specialty: string; grade:string; institution: string;
  };
  setForm: (f: typeof form) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const validationErrors = {
  role: !form.role,
  nationalId: !form.nationalId.trim(),
  firstName: !form.firstName.trim(),
  lastName: !form.lastName.trim(),
  dob: !form.dob,
  phone: !form.phone.trim(),
  email: !form.email.trim(),
  password: !form.password,
  confirmPassword: !form.confirmPassword,
  terms: !acceptedTerms,
};

const missingFieldsCount = Object.values(validationErrors).filter(Boolean).length;

const hasErrors = missingFieldsCount > 0;

const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  setShowErrors(true);

  if (hasErrors) {
    setTimeout(() => {
      const firstError = document.querySelector(
        '[data-validation-error="true"]'
      );

      if (firstError) {
        firstError.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        if (firstError instanceof HTMLElement) {
          firstError.focus();
        }
      }
    }, 0);

    return;
  }

  onSubmit(e);
};

  const inputClass = "w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {showErrors && missingFieldsCount >= 4 && (
  <div
    role="alert"
    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
  >
    <div className="flex items-center gap-2">
      <span className="font-bold">⚠</span>
      <span>
        Veuillez renseigner les informations obligatoires avant de créer votre compte.
      </span>
    </div>
  </div>
)}
      <div className="mb-4">
        <h1 className="text-2xl font-extrabold text-foreground mb-1.5">Créer votre dossier</h1>
        <p className="text-sm text-muted-foreground">Identifiez-vous avec votre carte nationale biométrique.</p>
      </div>

      {/* Account Type */}
<div className="relative">
  <label className="block text-sm font-semibold text-foreground mb-1.5">
    Type de compte
  </label>

  <button
  type="button"
  onClick={() => setIsRoleOpen(!isRoleOpen)}
  data-validation-error={showErrors && validationErrors.role ? "true" : "false"}
  className={`${inputClass} flex items-center justify-between text-left ${
    showErrors && validationErrors.role ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}`}
>
  {showErrors && missingFieldsCount < 4 && validationErrors.role && (
  <p className="mt-1.5 text-xs text-red-600">⚠ Veuillez sélectionner un type de compte.</p>
)}
    <span className={form.role ? "text-foreground" : "text-muted-foreground"}>
      {form.role === "patient"
        ? "Citoyen / Patient"
        : form.role === "doctor"
        ? "Médecin"
        : "Sélectionnez votre type de compte"}
    </span>

    <span className="text-muted-foreground transition-transform duration-200">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={isRoleOpen ? "rotate-180" : ""}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
</span>
  </button>

  {isRoleOpen && (
    <div className="absolute z-20 w-full mt-2 bg-secondary border border-border rounded-xl shadow-lg overflow-hidden">
      <button
        type="button"
        onClick={() => {
          setForm({ ...form, role: "patient" });
          setIsRoleOpen(false);
        }}
        className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-primary/5 transition-colors"
      >
        Citoyen / Patient
      </button>

      <button
        type="button"
        onClick={() => {
          setForm({ ...form, role: "doctor" });
          setIsRoleOpen(false);
        }}
        className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-primary/5 transition-colors"
      >
        Médecin / Infirmier
      </button>
    </div>
  )}
</div>

      {/* National ID */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">Numéro National d'Identité</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon name="IdentificationIcon" size={17} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Numéro de votre carte nationale"
            value={form.nationalId}
            onChange={(e) => setForm({ ...form, nationalId: e.target.value })}
            className={`${inputClass} pl-11 ${showErrors && validationErrors.nationalId ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "" }`}
            data-validation-error={showErrors && validationErrors.nationalId ? "true" : "false"}
          />
        </div>
      </div>
      {showErrors && missingFieldsCount < 4 && validationErrors.nationalId && (
        <p className="mt-1.5 text-xs text-red-600">⚠ Le numéro national est obligatoire.</p>
        )}

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Prénom</label>
          <input
            type="text"
            placeholder="Votre prénom"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className={`${inputClass} ${showErrors && validationErrors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "" }`}
            data-validation-error={showErrors && validationErrors.firstName ? "true" : "false"}
          />
          <div className="min-h-[20px] pt-1">
          {showErrors && missingFieldsCount < 4 && validationErrors.firstName &&(
            <p className="text-xs text-red-600">
               ⚠ Le prénom est obligatoire.
            </p>
          )}
        </div>
      </div>
        
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Nom</label>
          <input
            type="text"
            placeholder="Votre nom"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className={`${inputClass} ${showErrors && validationErrors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "" }`}
            data-validation-error={showErrors && validationErrors.lastName ? "true" : "false"}
          />
          <div className="min-h-[20px] pt-1">
            {showErrors && missingFieldsCount < 4 && validationErrors.lastName && (
             <p className="text-xs text-red-600">
                ⚠ Le nom est obligatoire.
             </p>
           )}
          </div>
        </div>

      </div>
      


      {/* DOB + Phone */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Date de naissance</label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className={`${inputClass} ${showErrors && validationErrors.dob ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "" }`}
            data-validation-error={showErrors && validationErrors.dob ? "true" : "false"}
          />
          <div className="min-h-[20px] pt-1">
            {showErrors && missingFieldsCount < 4 && validationErrors.dob && (
             <p className="text-xs text-red-600">
                ⚠ La date de naissance est obligatoire.
             </p>
           )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Téléphone</label>
          <input
            type="tel"
            placeholder="+213 5XX XXX XXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`${inputClass} ${showErrors && validationErrors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "" }`}
            data-validation-error={showErrors && validationErrors.phone ? "true" : "false"}
          />
          <div className="min-h-[20px] pt-1">
            {showErrors && missingFieldsCount < 4 && validationErrors.phone && (
             <p className="text-xs text-red-600">
                ⚠ Le numéro de téléphone est obligatoire.
             </p>
           )}
          </div>
        </div>
      </div>
      
      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">Email</label>
        <input
          type="email"
          placeholder="votre@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`${inputClass} ${showErrors && validationErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}`}
        data-validation-error={
        showErrors && validationErrors.email ? "true" : "false"
        }
        />
      </div>
      {showErrors && missingFieldsCount < 4 && validationErrors.email && (
  <p className="mt-1.5 text-xs text-red-600">⚠ L'adresse email est obligatoire.</p>
)}

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">Mot de passe</label>
        <input
          type="password"
          placeholder="Minimum 8 caractères"
          value={form.password}
          onChange={(e) => {
             const value = e.target.value;

            setForm({
                ...form,
                password: value,
                });

            if (confirmPasswordTouched && form.confirmPassword) {
                setPasswordMismatch(value !== form.confirmPassword);
                }
            }}
          className={`${inputClass} ${showErrors && validationErrors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : ""}`}
          data-validation-error={
          (showErrors && validationErrors.password) || passwordMismatch ? "true" : "false"
          }
        />
      </div>
      {showErrors && missingFieldsCount < 4 && validationErrors.password && (
  <p className="mt-1.5 text-xs text-red-600">⚠ Le mot de passe est obligatoire.</p>
)}

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1.5">Confirmer le mot de passe</label>
        <input
          type="password"
          placeholder="Répétez votre mot de passe"
          value={form.confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setForm({
              ...form,
              confirmPassword: value,
            });

            if (confirmPasswordTouched || value.length > 0) {
               setConfirmPasswordTouched(true);
               setPasswordMismatch(form.password !== value);
           }
          }}          
          onBlur={() => {
              setConfirmPasswordTouched(true);

              if (form.confirmPassword) {
                setPasswordMismatch(
                form.password !== form.confirmPassword);
              }
          }}
          className={`${inputClass} ${(showErrors && validationErrors.confirmPassword) || passwordMismatch ? "border-red-500 focus:ring-red-500" : ""}`}          
          data-validation-error={
          showErrors && validationErrors.confirmPassword ? "true" : "false"
          }
        />
      </div>
      <div className="min-h-[20px] pt-1">
  {showErrors && missingFieldsCount < 4 && validationErrors.confirmPassword && (
    <p className="text-xs text-red-600">
      ⚠ Veuillez confirmer votre mot de passe.
    </p>
  )}

  {passwordMismatch && (
    <p className="text-xs text-red-600">
      ⚠ Les mots de passe ne correspondent pas.
    </p>
  )}
</div>
     

      {/* Consent */}
      
<div>
  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      checked={acceptedTerms}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
      data-validation-error={
        showErrors && validationErrors.terms ? "true" : "false"
      }
      className={`w-4 h-4 mt-0.5 rounded accent-primary flex-shrink-0 ${
        showErrors && validationErrors.terms
          ? "border-red-500 ring-2 ring-red-500/20"
          : "border-border"
      }`}
    />

    <span className="text-xs text-muted-foreground leading-relaxed">
      J'accepte les{' '}
      <a
        href="#"
        className="text-primary font-semibold hover:underline"
      >
        conditions d'utilisation
      </a>
      {' '}et la{' '}
      <a
        href="#"
        className="text-primary font-semibold hover:underline"
      >
        politique de confidentialité
      </a>
      {' '}du service DZ EHR.
    </span>
  </label>

  {showErrors && missingFieldsCount < 4 && validationErrors.terms && (
    <p className="mt-1.5 ml-7 text-xs text-red-600">
      ⚠ Vous devez accepter les conditions d'utilisation et la politique de confidentialité.
    </p>
  )}
</div>

      <button
        type="submit"
        className="w-full py-4 text-sm font-bold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, #0A6ED1 0%, #0556A8 100%)',
          boxShadow: '0 6px 20px rgba(10,110,209,0.35)',
        }}
      >
        <Icon name="UserPlusIcon" size={18} />
        Créer mon Dossier Médical
      </button>

      {/* Official badge */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <Icon name="ShieldCheckIcon" size={14} className="text-accent" />
        <span className="text-xs text-muted-foreground">
          Service officiel — Ministère de la Santé d'Algérie
        </span>
      </div>
    </form>
  );
}