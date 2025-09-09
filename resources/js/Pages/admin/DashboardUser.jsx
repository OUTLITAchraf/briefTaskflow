import React from 'react'

function DashboardUser() {
    const users = [
        { id: 1, name: 'Achraf', email: 'achraf@example.com' },
        { id: 2, name: 'Yassine', email: 'yassine@example.com' },
        { id: 3, name: 'Salma', email: 'salma@example.com' },
    ];
    return (
        <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 p-2">{user.id}</td>
                                <td className="border border-gray-300 p-2">{user.name}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-2">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardUser
