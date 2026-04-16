<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index(Course $course)
    {
        return response()->json(['data' => $course->lessons()->get()]);
    }

    public function store(Request $request, Course $course)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'video_url' => 'nullable|string',
            'duration' => 'nullable|integer|min:0',
            'order' => 'nullable|integer|min:0',
            'is_free' => 'boolean',
        ]);

        $lesson = $course->lessons()->create($data);

        return response()->json(['data' => $lesson], 201);
    }

    public function show(Course $course, Lesson $lesson)
    {
        if ($lesson->course_id !== $course->id) {
            abort(404);
        }

        return response()->json(['data' => $lesson]);
    }

    public function update(Request $request, Course $course, Lesson $lesson)
    {
        if ($lesson->course_id !== $course->id) {
            abort(404);
        }

        $data = $request->validate([
            'title' => 'sometimes|string|max:255',
            'video_url' => 'nullable|string',
            'duration' => 'nullable|integer|min:0',
            'order' => 'nullable|integer|min:0',
            'is_free' => 'boolean',
        ]);

        $lesson->update($data);

        return response()->json(['data' => $lesson]);
    }

    public function destroy(Course $course, Lesson $lesson)
    {
        if ($lesson->course_id !== $course->id) {
            abort(404);
        }

        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted successfully']);
    }
}
