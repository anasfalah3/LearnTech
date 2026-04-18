<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\Lesson;
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
        $admin = User::firstOrCreate([
            'email' => 'admin@eduflow.com',
        ], [
            'name'     => 'Admin',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);

        $user = User::firstOrCreate([
            'email' => 'user@eduflow.com',
        ], [
            'name'     => 'Test User',
            'password' => Hash::make('password'),
            'role'     => 'user',
        ]);

        $webCategory = Category::firstOrCreate([
            'slug' => 'web-development',
        ], [
            'name' => 'Web Development',
            'description' => 'Build responsive websites with modern tools.',
        ]);

        $dataCategory = Category::firstOrCreate([
            'slug' => 'data-science',
        ], [
            'name' => 'Data Science',
            'description' => 'Explore analytics, machine learning, and data workflows.',
        ]);

        $designCategory = Category::firstOrCreate([
            'slug' => 'ui-ux-design',
        ], [
            'name' => 'UI/UX Design',
            'description' => 'Design beautiful interfaces and experiences.',
        ]);

        $reactCourse = Course::firstOrCreate([
            'slug' => 'complete-react-course',
        ], [
            'category_id'  => $webCategory->id,
            'user_id'      => $admin->id,
            'title'        => 'Complete React Course',
            'description'  => 'Learn React from scratch with hands-on projects.',
            'thumbnail'    => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
            'price'        => 249.00,
            'level'        => 'Beginner',
            'duration'     => 420,
            'is_published' => true,
        ]);

        $pythonCourse = Course::firstOrCreate([
            'slug' => 'python-for-data-science',
        ], [
            'category_id'  => $dataCategory->id,
            'user_id'      => $admin->id,
            'title'        => 'Python for Data Science',
            'description'  => 'Analyze data, build models, and visualize results using Python.',
            'thumbnail'    => 'https://images.unsplash.com/photo-1517430816045-df4b7de01f7c?auto=format&fit=crop&w=1200&q=80',
            'price'        => 199.00,
            'level'        => 'Intermediate',
            'duration'     => 360,
            'is_published' => true,
        ]);

        $uxCourse = Course::firstOrCreate([
            'slug' => 'ui-ux-bootcamp',
        ], [
            'category_id'  => $designCategory->id,
            'user_id'      => $admin->id,
            'title'        => 'UI/UX Bootcamp',
            'description'  => 'Master user-centered design, prototyping, and usability testing.',
            'thumbnail'    => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
            'price'        => 179.00,
            'level'        => 'Beginner',
            'duration'     => 300,
            'is_published' => true,
        ]);

        Lesson::updateOrCreate([
            'course_id' => $reactCourse->id,
            'order' => 1,
        ], [
            'title' => 'React Fundamentals',
            'video_url' => 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
            'duration' => 45,
            'is_free' => true,
        ]);
        Lesson::updateOrCreate([
            'course_id' => $reactCourse->id,
            'order' => 2,
        ], [
            'title' => 'State & Props',
            'video_url' => 'https://www.youtube.com/watch?v=IYvD9oBCuJI',
            'duration' => 60,
            'is_free' => false,
        ]);
        Lesson::updateOrCreate([
            'course_id' => $reactCourse->id,
            'order' => 3,
        ], [
            'title' => 'React Hooks',
            'video_url' => 'https://www.youtube.com/watch?v=dpw9EHDh2bM',
            'duration' => 75,
            'is_free' => false,
        ]);

        Lesson::updateOrCreate([
            'course_id' => $pythonCourse->id,
            'order' => 1,
        ], [
            'title' => 'Python Basics for Data',
            'video_url' => 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
            'duration' => 50,
            'is_free' => true,
        ]);
        Lesson::updateOrCreate([
            'course_id' => $pythonCourse->id,
            'order' => 2,
        ], [
            'title' => 'Pandas and Data Cleaning',
            'video_url' => 'https://www.youtube.com/watch?v=vmEHCJofslg',
            'duration' => 65,
            'is_free' => false,
        ]);
        Lesson::updateOrCreate([
            'course_id' => $pythonCourse->id,
            'order' => 3,
        ], [
            'title' => 'Data Visualization',
            'video_url' => 'https://www.youtube.com/watch?v=F5_m4Q1yDBo',
            'duration' => 55,
            'is_free' => false,
        ]);

        Lesson::updateOrCreate([
            'course_id' => $uxCourse->id,
            'order' => 1,
        ], [
            'title' => 'Design Thinking',
            'video_url' => 'https://www.youtube.com/watch?v=U7K0rD-fBmg',
            'duration' => 40,
            'is_free' => true,
        ]);
        Lesson::updateOrCreate([
            'course_id' => $uxCourse->id,
            'order' => 2,
        ], [
            'title' => 'Prototyping and Wireframes',
            'video_url' => 'https://www.youtube.com/watch?v=VFOAe-1Y8w4',
            'duration' => 60,
            'is_free' => false,
        ]);
        Lesson::updateOrCreate([
            'course_id' => $uxCourse->id,
            'order' => 3,
        ], [
            'title' => 'Usability Testing',
            'video_url' => 'https://www.youtube.com/watch?v=kZpNdBEEdIM',
            'duration' => 55,
            'is_free' => false,
        ]);
    }
}
