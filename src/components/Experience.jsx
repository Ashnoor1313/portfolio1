// src/components/Experience.jsx
import React from "react";
import { Briefcase, Calendar } from "lucide-react";
import useScrollAnimation from "../hooks/use-scroll-animation";

/* ---------------- Premium Card ---------------- */
function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`relative rounded-2xl backdrop-blur-xl border border-white/10 
      bg-gradient-to-br from-white/5 to-white/[0.02]
      shadow-xl hover:shadow-2xl transition-all duration-500
      hover:-translate-y-2 hover:border-blue-400/40 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 hover:bg-blue-400/10 transition">
      {children}
    </span>
  );
}

/* ---------------- Experience Data ---------------- */

const experiences = [
  {
    id: "ey",
    company: "EY (Ernst & Young)",
    role: "Software Development Engineer Intern",
    period: "Feb 2026 – Present",
    current: true,
    logo: "/logos/ey.png",
    description:
      "Building enterprise-scale backend systems and automation workflows improving performance and scalability.",
    achievements: [
      "Developed scalable backend modules and REST APIs",
      "Improved operational efficiency by 40% through automation",
      "Performed performance optimization and system tuning",
      "Enhanced reliability of production applications",
    ],
    tech: ["Node.js", "REST APIs", "Automation", "Enterprise Systems"],
  },

  {
    id: "vizlogic",
    company: "Vizlogic Digital Solutions",
    role: "Software Development Engineer Intern",
    period: "Dec 2025 – Feb 2026",
    logo: "/logos/vizlogic.png",
    description:
      "Designed modular backend workflows and automated enterprise software systems.",
    achievements: [
      "Built enterprise ticketing system workflows",
      "Improved request handling efficiency by 40%",
      "Reduced manual work by 50% using automation",
      "Optimized application performance",
    ],
    tech: ["Node.js", "Backend Architecture", "Automation"],
  },

  {
    id: "hukkido",
    company: "Hukkido",
    role: "Software Development Engineer Intern",
    period: "Jul 2025 – Sep 2025",
    logo: "/logos/hukkido.png",
    description:
      "Developed full-stack applications and ML microservices using modern cloud-ready architecture.",
    achievements: [
      "Built MERN full-stack features",
      "Optimized MongoDB aggregation pipelines",
      "Created ML pipelines using TensorFlow & PyTorch",
      "Deployed FastAPI services with Docker & CI/CD",
    ],
    tech: ["React", "Node.js", "MongoDB", "FastAPI", "Docker", "ML"],
  },
];

/* ---------------- Component ---------------- */

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="experience"
      className={`py-24 px-6 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto">
            Building scalable software systems, AI solutions, and enterprise applications across modern tech stacks.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Animated Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-blue-400 via-pink-400 to-blue-400 opacity-40" />

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-10 w-5 h-5 rounded-full bg-blue-400 border-4 border-background shadow-lg animate-pulse" />

                  {/* Card */}
                  <Card
                    className={`w-full md:w-[46%] p-8 ${
                      exp.current
                        ? "ring-2 ring-blue-400/50 shadow-blue-400/20"
                        : ""
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-12 h-12 object-contain rounded-lg bg-white p-1"
                      />

                      <div>
                        <h3 className="text-xl font-semibold">
                          {exp.role}
                        </h3>
                        <p className="text-blue-400 font-medium">
                          {exp.company}
                        </p>
                      </div>

                      {exp.current && (
                        <span className="ml-auto text-xs px-3 py-1 rounded-full bg-blue-400/20 text-blue-300 border border-blue-400/40">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar size={16} />
                      {exp.period}
                    </div>

                    <p className="text-muted-foreground mb-5">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-5">
                      {exp.achievements.map((a, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-blue-400">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}