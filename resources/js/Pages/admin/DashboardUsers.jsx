import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';

export default function DashboardUsers({ auth, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
                toast.success('User created successfully');
            },
            onError: () => {
                toast.error('Failed to create user');
            }
        });
    };

    const handleUpdateUser = (userId) => {
        // Add user update logic here
    };

    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('users.destroy', userId), {
                    onSuccess: () => {
                        toast.success('User deleted successfully');
                    },
                    onError: () => {
                        toast.error('Failed to delete user');
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage Users" />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
                                {/* Modal */}
                                {showModal && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
                                            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                                                Create New User
                                            </h2>
                                            <form onSubmit={handleSubmit}>
                                                {/* Name */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full border rounded p-2 bg-white dark:bg-gray-700 dark:text-gray-100"
                                                        value={data.name}
                                                        onChange={(e) => setData("name", e.target.value)}
                                                    />
                                                    {errors.name && (
                                                        <div className="text-red-500 text-sm">{errors.name}</div>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="w-full border rounded p-2 bg-white dark:bg-gray-700 dark:text-gray-100"
                                                        value={data.email}
                                                        onChange={(e) => setData("email", e.target.value)}
                                                    />
                                                    {errors.email && (
                                                        <div className="text-red-500 text-sm">{errors.email}</div>
                                                    )}
                                                </div>

                                                {/* Password */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="w-full border rounded p-2 bg-white dark:bg-gray-700 dark:text-gray-100"
                                                        value={data.password}
                                                        onChange={(e) => setData("password", e.target.value)}
                                                    />
                                                    {errors.password && (
                                                        <div className="text-red-500 text-sm">{errors.password}</div>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        className="bg-gray-300 dark:bg-gray-600 dark:text-gray-100 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                                        disabled={processing}
                                                    >
                                                        Create User
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                {/* Add User Button */}
                                <div className="flex justify-between items-center mb-6">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Add New User
                                    </button>
                                </div>
                            </div>

                            {/* Users Table */}
                            <div className="bg-white dark:bg-gray-900 shadow rounded-lg">
                                <h2 className="text-xl font-semibold p-4 border-b border-gray-200 dark:border-gray-700">
                                    Users List
                                </h2>
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                        {users.map((u) => (
                                            <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="p-3">{u.id}</td>
                                                <td className="p-3">{u.name}</td>
                                                <td className="p-3">{u.email}</td>
                                                <td className="p-3 space-x-2">
                                                    <button
                                                        onClick={() => handleUpdateUser(u.id)}
                                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(u.id)}
                                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    );
}
