<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function logIn(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $file = storage_path('app/users.txt');
        $users = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($users as $user) {
            [$existingEmail, $existingPassword] = explode(':', $user);
            if ($email == $existingEmail && $password == $existingPassword) {
                return response()->json([
                    'success' => true,
                    'email' => $email
                ]);
            }
            return response()->json([
                'success' => false,
                'error' => 'Password or email is incorrect'
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Invalid email or password']);
    }

    public function registerUser(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        $file = storage_path('app/users.txt');

        $existingUsers = file_get_contents($file);
        if (strpos($existingUsers, $email . ':') !== false) {
            return response()->json([
                'success' => false,
                'error' => 'This user already registered'
            ]);
        }

        file_put_contents($file, $email . ':' . $password . PHP_EOL, FILE_APPEND);

        return response()->json([
            'success' => true,
            'email' => $email
        ]);
    }
}
