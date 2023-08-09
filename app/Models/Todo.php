<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = ['user_id', 'title', 'description', 'has_completed'];
    protected $attributes = [
        'has_completed' => true,
    ];
}

