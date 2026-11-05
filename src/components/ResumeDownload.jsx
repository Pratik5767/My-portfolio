import resumePdf from '../assets/Portfolio/Pratik_Salunkhe_Resume.pdf'



const ResumeDownload = ({ className = 'px-6 py-3.5' }) => (
    <a
        href={resumePdf}
        download="Pratik-Vishwas-Salunkhe-CV.pdf"
        className={`flex items-center gap-2 whitespace-nowrap rounded border border-sky-400/50 bg-sky-950/50 text-xs font-bold uppercase tracking-widest text-cyan-100 shadow-[0_0_25px_rgba(56,189,248,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:bg-sky-900/70 active:scale-95 ${className}`}
    >
        <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
        >
            <path d="M12 3v12m-5-5 5 5 5-5M5 18v3h14v-3" />
        </svg>
        <span>Download CV</span>
        <span className="text-[10px] text-sky-200/60">PDF</span>
    </a>
);

export default ResumeDownload;
