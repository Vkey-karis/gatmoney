import React, { useEffect, useRef } from 'react';

const MagneticParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;
        let isDarkMode = document.documentElement.classList.contains('dark');

        // Particle configuration
        const particleCount = 60; // Slightly reduced for subtle effect
        const connectionDistance = 150;
        const mouseRadius = 200; // Interaction radius

        // Theme colors
        const getParticleColor = () => isDarkMode ? 'rgba(100, 116, 139, 0.5)' : 'rgba(148, 163, 184, 0.5)'; // slate-500 / slate-400
        const getLineColor = () => isDarkMode ? 'rgba(100, 116, 139, 0.05)' : 'rgba(148, 163, 184, 0.05)';

        // Track theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    isDarkMode = document.documentElement.classList.contains('dark');
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.directionX = (Math.random() - 0.5) * 0.5; // Slow movement
                this.directionY = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = getParticleColor();
                ctx.fill();
            }

            update() {
                // Mouse Interaction (Magnetic repulsion/flow)
                // Calculate distance between particle and mouse
                let dx = mouseX - this.x;
                let dy = mouseY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouseRadius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouseRadius) {
                    // Push away
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Return to original position (elasticity) or just drift
                    // Implementing drift with gentle return logic for "magnetic" feel
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 50; // Slow return
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 50;
                    }
                }

                // Normal slow drift
                this.baseX += this.directionX;
                this.baseY += this.directionY;

                // Screen wrapping/bouncing logic for base position
                if (this.baseX < 0 || this.baseX > canvas!.width) this.directionX = -this.directionX;
                if (this.baseY < 0 || this.baseY > canvas!.height) this.directionY = -this.directionY;

                this.draw();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }

            // Optional: Draw connecting lines for network effect
            connect();
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                        ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        if (opacityValue > 0) {
                            ctx.strokeStyle = getLineColor().replace(')', `, ${opacityValue})`).replace('rgba', 'rgba').replace(', 0.05', '');
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        };

        // Event Listeners
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Re-init particles on resize
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.x;
            mouseY = e.y;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        // Initial setup
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default MagneticParticles;
