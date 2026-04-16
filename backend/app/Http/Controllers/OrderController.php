<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->with('items.course')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $total = $cart->items->sum(function ($item) {
            return $item->course->price;
        });

        $order = Order::create([
            'user_id' => $user->id,
            'total' => $total,
            'status' => 'paid',
            'payment_ref' => Str::upper(Str::random(12)),
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'course_id' => $item->course->id,
                'price' => $item->course->price,
            ]);

            Enrollment::firstOrCreate([
                'user_id' => $user->id,
                'course_id' => $item->course->id,
            ], [
                'order_id' => $order->id,
            ]);
        }

        $cart->items()->delete();

        return response()->json(['data' => $order->load('items.course'), 'message' => 'Order created successfully']);
    }

    public function show(Request $request, int $id)
    {
        $order = Order::with('items.course')->where('user_id', $request->user()->id)->findOrFail($id);

        return response()->json(['data' => $order]);
    }
}
