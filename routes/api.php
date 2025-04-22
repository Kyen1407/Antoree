<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Api\UserController;

Route::get('/ping', function () {
    return response()->json(['pong' => true]);
});

Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/users', [UserController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());
});

Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);