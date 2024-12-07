<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource("projects", ProjectController::class);

Route::apiResource("members", MemberController::class);
Route::get("members-names", [MemberController::class, "getNames"]);

Route::apiResource("tasks", TaskController::class);