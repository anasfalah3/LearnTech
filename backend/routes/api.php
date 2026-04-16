<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DashboardController;

// ── Public ──────────────────────────────────────────────────
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

Route::get('/categories',        [CategoryController::class, 'index']);
Route::get('/courses',           [CourseController::class, 'index']);
Route::get('/courses/{slug}',    [CourseController::class, 'show']);

// ── Authenticated ────────────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    Route::get('/cart',              [CartController::class, 'index']);
    Route::post('/cart/add',         [CartController::class, 'add']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'remove']);

    Route::post('/orders',       [OrderController::class, 'store']);
    Route::get('/orders/{id}',   [OrderController::class, 'show']);

    Route::get('/enrollments',                          [EnrollmentController::class, 'index']);
    Route::get('/enrollments/{course}/lessons',         [EnrollmentController::class, 'lessons']);
});

// ── Admin ────────────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    Route::get('/dashboard',   [DashboardController::class, 'index']);
    Route::apiResource('users',       UserController::class);
    Route::apiResource('categories',  \App\Http\Controllers\Admin\CategoryController::class);
    Route::apiResource('courses',     \App\Http\Controllers\Admin\CourseController::class);
    Route::apiResource('courses.lessons', \App\Http\Controllers\Admin\LessonController::class);
    Route::get('sales',       [DashboardController::class, 'sales']);
});
