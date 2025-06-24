function PageLoadingSpinner() {
    return (
        <div className="flex items-center justify-center h-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#music-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-music animate-trace"
            >
                <defs>
                    <linearGradient id="music-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E23838" />   {/* blue-400 */}
                        <stop offset="1" stopColor="#B051F9" /> {/* pink-400 */}
                    </linearGradient>
                </defs>
                <path
                    d="M9 18V5l12-2v13"
                    className="trace-path"
                />
                <circle cx="6" cy="18" r="3" className="trace-path" />
                <circle cx="18" cy="16" r="3" className="trace-path" />
            </svg>
        </div>
    );
}

export default PageLoadingSpinner;