<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use App\Models\Category;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'users' => User::count(),
            'courses' => Course::count(),
            'categories' => Category::count(),
            'orders' => Order::count(),
            'revenue' => Order::where('status', 'paid')->sum('total'),
        ]);
    }

    public function sales()
    {
        $orders = Order::where('status', 'paid')
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get(['id', 'user_id', 'total', 'payment_ref', 'created_at']);

        return response()->json([
            'revenue' => Order::where('status', 'paid')->sum('total'),
            'orders' => $orders,
        ]);
    }
}
