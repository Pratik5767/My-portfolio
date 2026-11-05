import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // --- Cinematic Stagger Entrance on Scroll ---
        gsap.fromTo(
            cardRefs.current,
            { y: 80, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
        const cards = cardRefs.current;
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

    }, []);

    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[#050b14] text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
        >
            {/* Background Cinematic Red Ambient Glows */}
            <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">

                {/* Section Header */}
                <div className="flex flex-col items-start space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-sky-500/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                        <span className="text-cyan-400 font-bold">EPISODE 01</span>
                        <span className="text-white/40">|</span>
                        <span>ABOUT THE ENGINEER</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                        EPISODE SYNOPSIS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
                            ORIGIN & VISION.
                        </span>
                    </h2>
                </div>

                {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Card 1: Bio & Academic Core */}
                    <div
                        ref={addToRefs}
                        className="md:col-span-12 p-8 md:p-12 bg-[#0d1b2a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-sky-500/60 transition-all duration-500 overflow-hidden"
                    >
                        {/* Real-time mouse hover spotlight highlight */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(56,189,248,0.15), transparent 70%)'
                            }}
                        ></div>

                        <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
                            01
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
                            <div className="lg:col-span-7 space-y-5">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Cast & Background</h3>
                                <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                                    I am <span className="text-white font-bold drop-shadow">Pratik Vishwas Salunkhe</span>, a Computer Science & Engineering graduate with a foundation in AI, machine learning, data, and cloud engineering.
                                </p>
                                <p className="text-sm md:text-base text-white/60 font-light leading-relaxed max-w-3xl">
                                    I work on end-to-end AI projects, from data preparation and model development to performance reporting, with exposure to Generative AI, LLMs, and prompt engineering. I am seeking an entry-level role to find automation opportunities and support data-informed decisions.
                                </p>
                            </div>

                            <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-8 space-y-5">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Education</h3>
                                <div>
                                    <p className="text-sm md:text-base font-semibold text-white">B.E. in Computer Science & Engineering</p>
                                    <p className="mt-1 text-sm text-white/65">Ajeenkya D Y Patil School of Engineering</p>
                                    <p className="mt-1 text-xs font-mono text-white/45">Pune, Maharashtra · Aug 2021 - Jun 2025</p>
                                    <p className="mt-3 inline-flex rounded-md border border-sky-400/20 bg-sky-400/5 px-2.5 py-1 text-xs font-mono text-cyan-200">CGPA: 6.39 / 10</p>
                                </div>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="text-xs font-mono uppercase tracking-wider text-white/45">Earlier Education</p>
                                    <p className="mt-2 text-sm leading-relaxed text-white/65">12th - Bharat English School and Junior College, Pune</p>
                                    <p className="mt-1 text-sm leading-relaxed text-white/65">10th - Priyadarshani Group of Schools</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-wrap gap-2 relative z-10">
                            <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">AI & Machine Learning</span>
                            <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Generative AI</span>
                            <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80">Data Engineering</span>
                        </div>
                    </div>

                    {/* Card 2: Professional Experience & Certifications */}
                    <div
                        ref={addToRefs}
                        className="md:col-span-12 p-8 md:p-10 bg-[#0d1b2a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col gap-8 relative group hover:border-sky-500/60 transition-all duration-500 overflow-hidden"
                    >
                        {/* Real-time mouse hover spotlight highlight */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(56,189,248,0.15), transparent 70%)'
                            }}
                        ></div>

                        <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
                            02
                        </div>

                        <div className="relative z-10 space-y-5">
                            <div>
                                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Professional Experience</h3>
                                <p className="mt-2 text-sm text-white/50">AI, machine learning, and application development</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                                        <div>
                                            <h4 className="text-base md:text-lg font-bold text-white">AI/ML Developer Intern</h4>
                                            <p className="mt-1 text-sm font-medium text-cyan-300">AB Infotech Solutions Pvt. Ltd.</p>
                                        </div>
                                        <span className="w-fit rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-cyan-200">
                                            Jul 2026 - Present
                                        </span>
                                    </div>
                                    <p className="mb-3 text-xs font-mono uppercase tracking-wider text-white/40">Pune, Maharashtra</p>
                                    <ul className="space-y-2.5 text-sm leading-relaxed text-white/70">
                                        <li className="flex gap-2.5"><span className="text-cyan-400">&#8250;</span><span>Develop and evaluate business-focused AI/ML solutions with Python, Scikit-learn, Pandas, NumPy, and PyTorch.</span></li>
                                        <li className="flex gap-2.5"><span className="text-cyan-400">&#8250;</span><span>Build LLM and RAG features using generative AI APIs, prompt engineering, LangChain, and vector databases.</span></li>
                                        <li className="flex gap-2.5"><span className="text-cyan-400">&#8250;</span><span>Prepare data, perform EDA and feature engineering, and assess models with standard evaluation metrics.</span></li>
                                        <li className="flex gap-2.5"><span className="text-cyan-400">&#8250;</span><span>Expose AI services through FastAPI and improve application accuracy, latency, and performance.</span></li>
                                    </ul>
                                </article>

                                <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                                        <div>
                                            <h4 className="text-base md:text-lg font-bold text-white">Software Trainee</h4>
                                            <p className="mt-1 text-sm font-medium text-cyan-300">TechLeaper Systems Pvt. Ltd.</p>
                                        </div>
                                        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/60">
                                            Jan 2024 - Feb 2024
                                        </span>
                                    </div>
                                    <p className="mb-3 text-xs font-mono uppercase tracking-wider text-white/40">Pune, Maharashtra</p>
                                    <ul className="space-y-2.5 text-sm leading-relaxed text-white/70">
                                        <li className="flex gap-2.5"><span className="text-cyan-400">&#8250;</span><span>Developed Python and MySQL web applications for e-commerce and bookstore management.</span></li>
                                        <li className="flex gap-2.5"><span className="text-cyan-400">&#8250;</span><span>Implemented structured database operations for user management, application workflows, and CRUD functionality.</span></li>
                                        <li className="flex gap-2.5"><span className="text-cyan-400">&#8250;</span><span>Improved usability through responsive frontend/backend integration and collaborated on feature delivery.</span></li>
                                    </ul>
                                </article>
                            </div>
                        </div>

                        <div className="relative z-10 border-t border-white/10 pt-6">
                            <div className="mb-4">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Certifications</h3>
                                <p className="mt-2 text-sm text-white/50">Select a credential to view its verification.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                                <a href="https://learn.microsoft.com/api/credentials/share/en-us/PratikSalunkhe-6095/E93D8335277ACB03?sharingId=7FE8D0479ADEF4A4" target="_blank" rel="noopener noreferrer" className="group/cert flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-sky-400/40 hover:bg-sky-400/5 transition-colors">
                                    <span>
                                        <span className="block text-xs font-semibold leading-relaxed text-white">Azure AI Apps and Agents Developer Associate</span>
                                        <span className="mt-1 block text-[10px] font-mono text-white/45">Microsoft - AI-103 - 2026</span>
                                    </span>
                                    <span aria-hidden="true" className="shrink-0 text-cyan-400 group-hover/cert:translate-x-0.5 transition-transform">&#8599;</span>
                                </a>
                                <a href="https://learn.microsoft.com/api/credentials/share/en-us/PratikSalunkhe-6095/8C79E9BB3E6FA787?sharingId=7FE8D0479ADEF4A4" target="_blank" rel="noopener noreferrer" className="group/cert flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-sky-400/40 hover:bg-sky-400/5 transition-colors">
                                    <span>
                                        <span className="block text-xs font-semibold leading-relaxed text-white">Fabric Data Engineer Associate</span>
                                        <span className="mt-1 block text-[10px] font-mono text-white/45">Microsoft - DP-700 - 2026</span>
                                    </span>
                                    <span aria-hidden="true" className="shrink-0 text-cyan-400 group-hover/cert:translate-x-0.5 transition-transform">&#8599;</span>
                                </a>
                                <a href="https://www.udemy.com/certificate/UC-c3257694-0787-4bf0-8695-dabc215ddb02/" target="_blank" rel="noopener noreferrer" className="group/cert flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-sky-400/40 hover:bg-sky-400/5 transition-colors">
                                    <span>
                                        <span className="block text-xs font-semibold leading-relaxed text-white">SQL for Data Analysis</span>
                                        <span className="mt-1 block text-[10px] font-mono text-white/45">Udemy - 2026</span>
                                    </span>
                                    <span aria-hidden="true" className="shrink-0 text-cyan-400 group-hover/cert:translate-x-0.5 transition-transform">&#8599;</span>
                                </a>
                                <a href="https://www.udemy.com/certificate/UC-1a099b58-3831-4f16-877c-5a058dd9ceb8/" target="_blank" rel="noopener noreferrer" className="group/cert flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-sky-400/40 hover:bg-sky-400/5 transition-colors">
                                    <span>
                                        <span className="block text-xs font-semibold leading-relaxed text-white">Azure Cloud Fundamentals</span>
                                        <span className="mt-1 block text-[10px] font-mono text-white/45">Udemy - 2026</span>
                                    </span>
                                    <span aria-hidden="true" className="shrink-0 text-cyan-400 group-hover/cert:translate-x-0.5 transition-transform">&#8599;</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Technical Ecosystem (Span 12) */}
                    <div
                        ref={addToRefs}
                        className="md:col-span-12 p-8 md:p-12 bg-[#0d1b2a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-sky-500/60 transition-all duration-500 overflow-hidden relative group"
                    >
                        {/* Real-time mouse hover spotlight highlight */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(56,189,248,0.15), transparent 70%)'
                            }}
                        ></div>

                        <div className="space-y-2 text-left relative z-10">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Technical Focus & Languages</h3>
                            <p className="text-base md:text-lg font-semibold text-white">Tools, platforms, and languages from my resume.</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 relative z-10">
                            {['Python', 'SQL', 'Scikit-learn', 'LangChain', 'LangGraph', 'FastAPI', 'Power BI', 'Azure', 'React', 'Marathi', 'Hindi', 'English'].map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 rounded bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-white shadow-inner hover:bg-sky-500/20 hover:border-sky-500/40 hover:scale-105 transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default About;