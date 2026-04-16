<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'user_id',
        'title',
        'slug',
        'description',
        'thumbnail',
        'price',
        'level',
        'duration',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function instructor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}
