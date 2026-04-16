<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Course::with('category')->get()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:courses',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'level' => 'required|in:beginner,intermediate,advanced',
            'duration' => 'nullable|integer|min:0',
            'is_published' => 'boolean',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        if (empty($data['user_id'])) {
            $data['user_id'] = $request->user()->id;
        }

        $course = Course::create($data);

        return response()->json(['data' => $course], 201);
    }

    public function show(Course $course)
    {
        return response()->json(['data' => $course->load('category')]);
    }

    public function update(Request $request, Course $course)
    {
        $data = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'title' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:courses,slug,' . $course->id,
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'level' => 'sometimes|in:beginner,intermediate,advanced',
            'duration' => 'nullable|integer|min:0',
            'is_published' => 'boolean',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $course->update($data);

        return response()->json(['data' => $course]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json(['message' => 'Course deleted successfully']);
    }
}
