import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {    
    const role = auth.user.roles.map(role => role.name);
    const isAdmin = role.includes('admin');
    const isUser = role.includes('user');
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-white">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            {isAdmin && (
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:mt-10">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <h2 className='p-6 text-2xl font-bold text-gray-900 dark:text-white'>Welcome {auth.user.name}</h2>
                        <p className="p-6 text-gray-900 dark:text-white">You're logged in as Admin!</p>
                    </div>
                </div>
            )}
            {isUser &&  (
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 lg:mt-10">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <h2 className='p-6 text-2xl font-bold text-gray-900 dark:text-white'>Welcome User {auth.user.name}</h2>
                        <p className="p-6 text-gray-900 dark:text-white">You're logged in!</p>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
