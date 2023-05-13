<?php

use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/* Route::get('/login', [MainController::class, 'showLogin'])->name('login.show');
Route::get('/main', [MainController::class, 'showMain'])->name('main.show');
Route::get('/registration', [MainController::class, 'showRegistration'])->name('registration.show'); */

Route::view("/{any?}", "Main")->where("any", ".*");

