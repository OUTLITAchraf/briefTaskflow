import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {    
    const role = auth.user.roles.map(role => role.name);
    const isAdmin = role.includes('admin');
    const isUser = role.includes('user');
    console.log(role);
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {isAdmin && (
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:mt-10">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h2 className='p-6 text-2xl font-bold text-gray-900'>Welcome {auth.user.name}</h2>
                        <p className="p-6 text-gray-900">You're logged in as Admin!</p>
                    </div>
                </div>
            )}
            {isUser &&  (
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:mt-10">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h2 className='p-6 text-2xl font-bold text-gray-900'>Welcome User {auth.user.name}</h2>
                        <p className="p-6 text-gray-900">You're logged in!</p>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
