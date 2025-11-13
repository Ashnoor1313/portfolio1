// src/components/Skills.jsx
import React from "react";
import { Code2, Brain, Wrench, Database, Rocket } from "lucide-react";
import useScrollAnimation from "../hooks/use-scroll-animation";

/**
 * Lightweight inline Card & Badge to avoid missing UI imports.
 * If you have shared Card/Badge components, replace these with imports.
 */
function Card({ children, className = "", ...props }) {
  return (
    <div className={`glass-card ${className}`} {...props}>
      {children}
    </div>
  );
}
function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

const skillCategories = [
  {
    id: "programming",
    title: "Programming",
    icon: Code2,
    skills: ["Python", "Java", "C++", "JavaScript"],
    color: "primary",
  },
  {
    id: "ai-ml",
    title: "AI/ML",
    icon: Brain,
    skills: ["Deep Learning", "NLP", "Computer Vision", "Generative AI", "Agentic AI"],
    color: "secondary",
  },
  {
    id: "frameworks",
    title: "Frameworks",
    icon: Rocket,
    skills: ["TensorFlow", "PyTorch", "Hugging Face", "LangChain", "LlamaIndex"],
    color: "primary",
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    skills: ["Docker", "GCP", "AWS", "Figma"],
    color: "secondary",
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    skills: ["SQL", "Pinecone", "FAISS", "Chroma"],
    color: "primary",
  },
];

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="skills"
      className={`relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      data-testid="section-skills"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-skills-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400 mx-auto rounded-full shadow-lg glow-primary" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="p-6 hover-elevate transition-all duration-300 hover:shadow-2xl group"
                data-testid={`card-skills-${category.id}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-lg ${
                      category.color === "primary" ? "bg-blue-400/10 group-hover:bg-blue-400/20" : "bg-pink-400/10 group-hover:bg-pink-400/20"
                    } group-hover:scale-110 transition-all duration-300 ${category.color === "primary" ? "glow-primary" : "glow-secondary"}`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${category.color === "primary" ? "text-blue-400" : "text-pink-400"}`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold" data-testid={`text-skills-${category.id}-title`}>
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className={`glass-badge hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-default ${
                        category.color === "primary"
                          ? "border-blue-400/30 hover:border-blue-400/70 hover:bg-blue-400/10"
                          : "border-pink-400/30 hover:border-pink-400/70 hover:bg-pink-400/10"
                      }`}
                      data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-")}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-6 max-w-3xl mx-auto bg-gradient-to-br from-blue-50/5 to-pink-50/5 border-blue-400/20">
            <p className="text-muted-foreground text-sm md:text-base" data-testid="text-skills-note">
              Continuously learning and exploring emerging technologies in AI, machine learning, and software engineering
              to stay at the forefront of innovation.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}


