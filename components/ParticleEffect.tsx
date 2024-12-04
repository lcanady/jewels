import React, { useRef, useEffect } from 'react';

interface ParticleEffectProps {
  x: number;
  y: number;
  color: string;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ x, y, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        radius: Math.random() * 3 + 1,
        alpha: 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.02;

        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }
      });

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [x, y, color]);

  return <canvas ref={canvasRef} className="absolute pointer-events-none" width={300} height={300} />;
};

export default ParticleEffect;

