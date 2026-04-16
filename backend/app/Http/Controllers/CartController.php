<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Course;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->user()->cart()->with('items.course.category')->first();

        $items = $cart?->items->map(function (CartItem $item) {
            return [
                'id' => $item->course->id,
                'title' => $item->course->title,
                'slug' => $item->course->slug,
                'price' => $item->course->price,
                'priceLabel' => '$' . number_format((float) $item->course->price, 2),
                'teacher' => $item->course->instructor?->name,
                'image' => $item->course->thumbnail,
                'hours' => $item->course->duration ? round($item->course->duration / 60, 1) : 0,
                'category' => $item->course->category?->name,
            ];
        })->toArray() ?? [];

        return response()->json(['data' => [
            'items' => $items,
            'total' => array_sum(array_column($items, 'price')),
        ]]);
    }

    public function add(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        $course = Course::findOrFail($data['course_id']);
        $cart = $request->user()->cart()->firstOrCreate([]);

        $exists = $cart->items()->where('course_id', $course->id)->exists();
        if ($exists) {
            return response()->json(['message' => 'Course already in cart'], 409);
        }

        $cart->items()->create(['course_id' => $course->id]);

        return response()->json(['message' => 'Course added to cart']);
    }

    public function remove(Request $request, int $id)
    {
        $cart = $request->user()->cart;
        if (!$cart) {
            return response()->json(['message' => 'Cart is empty'], 404);
        }

        $deleted = $cart->items()->where('course_id', $id)->delete();
        if (!$deleted) {
            return response()->json(['message' => 'Course not found in cart'], 404);
        }

        return response()->json(['message' => 'Course removed from cart']);
    }
}
