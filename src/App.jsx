import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AIBackground from "./components/ai-background";  // ⭐ import background

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* ⭐ AI Background goes behind all content */}
      <AIBackground />

      <Navbar />

      <main className="pt-16 relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <footer className="py-8 text-center text-slate-400">
          © {new Date().getFullYear()} Ashnoor Singh — Open for freelance
        </footer>
      </main>
    </div>
  );
}
