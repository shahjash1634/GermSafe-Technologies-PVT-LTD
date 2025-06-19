import React, { useRef, useEffect } from 'react';
import sword from './sword.png';
import './germBackground.css';

const GermBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const section = document.querySelector('.hero');
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;

    const germs = [];
    const swords = [];
    const mouse = { x: -9999, y: -9999 };

    // Preload sword image
    const swordImg = new Image();
    swordImg.src = sword;

    section.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    class Germ {
      constructor() {
        this.size = Math.random() * 20 + 10;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        this.type = Math.floor(Math.random() * 3); // 3 types
        this.alive = true;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.color = `rgba(${50 + Math.random() * 50}, ${150 + Math.random() * 80}, ${50 + Math.random() * 50}, 0.8)`;
      }

      draw() {
        if (!this.alive) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.fillStyle = this.color;

        switch (this.type) {
          case 0: // rod (bacilli)
            ctx.ellipse(0, 0, this.size, this.size / 3, 0, 0, Math.PI * 2);
            break;
          case 1: // circular (cocci)
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            break;
          case 2: // spiky
            const spikes = 10;
            for (let i = 0; i < spikes; i++) {
              const angle = (Math.PI * 2 / spikes) * i;
              const radius = this.size / 2 + (i % 2 === 0 ? 6 : -3);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              ctx.lineTo(x, y);
            }
            ctx.closePath();
            break;
        }

        ctx.fill();
        ctx.strokeStyle = '#0c3';
        ctx.stroke();
        ctx.restore();
      }

      update() {
        if (!this.alive) return;

        this.x += this.dx;
        this.y += this.dy;
        this.angle += this.rotationSpeed;

        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        const dist = Math.hypot(this.x - mouse.x, this.y - mouse.y);
        if (dist < this.size + 10) {
          this.alive = false;
          swords.push(new SwordEffect(this.x, this.y));
        }

        this.draw();
      }
    }

    class SwordEffect {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 20; // frames
        this.angle = Math.random() * Math.PI;
      }

      draw() {
        if (this.life <= 0) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.life / 20;
        ctx.drawImage(swordImg, -15, -15, 30, 30);
        ctx.restore();

        this.life -= 1;
      }
    }

    for (let i = 0; i < 45; i++) {
      germs.push(new Germ());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      germs.forEach((g) => g.update());
      swords.forEach((s, i) => {
        s.draw();
        if (s.life <= 0) swords.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} className="germ-canvas" />;
};

export default GermBackground;
