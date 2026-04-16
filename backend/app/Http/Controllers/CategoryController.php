<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('courses')->get()->map(function (Category $category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'image' => $category->image,
                'courses_count' => $category->courses_count,
            ];
        });

        return response()->json(['data' => $categories]);
    }
}
