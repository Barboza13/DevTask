<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    /**
     * Get tasks.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $tasks = Task::with(["member", "project"])->orderByDesc("id")->get();
        return response()->json(["tasks" => $tasks], 200);
    }

    /**
     * Store task.
     * @param \App\Http\Requests\TaskRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TaskRequest $request): JsonResponse
    {
        $current_date = Carbon::now()->toDateString(); // Get current date in 'Y-m-d' format.
        $validated = $request->validated();

        if ($validated['deadline'] < $current_date) {
            return response()->json([
                "message" => "¡La fecha de entrega no puede ser mayor a la fecha actual!",
            ], 422);
        }

        try {
            $task = Task::create($validated);

            return response()->json([
                "task" => $task,
                "message" => "¡Tarea guardada exitosamente!"
            ], 201);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al guardar la tarea!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Show task.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);

            return response()->json([
                "task" => $task,
                "message" => ""
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Tarea no encontrada!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al obtener la tarea!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Update task.
     * @param \App\Http\Requests\TaskRequest $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TaskRequest $request, string $id): JsonResponse
    {
        $current_date = Carbon::now()->toDateString(); // Get current date in 'Y-m-d' format.
        $validated = $request->validated();

        if ($validated['deadline'] < $current_date) {
            return response()->json([
                "message" => "¡La fecha de entrega no puede ser mayor a la fecha actual!",
            ], 422);
        }

        try {
            $task = Task::findOrFail($id);
            $task->update($validated);

            return response()->json([
                "task" => $task,
                "message" => "¡Tarea actualizada exitosamente!"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Tarea no encontrada!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al actualizar la tarea!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Delete task.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();

            return response()->json([
                "message" => "¡Tarea eliminada exitosamente!",
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Tarea no encontrada!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al eliminar la tarea!",
                "error" => $e->getMessage()
            ], 422);
        }
    }
}
