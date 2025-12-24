// src/components/Projects.jsx
import React from "react";
import { ExternalLink, Github } from "lucide-react";
import useScrollAnimation from "../hooks/use-scroll-animation";

/* Small inline UI pieces so this file runs without external UI imports.
   Replace these with your real shared components if you prefer.
*/
function Card({ children, className = "", style = {}, ...props }) {
  return (
    <div className={`glass-card ${className}`} style={style} {...props}>
      {children}
    </div>
  );
}
function CardHeader({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
function CardTitle({ children, className = "" }) {
  return <h3 className={`text-xl md:text-2xl font-bold ${className}`}>{children}</h3>;
}
function CardDescription({ children, className = "" }) {
  return <div className={`text-muted-foreground ${className}`}>{children}</div>;
}
function CardContent({ children, className = "" }) {
  return <div className={`p-4 flex-1 ${className}`}>{children}</div>;
}
function CardFooter({ children, className = "" }) {
  return <div className={`p-4 flex gap-2 ${className}`}>{children}</div>;
}
function Badge({ children, className = "" }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${className}`}>{children}</span>;
}
function SmallButton({ children, className = "", href = "#", ...props }) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm border border-white/6 hover:shadow-md transition ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}

const projects = [
  {
    id: "potatoguard",
    title: "PotatoGuard",
    year: "2025",
    description: "AI-based leaf disease diagnosis system using CNN with TensorFlow for precise plant health monitoring.",
    longDescription: "Developed a comprehensive plant disease detection system achieving 95% accuracy through advanced CNN architecture. Full-stack deployment on Docker and Render.",
    accuracy: "95%",
    technologies: ["TensorFlow", "CNN", "React", "Docker", "Render"],
    github: "https://github.com/Ashnoor1313/PotatoGuard.git",
    highlights: [
      "95% disease classification accuracy",
      "Real-time image processing",
      "Full-stack React deployment",
      "Dockerized for scalability",
    ],
  },
  {
    "id": "alertify",
    "title": "Alertify — AI Fraud Detection System",
    "year": "2025",
    "description": "AI-driven fraud detection platform using Machine Learning, Deep Learning, and NLP to identify malicious QR codes, URLs, UPI IDs, SMS, and phone numbers.",
    "longDescription": "Developed a production-ready fraud detection system combining CNN-based image analysis and NLP-based text classification. Implemented FastAPI backend APIs, real-time inference engine, and a React-based UI. Optimized models for accuracy, scalability, and low-latency deployment.",
    "technologies": [
      "Machine Learning",
      "Deep Learning",
      "CNN",
      "NLP",
      "Python",
      "FastAPI",
      "React",
      "JavaScript",
      "Model Deployment",
      "API Development"
    ],
    "github": "https://github.com/Ashnoor1313/Alertifynew.git",
    "highlights": [
      "Real-time fraud detection",
      "Multi-modal ML pipeline",
      "High accuracy model",
      "Scalable API architecture"
    ]
  },  
  {
    id: "querysense",
    title: "QuerySense",
    year: "2025",
    description: "NLP + LLM-powered intelligent document search built using FastAPI, LangChain, and React.",
    longDescription: "Created an advanced document search engine combining NLP and large language models for intelligent query understanding and retrieval.",
    accuracy: null,
    technologies: ["FastAPI", "LangChain", "NLP", "LLM", "React"],
    github: "https://github.com/Ashnoor1313/NLP-Query-Engine.git",
    highlights: [
      "Semantic search capabilities",
      "LangChain integration",
      "FastAPI backend",
      "Intelligent query parsing",
    ],
  },
];

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="projects"
      className={`relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      data-testid="section-projects"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-projects-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400 mx-auto rounded-full shadow-lg glow-primary" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const animStyle = {
              animationDelay: `${index * 150}ms`,
              animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 150}ms both` : "none",
            };

            return (
              <Card
                key={project.id}
                className="hover-elevate transition-all duration-300 hover:shadow-2xl hover:border-blue-400/40 flex flex-col overflow-hidden group"
                style={animStyle}
                data-testid={`card-project-${project.id}`}
              >
                {/* decorative hover layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle data-testid={`text-${project.id}-title`}>{project.title}</CardTitle>
                    <Badge className="bg-white/3 text-xs px-2 py-1 rounded border border-white/6" data-testid={`badge-${project.id}-year`}>
                      {project.year}
                    </Badge>
                  </div>
                  <CardDescription className="text-muted-foreground" data-testid={`text-${project.id}-description`}>
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 flex-1">
                  <p className="text-sm text-muted-foreground mb-4" data-testid={`text-${project.id}-long-description`}>
                    {project.longDescription}
                  </p>

                  {project.accuracy && (
                    <div className="mb-4 p-3 glass-card rounded-lg border border-blue-400/20">
                      <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                      <p className="text-2xl font-bold text-blue-400" data-testid={`text-${project.id}-accuracy`}>
                        {project.accuracy}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {project.highlights.map((highlight, hidx) => (
                      <div key={hidx} className="flex items-start gap-2" data-testid={`text-${project.id}-highlight-${hidx}`}>
                        <span className="text-blue-400 text-xs mt-0.5">▸</span>
                        <span className="text-xs text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} className="text-xs bg-white/3 border border-white/6 px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="relative z-10 gap-2">
                  <SmallButton href={project.github} data-testid={`button-${project.id}-github`}>
                    <Github className="w-4 h-4" /> GitHub
                  </SmallButton>
                  <SmallButton href={project.github} data-testid={`button-${project.id}-view`}>
                    <ExternalLink className="w-4 h-4" /> View
                  </SmallButton>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}


