import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';

export default function DashboardUsers({ auth, users }) {
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const handleCreateUser = (e) => {
    e.preventDefault();
    // Add user creation logic here
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

      <div className="py-8 px-5 lg:px-0 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        {/* Create User Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            {showForm ? "Cancel" : " Create User"}
          </button>
        </div>

        {/* Create User Form */}
        {showForm && (
          <form
            onSubmit={handleCreateUser}
            className="bg-white shadow rounded-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">New User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="mt-1 w-full border rounded px-3 py-2"
                placeholder="Enter email"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
            >
              Save User
            </button>
          </form>
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
    </AuthenticatedLayout>
  );
}
