<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $courses = $request->user()->enrollments()->with('course.category')->get()->map(function ($enrollment) {
            $course = $enrollment->course;
            return [
                'id' => $course->id,
                'slug' => $course->slug,
                'title' => $course->title,
                'category' => $course->category?->name,
                'price' => $course->price,
                'image' => $course->thumbnail,
                'description' => $course->description,
            ];
        });

        return response()->json(['data' => $courses]);
    }

    public function lessons(Request $request, Course $course)
    {
        $enrolled = $request->user()->enrollments()->where('course_id', $course->id)->exists();
        if (!$enrolled) {
            return response()->json(['message' => 'Not enrolled in this course'], 403);
        }

        return response()->json(['data' => $course->lessons()->get(['id', 'title', 'video_url', 'duration', 'order', 'is_free'])]);
    }
}
