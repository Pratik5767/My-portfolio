import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/my-photo.jpg';



const Hero = () => {
    const sectionRef = useRef(null);
    const cardRef = useRef(null);
    const glareRef = useRef(null);
    const spotlightRef = useRef(null);
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const contentRef = useRef(null);

    const developerRoles = [
        'AI SYSTEMS // GENERATIVE AI',
        'DATA ENGINEERING // ANALYTICS',
        'INTELLIGENT APPLICATIONS // RAG',
        'SCALABLE PIPELINES // CLOUD DATA'
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const card = cardRef.current;
        const content = contentRef.current;
        if (!section || !card || !content) return;

        // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(
            section.querySelector('header'),
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        )
            .fromTo(
                content.querySelectorAll('.hero-anim-item'),
                { y: 50, opacity: 0, filter: "blur(10px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
                "-=0.7"
            )
            .fromTo(
                card,
                { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
                { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
                "-=0.9"
            );

        // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
        gsap.set([cursorDotRef.current, cursorRingRef.current], {
            scale: 0.5,
            opacity: 0,
            transformOrigin: "50% 50%"
        });

        const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
        const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });

        const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
        const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

        const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
        const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
        const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
        const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

        const handleMouseMove = (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const dotSize = 12;
            const ringSize = 48;

            // Update Spotlight position instantly via inline style
            if (spotlightRef.current) {
                spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
            }

            // Update Custom Cursor coordinates
            xToDot(x - dotSize / 2);
            yToDot(y - dotSize / 2);
            xToRing(x - ringSize / 2);
            yToRing(y - ringSize / 2);

            // Card 3D Perspective Calculations
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
            const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

            const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
            const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

            xTilt(rotateY);
            yTilt(rotateX);

            // Holographic Glare mapping
            glareX((x - cardRect.left) - cardRect.width / 2);
            glareY((y - cardRect.top) - cardRect.height / 2);
        };

        const handleMouseEnter = () => {
            gsap.to([cursorDotRef.current, cursorRingRef.current], {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
            gsap.to([cursorDotRef.current, cursorRingRef.current], {
                opacity: 0,
                scale: 0.5,
                duration: 0.3,
                ease: "power2.inOut"
            });
            if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
            xTilt(0);
            yTilt(0);
        };

        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseenter", handleMouseEnter);
        section.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            section.removeEventListener("mousemove", handleMouseMove);
            section.removeEventListener("mouseenter", handleMouseEnter);
            section.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative w-full h-screen bg-[#050b14] overflow-hidden flex flex-col justify-between select-none cursor-none"
        >
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

            {/* 1. Cinematic Background Gradient & Marquee */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-black/90 to-[#050b14] z-0">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[...developerRoles, ...developerRoles].map((role, idx) => (
                            <span key={idx} className="text-[14vw] font-black text-sky-600 mx-8 uppercase tracking-tighter">
                                {role} &bull;
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
            <div
                ref={spotlightRef}
                className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0.1) 40%, transparent 70%)'
                }}
            ></div>

            {/* 3. Main Content Layer */}
            <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12">

                {/* Top Netflix Cinematic Badge */}
                <div className="hero-anim-item flex items-center justify-between w-full">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-sky-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                        <span className="text-cyan-400 font-bold tracking-wider">AI & DATA ENGINEERING</span>
                        <span className="text-white/40">|</span>
                        <span className="text-white/80">PROFILE • 2026</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
                        <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">AI ENGINEER</span>
                        <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">DATA ENGINEERING</span>
                    </div>
                </div>

                {/* Main Center Cinematic Stage Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">

                    {/* Left Side: Developer Story & Description */}
                    <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">

                        <div className="hero-anim-item flex items-center gap-3">
                            <span className="px-2.5 py-0.5 bg-sky-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(56,189,248,0.8)] animate-pulse">AI ENGINEER</span>
                            <span className="text-white/80 text-xs font-mono tracking-widest uppercase">Data Engineering & Intelligent Systems</span>
                        </div>

                        <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                            PRATIK <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]">
                                SALUNKHE
                            </span>
                        </h1>

                        <div className="hero-anim-item flex items-center gap-3 text-xs font-mono text-sky-300 font-bold">
                            <span className="px-2 py-0.5 bg-sky-500/10 border border-sky-500/30 rounded text-cyan-400">AI • DATA</span>
                            <span className="text-white/40">•</span>
                            <span>Python • SQL • Pandas</span>
                            <span className="text-white/40">•</span>
                            <span className="text-white/70">GenAI • FastAPI • Power BI</span>
                        </div>

                        <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
                            Computer Science graduate building AI/ML applications, data-driven solutions, and AI-powered automation for business use cases.
                        </p>

                        {/* Action Button Set */}
                        <div className="hero-anim-item flex items-center gap-4 pt-2">
                            <a
                                href="#projects"
                                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-sky-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                View Projects
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
                            >
                                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                Contact Me
                            </a>
                        </div>
                    </div>

                    {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
                    <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
                        <div
                            ref={cardRef}
                            className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
                        >
                            {/* Cinematic Red Neon Back Glow */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-sky-500/70 via-cyan-400/40 to-blue-500/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>

                            {/* Poster Card with Glossy Sheen */}
                            <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#0d1b2a]/90 backdrop-blur-2xl rounded-2xl border border-sky-500/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">

                                {/* Dynamic Specular Glare Layer */}
                                <div
                                    ref={glareRef}
                                    className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                                ></div>

                                {/* Netflix Series Tag */}
                                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-sky-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                                    FEATURED DEV
                                </div>

                                <img
                                    src={pictureImg}
                                    alt="Pratik Vishwas Salunkhe"
                                    className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Technical Specs & Stack */}
                    <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
                        <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2">Focus & Credentials</h3>
                            <p className="text-xs text-white/80 leading-relaxed font-light">
                                AI/ML development, LLM and RAG features, prompt engineering, FastAPI, Azure, and Power BI.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Cinematic Ticker */}
                <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
                    <span>BUILDING INTELLIGENT DATA SYSTEMS</span>
                    <span>[ AI & DATA PORTFOLIO ]</span>
                </div>
            </div>

            {/* 4. Ultra Pro Max Custom Precision Cursor Suite */}
            <div
                ref={cursorDotRef}
                className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-sky-500 rounded-full shadow-[0_0_15px_#38BDF8]"
            ></div>

            <div
                ref={cursorRingRef}
                className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-sky-500/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
            ></div>

            {/* --- FIXED PORTFOLIO NAVBAR --- */}
            <header className="fixed top-0 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-7xl px-6 md:px-12 py-4 md:py-5 flex items-center justify-between bg-[#050b14]/85 backdrop-blur-xl border-b border-sky-400/15 pointer-events-auto">
                <div className="text-2xl font-black text-sky-500 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(56,189,248,0.9)]">
                    PRATIK<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
                    <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
                    <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
                    <a href="#expertise" className="hover:text-cyan-400 transition-colors">Expertise</a>
                    <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
                    <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
                    <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
                </nav>
                <a
                    href="#contact"
                    className="px-5 py-2 rounded bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.6)] hover:scale-105 active:scale-95"
                >
                    Hire Me
                </a>
            </header>
        </section>
    );
};

export default Hero;