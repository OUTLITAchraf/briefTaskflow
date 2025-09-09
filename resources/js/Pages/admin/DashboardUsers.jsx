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
            <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Users Management</h2>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Add New User
                        </button>
                    </div>

                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                                <h2 className="text-xl font-bold mb-4">Create New User</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            className="w-full border rounded p-2"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                        />
                                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            className="w-full border rounded p-2"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                        />
                                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">Password</label>
                                        <input
                                            type="password"
                                            className="w-full border rounded p-2"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                        />
                                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="bg-gray-300 px-4 py-2 rounded"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            disabled={processing}
                                        >
                                            Create User
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Users Table */}
                    <div className="bg-white shadow rounded-lg">
                        <h2 className="text-xl font-semibold p-4 border-b">Users List</h2>
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left">ID</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50">
                                        <td className="p-3 border-t">{u.id}</td>
                                        <td className="p-3 border-t">{u.name}</td>
                                        <td className="p-3 border-t">{u.email}</td>
                                        <td className="p-3 border-t space-x-2">
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
        </AuthenticatedLayout >
    );
}
