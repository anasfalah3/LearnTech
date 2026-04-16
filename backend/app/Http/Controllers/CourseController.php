<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::with(['category', 'instructor'])->where('is_published', true);

        if ($category = $request->query('category')) {
            $query->whereHas('category', function ($query) use ($category) {
                $query->where('slug', $category)
                    ->orWhere('name', 'like', "%{$category}%");
            });
        }

        $courses = $query->get()->map(function (Course $course) {
            return $this->formatCourse($course);
        });

        return response()->json(['data' => $courses]);
    }

    public function show(string $slug)
    {
        $course = Course::with(['category', 'instructor', 'lessons'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json(['data' => $this->formatCourse($course, true)]);
    }

    protected function formatCourse(Course $course, bool $includeLessons = false): array
    {
        $hours = $course->duration ? round($course->duration / 60, 1) : 0;

        $payload = [
            'id' => $course->id,
            'slug' => $course->slug,
            'title' => $course->title,
            'category' => $course->category?->name,
            'category_slug' => $course->category?->slug,
            'teacher' => $course->instructor?->name,
            'price' => $course->price,
            'priceLabel' => '$' . number_format((float) $course->price, 2),
            'rating' => 4.8,
            'students' => $course->enrollments()->count(),
            'hours' => (string) $hours,
            'image' => $course->thumbnail,
            'description' => $course->description,
            'details' => $course->description,
            'level' => $course->level,
            'duration' => $course->duration,
            'is_published' => $course->is_published,
            'created_at' => $course->created_at,
            'updated_at' => $course->updated_at,
        ];

        if ($includeLessons) {
            $payload['lessons'] = $course->lessons->map(function ($lesson) {
                return [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                    'video_url' => $lesson->video_url,
                    'duration' => $lesson->duration,
                    'order' => $lesson->order,
                    'is_free' => $lesson->is_free,
                ];
            });
        }

        return $payload;
    }
}
