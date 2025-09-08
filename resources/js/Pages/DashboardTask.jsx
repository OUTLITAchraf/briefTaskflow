import React, { useState } from 'react'
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function DashboardTask({ auth, createdTasks, assignedTasks, users }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        assigned_user_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-8 px-5 lg:px-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Head title="User Dashboard" />
                    <div className='flex justify-between items-center mb-8'>
                        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
                        {/* Create Task Modal */}
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Create New Task</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Title</label>
                                            <input
                                                type="text"
                                                className="w-full border rounded p-2"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                            />
                                            {errors.title && <div className="text-red-500">{errors.title}</div>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Description</label>
                                            <textarea
                                                className="w-full border rounded p-2"
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                            />
                                            {errors.description && <div className="text-red-500">{errors.description}</div>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Assign To</label>
                                            <select
                                                className="w-full border rounded p-2"
                                                value={data.assigned_user_id}
                                                onChange={e => setData('assigned_user_id', e.target.value)}
                                            >
                                                <option value="">Select User</option>
                                                {users.map(user => (
                                                    <option key={user.id} value={user.id}>{user.name}</option>
                                                ))}
                                            </select>
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
                                                className="bg-indigo-500 text-white px-4 py-2 rounded"
                                                disabled={processing}
                                            >
                                                Create Task
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <button
                            className='bg-indigo-500 p-3 text-white rounded-lg'
                            onClick={() => setShowModal(true)}
                        >
                            Create Task
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white shadow rounded-xl p-6 text-center">
                            <p className="text-gray-500">Created Tasks</p>
                            <h2 className="text-2xl font-bold text-blue-600">{createdTasks.length}</h2>
                        </div>
                        <div className="bg-white shadow rounded-xl p-6 text-center">
                            <p className="text-gray-500">Assigned to You</p>
                            <h2 className="text-2xl font-bold text-green-600">{assignedTasks.length}</h2>
                        </div>
                        <div className="bg-white shadow rounded-xl p-6 text-center">
                            <p className="text-gray-500">Completed</p>
                            <h2 className="text-2xl font-bold text-purple-600">
                                {[...createdTasks, ...assignedTasks].filter((t) => t.status === "completed").length}
                            </h2>
                        </div>
                    </div>

                    {/* Created Tasks */}
                    <section className="mb-10">
                        <h2 className="text-xl font-semibold mb-4">Tasks You Created</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {createdTasks.map((task) => (
                                <div key={task.id} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>
                                    <p className="text-gray-600 mb-3">{task.description}</p>
                                    <p className="text-sm text-gray-500">
                                        Assigned To:{" "}
                                        <span className="font-medium text-gray-700">
                                            {task.assigned_user?.name || "Unassigned"}
                                        </span>
                                    </p>
                                    <span
                                        className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${task.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : task.status === "in_progress"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Assigned Tasks */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Tasks Assigned to You</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {assignedTasks.map((task) => (
                                <div key={task.id} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>
                                    <p className="text-gray-600 mb-3">{task.description}</p>
                                    <p className="text-sm text-gray-500">
                                        Created By:{" "}
                                        <span className="font-medium text-gray-700">{task.creator?.name}</span>
                                    </p>
                                    <span
                                        className={`inline-block mt-3 px-3 py-1 text-xs rounded-full ${task.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : task.status === "in_progress"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default DashboardTask
