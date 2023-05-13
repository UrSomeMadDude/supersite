<?php

use App\Http\Controllers\ImagesController;
use App\Http\Controllers\LinksController;
use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [MainController::class, 'logIn']);
Route::post('/registration', [MainController::class, 'registerUser']);
Route::post('/links', [LinksController::class, 'save']);
Route::get('/links', [LinksController::class, 'links']);
Route::post('/image', [ImagesController::class, 'save']);
Route::get('/image', [ImagesController::class, 'get']);
