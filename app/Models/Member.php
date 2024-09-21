<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "id",
        "task_id",
        "name",
        "last_name",
        "email",
    ];

    protected $hidden = [
        "created_at",
        "updated_at",
        "deleted_at",
    ];
}
