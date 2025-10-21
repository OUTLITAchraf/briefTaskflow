import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { PencilIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Users2Icon } from "lucide-react";

export default function DashboardUsers({ auth, users }) {
    const [editingUser, setEditingUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '', // Optional for update
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
                toast.success('User created successfully');
            },
            onError: () => {
                toast.error('Failed to create user');
            }
        });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setData({
            name: user.name,
            email: user.email,
            password: '',
        });
        setShowEditModal(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route('users.update', editingUser.id), {
            onSuccess: () => {
                setShowEditModal(false);
                setEditingUser(null);
                reset();
                toast.success('User updated successfully');
            },
            onError: () => {
                toast.error('Failed to update user');
            }
        });
    };

    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            background: '#f3f4f6', 
            color: '#1f2937',      
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#dc2626',
            customClass: {
                popup: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg',
                title: 'text-lg font-bold',
                content: 'text-gray-700 dark:text-gray-300',
                confirmButton: 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-400 text-white',
                cancelButton: 'bg-red-600 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-400 text-white'
            }
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

    useEffect(() => {
        if (!showEditModal && !showCreateModal) {
            reset();
        }
    }, [showEditModal, showCreateModal]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <Users2Icon className="w-6 h-6 text-gray-800 dark:text-white" />
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                        Manage Users
                    </h2>
                </div>
            }
        >
            <Head title="Manage Users" />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <UsersIcon className="w-6 h-6 text-gray-800 dark:text-white" />
                                    <h2 className="font-semibold text-2xl text-gray-800 dark:text-white leading-tight">
                                        Users List
                                    </h2>
                                </div>
                                {/* Modal */}
                                {showCreateModal && (
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
                                                        placeholder="Enter name"
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
                                                        placeholder="Enter email"
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
                                                        placeholder="Enter password"
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
                                                        onClick={() => setShowCreateModal(false)}
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
                                {/* Edit User Modal */}
                                {showEditModal && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
                                            <h2 className="text-xl font-bold mb-4 dark:text-gray-200">
                                                Edit User
                                            </h2>
                                            <form onSubmit={handleUpdate}>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded p-2"
                                                        value={data.name}
                                                        onChange={e => setData('name', e.target.value)}
                                                    />
                                                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded p-2"
                                                        value={data.email}
                                                        onChange={e => setData('email', e.target.value)}
                                                    />
                                                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                                        Password (leave empty to keep current)
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded p-2"
                                                        value={data.password}
                                                        onChange={e => setData('password', e.target.value)}
                                                    />
                                                    {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                                                </div>

                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded"
                                                        onClick={() => setShowEditModal(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                                        disabled={processing}
                                                    >
                                                        Update User
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                {/* Add User Button */}
                                <div className="flex justify-between items-center mb-6">
                                    <button
                                        onClick={() => {
                                            reset();
                                            setShowCreateModal(true);
                                        }}
                                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        <PlusIcon className="w-4 h-4 mr-2" />
                                        Add New User
                                    </button>
                                </div>
                            </div>

                            {/* Users Table */}
                            <div className="bg-white dark:bg-gray-900 shadow rounded-lg">
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
                                                <td className="p-3">
                                                    <span className="block truncate max-w-[7ch] sm:max-w-full">
                                                        {u.email}
                                                    </span>
                                                </td>
                                                <td className="p-3 space-x-2 flex flex-col gap-2 sm:gap-0 sm:flex-row">
                                                    <button
                                                        onClick={() => handleEdit(u)}
                                                        className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                    >
                                                        <PencilIcon className="w-4 h-4 mr-1" />
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(u.id)}
                                                        className="flex items-center px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                    >
                                                        <TrashIcon className="w-4 h-4 mr-1" />
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
