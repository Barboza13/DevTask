<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource("projects", ProjectController::class);
Route::post("projects/add-member/{project}", [ProjectController::class, "addMember"]);
Route::get("projects/project-members/{project}", [ProjectController::class, "getMembers"]);

Route::get("members/members-names", [MemberController::class, "getNames"]);
Route::apiResource("members", MemberController::class);

Route::apiResource("tasks", TaskController::class);