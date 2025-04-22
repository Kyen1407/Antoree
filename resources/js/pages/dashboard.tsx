import { useEffect, useState } from 'react';
import axios from 'axios';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user && typeof auth.user.email === 'string' && auth.user.email.endsWith('@admin.com');

    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    const [newName, setNewName] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');

    useEffect(() => {
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error loading user list:', error);
            });
    }, []);

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        axios.delete(`/api/users/${id}`)
            .then(() => {
                setUsers(prev => prev.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const handleUpdate = (id: number) => {
        axios.put(`/api/users/${id}`, { name: newName, email: newEmail }, { withCredentials: true })
            .then(response => {
                setUsers(prev =>
                    prev.map(user => user.id === id ? response.data.user : user)
                );
                setEditingUserId(null);      // Ẩn form sau khi cập nhật
                setNewName('');
                setNewEmail('');
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className='text-center' style={{ fontSize: "20px" }}>USER LIST</h1>
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="border border-gray-300 dark:border-gray-600 rounded-xl p-4 shadow-md bg-white dark:bg-gray-900"
                        >
                            <h2 className="text-lg font-semibold">{user.name}</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>

                            {isAdmin && (
                                <div className="mt-2 flex gap-2">
                                    <button
                                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => {
                                            setEditingUserId(user.id);
                                            setNewName(user.name);
                                            setNewEmail(user.email);
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Form to update user */}
                {editingUserId && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold mb-4">Update User</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                            <div className="flex gap-4">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => handleUpdate(editingUserId!)}
                                >
                                    Save
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    onClick={() => setEditingUserId(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

