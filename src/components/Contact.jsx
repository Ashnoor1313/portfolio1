// src/components/Contact.jsx
import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Copy,
  Check,
  Instagram,
  Twitter,
} from "lucide-react";
import useScrollAnimation from "../hooks/use-scroll-animation";

/* ---- lightweight inline Card & Button ---- */
function Card({ children, className = "", ...props }) {
  return <div className={`glass-card ${className}`} {...props}>{children}</div>;
}
function IconButton({ children, onClick, className = "", ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center p-2 rounded-md bg-transparent border-0 ${className}`}
    >
      {children}
    </button>
  );
}

/* ---- Toast system ---- */
function ToastHost() {
  return (
    <div
      id="__app_toast_host"
      style={{ position: "fixed", right: 20, top: 20, zIndex: 9999 }}
    />
  );
}
function useToast() {
  function toast({ title = "", description = "", variant = "default", duration = 2400 }) {
    try {
      const host = document.getElementById("__app_toast_host");
      if (!host) return;
      const el = document.createElement("div");
      el.style.minWidth = "220px";
      el.style.marginTop = "8px";
      el.style.padding = "10px 12px";
      el.style.borderRadius = "10px";
      el.style.boxShadow = "0 8px 30px rgba(2,6,23,0.6)";
      el.style.background =
        variant === "destructive"
          ? "linear-gradient(90deg,#ff4d6d,#ff7b9e)"
          : "linear-gradient(90deg,#0ea5e9,#ff4fa1)";
      el.style.color = "#021124";
      el.style.fontSize = "13px";
      el.innerHTML = `<strong style="display:block;margin-bottom:4px">${title}</strong><span style="opacity:.9">${description}</span>`;
      host.appendChild(el);
      setTimeout(() => {
        el.style.transition = "opacity .28s, transform .28s";
        el.style.opacity = "0";
        el.style.transform = "translateY(-6px)";
      }, duration);
      setTimeout(() => host.removeChild(el), duration + 320);
    } catch (e) {}
  }
  return { toast };
}

/* ---- Main component ---- */
export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${type === "email" ? "Email" : "Phone number"} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className={`relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      data-testid="section-contact"
    >
      <ToastHost />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Collaborate!</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400 mx-auto rounded-full shadow-lg glow-primary mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        <Card className="p-8 md:p-12 hover-elevate transition-all duration-300">
          <div className="space-y-6">

            {/* Email row */}
            <div className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 group glass-card">
              <div className="p-3 bg-blue-400/10 rounded-lg glow-primary">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <a
                  href="mailto:ashnoorchhabra1313@gmail.com"
                  className="text-base md:text-lg font-medium text-foreground hover:text-blue-400 transition-colors break-all"
                >
                  ashnoorchhabra1313@gmail.com
                </a>
              </div>
              <IconButton
                onClick={() => copyToClipboard("ashnoorchhabra1313@gmail.com", "email")}
                ariaLabel="Copy email"
                className="hover-elevate"
              >
                {copiedEmail ? <Check className="w-5 h-5 text-blue-400" /> : <Copy className="w-5 h-5" />}
              </IconButton>
            </div>

            {/* Phone row */}
            <div className="flex items-center gap-4 p-4 rounded-lg transition-all duration-300 group glass-card">
              <div className="p-3 bg-pink-400/10 rounded-lg glow-secondary">
                <Phone className="w-6 h-6 text-pink-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                <a
                  href="tel:+919988766184"
                  className="text-base md:text-lg font-medium text-foreground hover:text-pink-400 transition-colors"
                >
                  +91-9988766184
                </a>
              </div>
              <IconButton
                onClick={() => copyToClipboard("+91-9988766184", "phone")}
                ariaLabel="Copy phone"
                className="hover-elevate"
              >
                {copiedPhone ? <Check className="w-5 h-5 text-pink-400" /> : <Copy className="w-5 h-5" />}
              </IconButton>
            </div>

            {/* Social section */}
            <div className="pt-6 border-t border-white/6">
              <p className="text-sm text-muted-foreground text-center mb-6">
                Connect with me on social platforms
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">

              
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/ashnoor-singh-683640298"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill linkedin w-full sm:w-auto text-center"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ashnoor71104?igsh=c25rYnEwdzFvbjdi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill instagram w-full sm:w-auto text-center"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>

                {/* Twitter */}
                <a
                  href="https://x.com/Ashnoor1313?t=WZbmCbErUfFvCHyaJpgaKw&s=09                  git init                  git init"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill twitter w-full sm:w-auto text-center"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>

              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
