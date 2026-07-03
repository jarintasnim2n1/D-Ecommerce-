"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Users, Shield, Zap, Award, Heart, ChevronRight, ArrowRight } from "lucide-react";

const stats = [
  { value: "50K+", label: "Active Users", icon: Users },
  { value: "$10M+", label: "Transaction Volume", icon: Globe },
  { value: "99.9%", label: "Uptime", icon: Shield },
  { value: "<2s", label: "Avg. Transaction", icon: Zap },
];

const team = [
  { name: "Alex Chen", role: "CEO & Founder", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Sarah Williams", role: "CTO", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Marcus Johnson", role: "Head of Design", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Emily Park", role: "Head of Blockchain", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
];

const values = [
  { icon: Shield, title: "Trust & Transparency", desc: "Every transaction is verified on the blockchain. No hidden fees, no secrets." },
  { icon: Heart, title: "Customer First", desc: "We build for our community. Your feedback shapes our roadmap." },
  { icon: Zap, title: "Innovation", desc: "Pushing the boundaries of what's possible in decentralized commerce." },
  { icon: Award, title: "Quality", desc: "Curated products only. We verify authenticity for every item." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-gradient-to-br from-castleton to-castleton-dark py-20 overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-10 left-10 w-60 h-60 bg-champagne/10 rounded-full blur-3xl" /></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="w-3.5 h-3.5" /><span className="text-white">About Us</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">About Encommerce</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">We&apos;re building the future of commerce — a decentralized marketplace where trust is built into every transaction, and your data belongs to you.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-card rounded-2xl border border-border/50 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-castleton/10 dark:bg-champagne/10 rounded-xl flex items-center justify-center mx-auto mb-3"><s.icon className="w-6 h-6 text-castleton dark:text-champagne" /></div>
                <div className="text-3xl font-bold text-foreground mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30 dark:bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-champagne-dark dark:text-champagne font-semibold text-sm uppercase tracking-widest">Our Mission</span>
              <h2 className="text-3xl font-bold text-foreground mt-3 mb-6">Empowering Global Commerce with Web3</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>Founded in 2024, Encommerce was born from a simple idea: online shopping should be transparent, secure, and accessible to everyone — regardless of where they live or which bank they use.</p>
                <p>By leveraging blockchain technology, we create a trustless marketplace where buyers and sellers can transact directly. Smart contracts handle escrow, dispute resolution, and payments — eliminating middlemen and reducing costs.</p>
                <p>Our mission is to onboard the next billion users to decentralized commerce, making Web3 shopping as simple as traditional e-commerce while preserving the core values of decentralization.</p>
              </div>
            </div>
            <div className="relative">
              <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" alt="Team collaboration" width={600} height={400} className="rounded-2xl shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-4 border border-border/50">
                <div className="flex items-center gap-3"><div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"><Shield className="w-6 h-6 text-white" /></div><div><div className="font-bold text-foreground">100% Secure</div><div className="text-xs text-muted-foreground">Blockchain Verified</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-champagne-dark dark:text-champagne font-semibold text-sm uppercase tracking-widest">Our Values</span>
            <h2 className="text-3xl font-bold text-foreground mt-3">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-2xl border border-border/50 p-6 hover:shadow-md transition-all hover:border-champagne/30 text-center">
                <div className="w-14 h-14 bg-champagne/10 rounded-2xl flex items-center justify-center mx-auto mb-4"><v.icon className="w-7 h-7 text-champagne" /></div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30 dark:bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-champagne-dark dark:text-champagne font-semibold text-sm uppercase tracking-widest">Our Team</span>
            <h2 className="text-3xl font-bold text-foreground mt-3">Meet the Builders</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.name} className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-md transition-all group">
                <div className="aspect-square relative overflow-hidden">
                  <Image src={m.avatar} alt={m.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-foreground">{m.name}</h3>
                  <p className="text-sm text-champagne mt-1">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-champagne to-champagne-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-castleton-dark mb-4">Ready to Shop the Future?</h2>
          <p className="text-castleton-dark/70 mb-8">Join 50,000+ users who are already shopping with crypto on Encommerce.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-castleton text-white px-8 py-4 rounded-xl font-bold hover:bg-castleton-dark transition-colors">
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
