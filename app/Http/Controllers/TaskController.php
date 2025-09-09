<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'assigned_user_id' => 'nullable|exists:users,id',
        ]);

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => 'pending',
            'creator_id' => auth()->id(),
            'assigned_user_id' => $validated['assigned_user_id'],
        ]);

        return redirect()->back();
    }

    public function index()
    {
        $createdTasks = Task::with('assignedUser')
            ->where('creator_id', auth()->id())
            ->get();

        $assignedTasks = Task::with('creator')
            ->where('assigned_user_id', auth()->id())
            ->where('creator_id', '!=', auth()->id())  // Add this line to exclude self-assigned tasks
            ->get();

        $users = User::all();

        return Inertia::render('DashboardTask', [
            'createdTasks' => $createdTasks,
            'assignedTasks' => $assignedTasks,
            'users' => $users,
        ]);
    }

    public function updateStatus(Request $request, Task $task)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,completed'
        ]);

        $task->update([
            'status' => $validated['status']
        ]);

        return redirect()->back();
    }
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'assigned_user_id' => 'nullable|exists:users,id',
        ]);

        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'assigned_user_id' => $validated['assigned_user_id'],
        ]);

        return redirect()->back();
    }
    public function destroy(Task $task)
    {
        if ($task->creator_id === auth()->id()) {
            $task->delete();
        }
        
        return redirect()->back();
    }
}