<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'firstName'       => 'required|string|max:255',
            'lastName'        => 'required|string|max:255',
            'email'           => 'required|email|unique:users',
            'password'        => 'required|string|min:8',
        ]);

        $user = User::create([
            'first_name'   => $data['firstName'],
            'last_name'    => $data['lastName'],
            'email'        => $data['email'],
            'password'     => Hash::make($data['password']),
            'role'         => 'user',
        ]);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        // Load enrollments and prepare myCourses
        $user->load(['enrollments.course.category']);
        $user->myCourses = $user->enrollments->map(function ($enrollment) {
            $course = $enrollment->course;
            return [
                'id' => $course->id,
                'slug' => $course->slug,
                'title' => $course->title,
                'category' => $course->category?->name,
                'price' => $course->price,
                'priceLabel' => '$' . number_format($course->price, 2),
                'image' => $course->thumbnail,
                'description' => $course->description,
                'teacher' => $course->teacher,
                'hours' => $course->hours,
                'students' => $course->students,
                'rating' => $course->rating,
            ];
        })->values();

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request)
    {
        $user = $request->user()->load(['enrollments.course.category']);
        $user->myCourses = $user->enrollments->map(function ($enrollment) {
            $course = $enrollment->course;
            return [
                'id' => $course->id,
                'slug' => $course->slug,
                'title' => $course->title,
                'category' => $course->category?->name,
                'price' => $course->price,
                'priceLabel' => '$' . number_format($course->price, 2),
                'image' => $course->thumbnail,
                'description' => $course->description,
                'teacher' => $course->teacher,
                'hours' => $course->hours,
                'students' => $course->students,
                'rating' => $course->rating,
            ];
        })->values();

        return response()->json(['user' => $user]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'avatar' => 'nullable|string',
        ]);

        $user->update($data);

        // Reload with enrollments and myCourses
        $user->load(['enrollments.course.category']);
        $user->myCourses = $user->enrollments->map(function ($enrollment) {
            $course = $enrollment->course;
            return [
                'id' => $course->id,
                'slug' => $course->slug,
                'title' => $course->title,
                'category' => $course->category?->name,
                'price' => $course->price,
                'priceLabel' => '$' . number_format($course->price, 2),
                'image' => $course->thumbnail,
                'description' => $course->description,
                'teacher' => $course->teacher,
                'hours' => $course->hours,
                'students' => $course->students,
                'rating' => $course->rating,
            ];
        })->values();

        return response()->json(['user' => $user]);
    }
}
