// src/components/Hero.jsx
import React from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";





/**
 * Plain-JS Hero component.
 */

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
      data-testid="section-hero"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-8 md:gap-12">
          {/* Avatar + glow */}
          <div className="float-animation relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(14,165,233,0.16), rgba(255,79,161,0.12))",
                transform: "scale(1.05)",
              }}
              aria-hidden="true"
            />

            <div
              className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-blue-400/30 overflow-hidden shadow-2xl"
              aria-hidden="false"
            >
              <img
                src="/assets/ashnoor.png"
                alt="Ashnoor"
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const fallback = document.createElement("div");
                    fallback.className =
                      "w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-pink-500 text-white text-4xl font-bold";
                    fallback.innerText = "AS";
                    parent.appendChild(fallback);
                  }
                }}
                data-testid="img-avatar-hero"
              />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4 md:space-y-6 max-w-4xl">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              data-testid="text-hero-headline"
            >
              Hi, I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400 gradient-text">
                Ashnoor Singh
              </span>
            </h1>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground"
              data-testid="text-hero-subheadline"
            >
              AI Engineer & Innovator
            </h2>

            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-hero-description"
            >
              Transforming ideas into intelligent solutions with Machine Learning, NLP, and Generative AI.
            </p>
          </div>

          {/* Resume CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://drive.google.com/file/d/18Q1825IS3ct5OI2zN09B07G9bNkfgrC9/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-base md:text-lg font-semibold bg-gradient-to-r from-blue-400 to-pink-400 text-black shadow-lg hover:scale-[1.02] transition-transform"
              data-testid="button-view-resume"
            >
              View Resume
              <ArrowRight className="ml-1 w-5 h-5" />
            </a>
          </div>

          {/* Social icons (now use social-pill glow) */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Ashnoor1313"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="social-pill w-12 h-12 inline-flex items-center justify-center rounded-full text-center"
              data-testid="button-github"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/ashnoor-singh-683640298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="social-pill linkedin w-12 h-12 inline-flex items-center justify-center rounded-full text-center"
              data-testid="button-linkedin"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <a
              href="mailto:ashnoorchhabra1313@gmail.com"
              aria-label="Email"
              className="social-pill w-12 h-12 inline-flex items-center justify-center rounded-full text-center"
              data-testid="button-email"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-blue-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}


