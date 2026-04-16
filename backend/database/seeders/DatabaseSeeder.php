<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin user
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@eduflow.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        // Test user
        User::create([
            'name'     => 'Test User',
            'email'    => 'user@eduflow.com',
            'password' => Hash::make('password'),
            'role'     => 'user',
        ]);

        // Sample category
        $cat = \App\Models\Category::create([
            'name' => 'Web Development',
            'slug' => 'web-development',
        ]);

        // Sample course
        \App\Models\Course::create([
            'category_id'  => $cat->id,
            'user_id'      => 1,
            'title'        => 'Complete React Course',
            'slug'         => 'complete-react-course',
            'description'  => 'Learn React from scratch.',
            'price'        => 299.00,
            'level'        => 'beginner',
            'is_published' => true,
        ]);
    }
}
