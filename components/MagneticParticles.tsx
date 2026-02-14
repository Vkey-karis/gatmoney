import React, { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { type Container, type ISourceOptions } from '@tsparticles/engine';

const MagneticParticles: React.FC = () => {
    const [init, setInit] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Initialize tsparticles engine
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Theme detection
    useEffect(() => {
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse", // Magnetic push effect
                    },
                },
                modes: {
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: isDarkMode ? "#64748b" : "#94a3b8", // Slate-500 / Slate-400
                },
                links: {
                    color: isDarkMode ? "#64748b" : "#94a3b8",
                    distance: 150,
                    enable: true,
                    opacity: 0.2, // Subtle links
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 2, // Gentle drift
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        // area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [isDarkMode],
    );

    if (!init) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
};

export default MagneticParticles;
