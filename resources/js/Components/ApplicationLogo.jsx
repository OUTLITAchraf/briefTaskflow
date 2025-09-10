export default function ApplicationLogo({ className = "" }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            {/* Logo */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-10 h-10 text-blue-600"
                fill="currentColor"
            >
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" fill="none" />
                <path
                    d="M30 50 L45 65 L70 40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                />
            </svg>

            {/* Text */}
            <span className="text-2xl font-bold text-gray-800 ml-2 mr-1">
                Task
            </span>
            <span className="text-2xl font-bold text-blue-600">
                Flow
            </span>
        </div>
    );
}
