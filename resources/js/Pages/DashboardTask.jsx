import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TaskDropdown from '@/Components/TaskDropdown';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, Clock, Loader } from 'lucide-react';

function DashboardTask({ auth, createdTasks, assignedTasks, users, tasks }) {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        title: '',
        description: '',
        assigned_user_id: '',
    });

    const role = auth.user.roles.map(role => role.name);
    const isAdmin = role.includes('admin');
    const isUser = role.includes('user');

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
                toast.success('Task created successfully!');
            },
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        patch(route('tasks.update', editingTask.id), {
            onSuccess: () => {
                setShowEditModal(false);
                setEditingTask(null);
                reset();
                toast.success('Task updated successfully!');
            },
        });
    };

    const updateStatus = (taskId, newStatus) => {
        router.patch(route('tasks.update-status', taskId), {
            status: newStatus,
            onSuccess: () => {
                toast.success('Status updated successfully!');
            },
        });
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setData({
            title: task.title,
            description: task.description,
            assigned_user_id: task.assigned_user_id || '',
        });
        setShowEditModal(true);
    };

    const handleDelete = (task) => {
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
                router.delete(route('tasks.destroy', task.id), {
                    onSuccess: () => {
                        toast.success('Task deleted successfully!');
                        // Force a page refresh to update the task list
                        router.reload();
                    },
                    onError: () => {
                        toast.error('Failed to delete the task');
                    }
                });
            }
        });
    };

    const StatusDropdown = ({ task }) => (
        <select
            value={task.status}
            onChange={(e) => updateStatus(task.id, e.target.value)}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>
    );

    // Add this function to handle dropdown toggling
    const toggleDropdown = (taskId) => {
        setOpenDropdownId(openDropdownId === taskId ? null : taskId);
    };

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = () => {
            setOpenDropdownId(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Add a new useEffect to reset form when modal closes
    useEffect(() => {
        if (!showModal && !showEditModal) {
            reset();
        }
    }, [showModal, showEditModal]);

    return (
        <AuthenticatedLayout 
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight dark:text-white">Task Dashboard</h2>}
        >
            <Toaster position="top-center" />
            <div className="py-8 px-5 lg:px-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Head title="Task Dashboard" />
                    <div className='flex justify-between items-center mb-8'>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Tasks Progress</h1>

                        {/* Create Task Modal */}
                        {showModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4 dark:text-gray-200">Create New Task</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2 dark:text-white">Title</label>
                                            <input
                                                type="text"
                                                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded p-2"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                placeholder='Task Title'
                                            />
                                            {errors.title && <div className="text-red-500">{errors.title}</div>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 dark:text-white mb-2">Description</label>
                                            <textarea
                                                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded p-2"
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                                placeholder='Task Description'
                                            />
                                            {errors.description && <div className="text-red-500">{errors.description}</div>}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 dark:text-white mb-2">Assign To</label>
                                            <select
                                                className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded p-2"
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
                            onClick={() => {
                                reset(); // Reset form data first
                                setShowModal(true);
                            }}
                        >
                            Create Task
                        </button>
                    </div>

                    {isAdmin && (
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold mb-4 dark:text-white">All Tasks</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tasks.map((task) => (
                                    <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-purple-500">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{task.title}</h3>
                                            {!showModal && (
                                                <TaskDropdown
                                                    task={task}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    isOpen={openDropdownId === task.id}
                                                    onToggle={toggleDropdown}
                                                />
                                            )}
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Created By:{" "}
                                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                                    {task.creator?.name}
                                                </span>
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Assigned To:{" "}
                                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                                    {task.assigned_user?.name || "Unassigned"}
                                                </span>
                                            </p>
                                            <div className="mt-3">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Status
                                                </label>
                                                <StatusDropdown task={task} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {isUser && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                {/* Pending */}
                                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <Clock className="h-10 w-10 text-blue-500 dark:text-blue-400" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-300">Pending Tasks</p>
                                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {[...createdTasks, ...assignedTasks].filter((t) => t.status === "pending").length}
                                    </h2>
                                </div>

                                {/* In Progress */}
                                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <Loader className="h-10 w-10 text-yellow-500 dark:text-yellow-400 animate-spin-slow" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-300">In Progress Tasks</p>
                                    <h2 className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">
                                        {[...createdTasks, ...assignedTasks].filter((t) => t.status === "in_progress").length}
                                    </h2>
                                </div>

                                {/* Completed */}
                                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 text-center">
                                    <div className="flex items-center justify-center mb-2">
                                        <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-300">Completed Tasks</p>
                                    <h2 className="text-2xl font-bold text-green-500 dark:text-green-400">
                                        {[...createdTasks, ...assignedTasks].filter((t) => t.status === "completed").length}
                                    </h2>
                                </div>
                            </div>

                            <section className="mb-10">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tasks You Created</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {createdTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-red-500"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{task.title}</h3>
                                                {!showModal && (
                                                    <TaskDropdown
                                                        task={task}
                                                        onEdit={handleEdit}
                                                        onDelete={handleDelete}
                                                        isOpen={openDropdownId === task.id}
                                                        onToggle={toggleDropdown}
                                                    />
                                                )}
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Assigned To:{" "}
                                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                                    {task.assigned_user?.name || "Unassigned"}
                                                </span>
                                            </p>
                                            <div className="mt-3">
                                                <StatusDropdown task={task} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tasks Assigned to You</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {assignedTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-purple-500"
                                        >
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{task.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Created By:{" "}
                                                <span className="font-medium text-gray-700 dark:text-gray-200">{task.creator?.name}</span>
                                            </p>
                                            <div className="mt-3">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                                                <StatusDropdown task={task} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </>
                    )}


                    {/* Edit Task Modal */}
                    {showEditModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                                <form onSubmit={handleUpdate}>
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
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                            disabled={processing}
                                        >
                                            Update Task
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout >
    )
}

export default DashboardTask
