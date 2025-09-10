<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('id', '!=', 1)->get(); // Exclude admin

        return Inertia::render('admin/DashboardUsers', [
            'auth' => [
                'user' => auth()->user(),
                'roles' => auth()->user()->roles->pluck('name')->toArray(),
            ],
            'users' => $users
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->id !== 1) { // Prevent deleting admin
            $user->delete();
            return redirect()->back()->with('success', 'User deleted successfully');
        }
        return redirect()->back()->with('error', 'Cannot delete admin user');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        $user->addRole('user');

        return redirect()->back();
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        if (!empty($validated['password'])) {
            $updateData['password'] = Hash::make($validated['password']);
        }

        $user->update($updateData);

        return redirect()->back()->with('success', 'User updated successfully');
    }
}
