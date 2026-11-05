import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
    {
        number: "01",
        title: "AI & Machine Learning",
        text: "Developing Python solutions for business use cases with Scikit-learn, Pandas, NumPy, and foundational PyTorch experience.",
        tag: "AI / ML ENGINEERING",
        gradient: "from-[#0c1a2a] via-[#0d1724] to-[#07111d]"
    },
    {
        number: "02",
        title: "Generative AI & Agents",
        text: "Building LLM-powered features with generative AI APIs, prompt engineering, LangChain, LangGraph, and retrieval-augmented generation.",
        tag: "GENAI & RAG",
        gradient: "from-[#0b1c2d] via-[#0c1724] to-[#070e18]"
    },
    {
        number: "03",
        title: "Data & Business Intelligence",
        text: "Preparing and exploring data, shaping ETL/ELT workflows, and presenting analytical findings with SQL, Python, Power BI, and Excel.",
        tag: "DATA & REPORTING",
        gradient: "from-[#0d2033] via-[#101a28] to-[#08111c]"
    },
    {
        number: "04",
        title: "Web APIs & Automation",
        text: "Connecting AI models and applications with FastAPI, REST APIs, React, Node.js, and Microsoft Power Platform integrations.",
        tag: "APPS & INTEGRATIONS",
        gradient: "from-[#0a1928] via-[#0c1722] to-[#070f18]"
    }
];

const Expertise = () => {
    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const cards = cardRefs.current;
        if (!cards.length) return;

        cards.forEach((card, index) => {
            if (index === cards.length - 1) return; // Keep the top-most card fully focused

            gsap.to(card, {
                scale: 0.92 - index * 0.025,
                y: -15 - index * 8,
                filter: "blur(6px)",
                opacity: 0.4,
                scrollTrigger: {
                    trigger: card,
                    start: `top ${90 + index * 20}px`,
                    end: "bottom top",
                    scrub: true,
                }
            });
        });

        // Magnetic mouse highlight per card
        const handleMouseMove = (e, card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        cards.forEach((card) => {
            if (!card) return;
            const listener = (e) => handleMouseMove(e, card);
            card.addEventListener('mousemove', listener);
            return () => card.removeEventListener('mousemove', listener);
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    return (
        <section
            id="expertise"
            ref={containerRef}
            className="relative w-full bg-[#050b14] text-white py-20 px-6 md:px-12 select-none overflow-hidden"
        >
            {/* Cinematic Red Ambient Glow */}
            <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">

                {/* Compact Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                    <div className="space-y-3 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-sky-500/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping"></span>
                            <span className="text-cyan-400 font-bold">EPISODE 02</span>
                            <span className="text-white/40">|</span>
                            <span>CORE COMPETENCIES</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            DIRECTOR'S CUT <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                                TECHNICAL CAPABILITIES.
                            </span>
                        </h2>
                    </div>
                    <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
                        Applying AI, machine learning, cloud engineering, and automation to practical business problems.
                    </p>
                </div>

                {/* Compact 1-on-1 Gradient Stacking Container */}
                <div className="relative flex flex-col gap-8 pb-20">
                    {expertiseData.map((item, index) => (
                        <div
                            key={index}
                            ref={addToRefs}
                            className={`sticky w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-sky-500/50`}
                            style={{
                                zIndex: index + 1,
                                top: `${95 + index * 16}px`
                            }}
                        >
                            {/* Dynamic Mouse Spotlight Highlight */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                                style={{
                                    background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(56,189,248,0.18), transparent 70%)'
                                }}
                            ></div>

                            {/* Crimson Accent Stripe */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent z-10"></div>

                            {/* Card Header Top */}
                            <div className="flex items-center justify-between w-full mb-4 relative z-10">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/25">
                                    {item.tag}
                                </span>
                                <span className="text-2xl md:text-3xl font-mono font-black text-white/20">
                                    {item.number}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto relative z-10">
                                <div className="lg:col-span-5">
                                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="lg:col-span-7">
                                    <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </div>

                            {/* Subtle Red Corner Dot */}
                            <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:shadow-[0_0_10px_#38BDF8] z-10 transition-all"></div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Expertise;