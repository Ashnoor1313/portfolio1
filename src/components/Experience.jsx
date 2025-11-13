// src/components/Experience.jsx
import React from "react";
import { Briefcase, Calendar } from "lucide-react";
import useScrollAnimation from "../hooks/use-scroll-animation";

/* Lightweight inline Card & Badge so this file works without external UI imports.
   If you have shared Card/Badge components, replace these with imports.
*/
function Card({ children, className = "", ...props }) {
  return (
    <div className={`glass-card ${className}`} {...props}>
      {children}
    </div>
  );
}
function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${className}`}>
      {children}
    </span>
  );
}

const experiences = [
  {
    id: "hukkido",
    title: "Data Science Intern",
    company: "Hukkido",
    period: "Jul 2025 – Sep 2025",
    description: "Worked on data scraping, cleaning, and ML model building using TensorFlow, PyTorch, and NLP techniques.",
    achievements: [
      "Developed automated data scraping pipelines for large-scale data collection",
      "Built and deployed ML models with TensorFlow and PyTorch achieving high accuracy",
      "Implemented NLP techniques for text analysis and sentiment classification",
      "Optimized data cleaning workflows reducing processing time by 40%",
    ],
    technologies: ["TensorFlow", "PyTorch", "NLP", "Python", "Data Scraping"],
  },
  {
    id: "toletglobe",
    title: "Data Analyst Intern",
    company: "To Let Globe",
    period: "May 2024 – Jul 2024",
    description: "Led a 15-member team, performed analysis using Python, Excel, and Power BI, and optimized business operations.",
    achievements: [
      "Led a cross-functional team of 15 members in data-driven decision making",
      "Performed comprehensive data analysis using Python, Excel, and Power BI",
      "Created interactive dashboards that improved business insights by 35%",
      "Optimized operational workflows through data-driven recommendations",
    ],
    technologies: ["Python", "Excel", "Power BI", "Data Analysis", "Team Leadership"],
  },
];

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="experience"
      className={`relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      data-testid="section-experience"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-experience-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400 mx-auto rounded-full shadow-lg glow-primary" />
        </div>

        <div className="relative">
          {/* Central vertical line for timeline (visible on md+) */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-pink-400 to-blue-400 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const containerClasses = isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto";
              const contentRowReverse = !isEven ? "md:flex-row-reverse md:text-left" : "";

              // position the dot on the center line with correct side offset
              const dotPositionStyle = isEven ? { right: "-8.5px" } : { left: "-8.5px" };

              return (
                <div
                  key={exp.id}
                  className={`relative ${containerClasses} md:w-1/2`}
                  data-testid={`card-experience-${exp.id}`}
                >
                  <div
                    className="absolute top-8 w-4 h-4 bg-blue-400 rounded-full border-4 border-background hidden md:block glow-primary"
                    style={dotPositionStyle}
                  />

                  <Card className="p-6 md:p-8 hover-elevate transition-all duration-300 hover:shadow-2xl hover:border-blue-400/40 group">
                    <div className={`flex items-start gap-4 ${contentRowReverse}`}>
                      <div className="p-3 bg-blue-400/10 rounded-lg glow-primary shrink-0 group-hover:scale-110 transition-transform">
                        <Briefcase className="w-6 h-6 text-blue-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl md:text-2xl font-semibold mb-2" data-testid={`text-${exp.id}-title`}>
                          {exp.title}
                        </h3>

                        <p className="text-lg text-blue-400 font-medium mb-2" data-testid={`text-${exp.id}-company`}>
                          {exp.company}
                        </p>

                        <div className={`flex items-center gap-2 mb-4 ${isEven ? "md:justify-end" : ""}`}>
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground" data-testid={`text-${exp.id}-period`}>
                            {exp.period}
                          </span>
                        </div>

                        <p className="text-muted-foreground mb-4" data-testid={`text-${exp.id}-description`}>
                          {exp.description}
                        </p>

                        <ul className={`space-y-2 mb-4 ${isEven ? "md:text-right" : ""}`}>
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                              data-testid={`text-${exp.id}-achievement-${i}`}
                            >
                              <span className="text-blue-400 mt-1 shrink-0">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : ""}`}>
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              className="bg-white/3 text-xs px-2 py-1 rounded border border-white/6"
                              data-testid={`badge-${exp.id}-tech-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
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

