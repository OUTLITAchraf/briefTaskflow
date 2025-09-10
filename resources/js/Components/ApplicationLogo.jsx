export default function ApplicationLogo({ className = "" }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            {/* Logo */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-square-check w-10 h-10"
            >
                <defs>
                    <linearGradient id="taskflowGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#60A5FA" />
                        <stop offset="100%" stop-color="#1D4ED8" />
                    </linearGradient>
                </defs>

                <rect width="18" height="18" x="3" y="3" rx="2" fill="url(#taskflowGradient)" />

                <path d="m9 12 2 2 4-4" stroke="white" />
            </svg>


            {/* Text */}
            <span className="text-2xl font-bold text-gray-800 dark:text-white ml-2 mr-1">
                Task
            </span>
            <span className="text-2xl font-bold text-blue-600">Flow</span>
        </div>
    );
}
