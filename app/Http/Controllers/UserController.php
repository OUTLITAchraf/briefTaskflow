<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
