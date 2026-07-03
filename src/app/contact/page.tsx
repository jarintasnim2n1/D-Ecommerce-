"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "support@encommerce.io", desc: "We reply within 24 hours", color: "text-champagne" },
  { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567", desc: "Mon-Fri 9AM-6PM EST", color: "text-coral" },
  { icon: MapPin, label: "Visit Us", value: "San Francisco, CA", desc: "123 Web3 Street", color: "text-green-500" },
  { icon: Clock, label: "Business Hours", value: "Mon - Fri", desc: "9:00 AM - 6:00 PM EST", color: "text-purple-500" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-br from-castleton to-castleton-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight className="w-3.5 h-3.5" /><span className="text-white">Contact</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-white/70 max-w-lg">Have questions about Web3 shopping? Need help with your order? We&apos;re here to help.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                <p className="text-sm text-muted-foreground mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label><input placeholder="John Doe" className="w-full mt-1.5 px-4 py-3 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
                    <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label><input type="email" placeholder="john@example.com" className="w-full mt-1.5 px-4 py-3 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
                  </div>
                  <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</label><input placeholder="How can we help?" className="w-full mt-1.5 px-4 py-3 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
                  <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</label><textarea rows={5} placeholder="Tell us more about your inquiry..." className="w-full mt-1.5 px-4 py-3 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50 resize-none" /></div>
                  <button type="submit" className="bg-castleton hover:bg-castleton-light text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
                    {sent ? <><CheckCircle2 className="w-4 h-4" /> Message Sent!</> : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="bg-card rounded-2xl border border-border/50 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-muted rounded-xl flex items-center justify-center flex-shrink-0"><c.icon className={`w-5 h-5 ${c.color}`} /></div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">{c.label}</h3>
                      <p className="text-sm text-foreground/80 mt-0.5">{c.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-card rounded-2xl border border-border/50 p-5">
                <h3 className="font-bold text-foreground text-sm mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/help" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-champagne transition-colors"><HelpCircle className="w-4 h-4" /> Help Center</Link>
                  <Link href="/help" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-champagne transition-colors"><MessageSquare className="w-4 h-4" /> Live Chat</Link>
                  <Link href="/about" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-champagne transition-colors"><Mail className="w-4 h-4" /> Partnership Inquiries</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
