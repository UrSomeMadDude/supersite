<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{
    public function showLogin()
    {
        return view('Login');
    }

    public function logIn(LoginRequest $request)
    {
        if (Auth::attempt($request->only('email', 'password'), $request->filled('remember'))) {
            return redirect()->intended('/main');
        }
        return redirect()->back()->withInput();
    }

    public function logOut()
    {
        Auth::logout();
        return redirect('/main');
    }

    public function showRegistration()
    {
        return view('Registration');
    }

    public function registerUser(RegistrationRequest $request)
    {
        if (User::where('email', $request->email)->exists()) {
            return redirect()->back();
        }

        event(new Registered($user = $this->create($request->all())));

        Auth::login($user);

        return redirect()->intended('/main');
    }

    public function showMain()
    {
        return view('Main');
    }
}
