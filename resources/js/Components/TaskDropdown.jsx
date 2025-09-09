import React from 'react';

export default function TaskDropdown({ task, onEdit, onDelete, isOpen, onToggle }) {
    const handleToggle = (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        onToggle(task.id);
    };

    return (
        <div className="relative" onClick={e => e.stopPropagation()}>
            <button
                onClick={handleToggle}
                className="text-gray-500 hover:text-gray-700"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu">
                        <button
                            onClick={() => {
                                onEdit(task);
                                onToggle(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => {
                                onDelete(task);
                                onToggle(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}