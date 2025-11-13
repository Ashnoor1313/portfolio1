// src/components/AIBackground.jsx
import React, { useEffect, useRef } from "react";

export default function AIBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    const particles = [];
    let animationFrameId = 0;

    // Detect mobile device (static background mode)
    const isMobile = window.innerWidth < 768;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(DPR, DPR);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const handleMouseMove = (e) => {
      if (!isMobile) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const COLORS = [
      "rgba(0, 191, 255, ALPHA)",
      "rgba(255, 79, 161, ALPHA)",
      "rgba(124, 58, 237, ALPHA)",
      "rgba(14, 165, 233, ALPHA)"
    ];

    function Particle() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;

      this.baseX = this.x;
      this.baseY = this.y;

      this.angle = Math.random() * Math.PI * 2;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;

      this.radius = Math.random() * 2.2 + 1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)].replace("ALPHA", "0.65");

      this.pulseOffset = Math.random() * 1000;
    }

    Particle.prototype.update = function (time) {
      if (isMobile) return; // ❗ No movement on mobile

      // Orbit & movement
      this.angle += 0.005;
      this.x += Math.cos(this.angle) * 0.4;
      this.y += Math.sin(this.angle) * 0.4;

      // Mouse interaction
      const dx = mouseRef.current.x - this.x;
      const dy = mouseRef.current.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 160;

      if (dist < maxDist) {
        const force = (maxDist - dist) / maxDist;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * 0.25;
        this.vy -= Math.sin(angle) * force * 0.25;
      }

      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.92;
      this.vy *= 0.92;

      this.vx += (this.baseX - this.x) * 0.005;
      this.vy += (this.baseY - this.y) * 0.005;

      // Pulse effect
      this.radius = 1.4 + Math.sin(time * 0.002 + this.pulseOffset) * 0.6;

      // Wrap
      if (this.x < 0) this.x = window.innerWidth;
      if (this.x > window.innerWidth) this.x = 0;
      if (this.y < 0) this.y = window.innerHeight;
      if (this.y > window.innerHeight) this.y = 0;
    };

    Particle.prototype.draw = function (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      // Glow
      const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
      glow.addColorStop(0, this.color.replace("0.65", "0.28"));
      glow.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
      ctx.fill();
    };

    // Particle count reduced a bit for mobile clarity
    const COUNT = isMobile ? 40 : 120;
    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      if (isMobile) return; // ❗ No lines on mobile for clean UI

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const grad = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            grad.addColorStop(0, "rgba(0,191,255,0.25)");
            grad.addColorStop(1, "rgba(255,79,161,0.25)");

            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = (1 - dist / 140) * 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = (time) => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.06)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p) => {
        p.update(time);
        p.draw(ctx);
      });

      drawConnections();

      if (!isMobile) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // For mobile: draw ONLY a static frame
    if (isMobile) {
      particles.forEach((p) => p.draw(ctx));
      drawConnections(); // optional (kept off)
    } else {
      animate(0);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.55 }}
    />
  );
}
