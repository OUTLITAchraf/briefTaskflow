import { Link, Head } from "@inertiajs/react";
import { ClipboardList, Users, CheckCircle2, BarChart3 } from "lucide-react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome | TaskFlow" />
            <div
                className="relative min-h-screen bg-gray-900 text-white bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1920&q=80')",
                }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Top-right Login/Register or Dashboard */}
                <div className="relative sm:fixed sm:top-0 sm:right-0 p-6 text-end z-50">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-white hover:text-blue-400"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-white hover:text-blue-400"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-white hover:text-blue-400"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Hero Section */}
                <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-12 text-center">
                    <ClipboardList className="h-16 w-16 text-blue-400 mx-auto" />
                    <h1 className="mt-6 text-5xl font-extrabold text-white drop-shadow-lg">
                        Welcome to TaskFlow
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
                        Organize, assign, and track tasks easily. Collaborate
                        with your team and boost productivity.
                    </p>
                </div>

                {/* Features Section */}
                <div className="relative z-10 mt-16 max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Feature Card */}
                    <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg p-6 text-gray-900 hover:scale-105 transition-transform">
                        <ClipboardList className="w-10 h-10 text-blue-600 mb-4" />
                        <h2 className="text-xl font-semibold">Task Management</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Create, update, and assign tasks. Monitor progress in real time.
                        </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg p-6 text-gray-900 hover:scale-105 transition-transform">
                        <Users className="w-10 h-10 text-green-600 mb-4" />
                        <h2 className="text-xl font-semibold">User Management</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage team members, assign roles, and control permissions.
                        </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg p-6 text-gray-900 hover:scale-105 transition-transform">
                        <CheckCircle2 className="w-10 h-10 text-yellow-600 mb-4" />
                        <h2 className="text-xl font-semibold">Progress Tracking</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Track pending, in-progress, and completed tasks at a glance.
                        </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur rounded-lg shadow-lg p-6 text-gray-900 hover:scale-105 transition-transform">
                        <BarChart3 className="w-10 h-10 text-purple-600 mb-4" />
                        <h2 className="text-xl font-semibold">Analytics & Reports</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Gain insights into team performance and task completion rates.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 flex justify-center mt-16 pb-6 text-sm text-gray-300">
                    © {new Date().getFullYear()} TaskFlow — All Rights Reserved
                </div>
            </div>
        </>
    );
}
