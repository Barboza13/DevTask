<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Get projects.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $projects = Project::with("members")->get();
        return response()->json(["projects" => $projects], 200);
    }

    /**
     * Get project names.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProjectNames(): JsonResponse
    {
        try {
            $projects = Project::select("id", "name")->get();

            return response()->json([
                "projects" => $projects,
                "message" => ""
            ], 200);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al obtener los nombres de los proyectos!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Get tasks by project id.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTasksByProjectId(string $id): JsonResponse
    {
        try {
            $project = Project::with("tasks")->findOrFail($id);
            $tasks = $project->tasks()->orderByDesc("id")->get()
                ->map(function ($task) {
                    return [
                        "id" => $task->id,
                        "member_id" => $task->member->id,
                        "project_id" => $task->project->id,
                        "title" => $task->title,
                        "description" => $task->description,
                        "deadline" => $task->deadline,
                        "status" => $task->status,
                        "member" => [
                            "id" => $task->member->id,
                            "name" => $task->member->name,
                            "last_name" => $task->member->last_name,
                            "email" => $task->member->email,
                        ],
                        "project" => [
                            "id" => $task->project->id,
                            "name" => $task->project->name,
                            "deadline" => $task->project->deadline,
                            "description" => $task->project->description,
                        ]
                    ];
                });

            return response()->json([
                "tasks" => $tasks,
                "message" => ""
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Proyecto no encontrado!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al obtener las tareas del proyecto!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Get members of project.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMembers(string $id): JsonResponse
    {
        try {
            $project = Project::findOrFail($id);
            $members = $project->members()->select("id", "name")->get();

            return response()->json([
                "members" => $members,
                "message" => ""
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Proyecto no encontrado!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al obtener los miembros del proyecto!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Add member to project.
     * @param string $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addMember(string $id, Request $request): JsonResponse
    {
        $validated = $request->validate([
            "member_id" => "required|string|exists:members,id"
        ]);

        try {
            $project = Project::findOrFail($id);
            $project->members()->syncWithoutDetaching($validated);

            return response()->json([
                "message" => "¡Miembro agregado exitosamente!"
            ], 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Proyecto no encontrado!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al agregar el miembro!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Save project.
     * @param \App\Http\Requests\ProjectRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProjectRequest $request): JsonResponse
    {
        $current_date = Carbon::now()->toDateString();
        $validated = $request->validated();

        if ($validated['deadline'] < $current_date) {
            return response()->json([
                "message" => "¡La fecha de entrega no puede ser una fecha pasada!",
            ], 422);
        }

        try {
            $project = Project::create($validated);

            return response()->json([
                "project" => $project,
                "message" => "¡Proyecto guardado exitosamente!",
            ], 201);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al guardar el proyecto!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Show project.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $project = Project::findOrFail($id);

            return response()->json([
                "project" => $project,
                "message" => ""
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Proyecto no encontrado!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al obtener el proyecto!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Update project.
     * @param \App\Http\Requests\ProjectRequest $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ProjectRequest $request, string $id): JsonResponse
    {
        $current_date = Carbon::now()->toDateString();
        $validated = $request->validated();

        if ($validated['deadline'] < $current_date) {
            return response()->json([
                "message" => "¡La fecha de entrega no puede ser una fecha pasada!",
            ], 422);
        }

        try {
            $project = Project::findOrFail($id);
            $project->update($validated);

            return response()->json([
                "project" => $project,
                "message" => "¡Proyecto actualizado exitosamente!"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Proyecto no encontrado!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al actualizar el proyecto!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Delete project.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $project = Project::findOrFail($id);
            $project->delete();

            return response()->json([
                "message" => "¡Proyecto eliminado exitosamente!",
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Proyecto no encontrado!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al eliminar el proyecto!",
                "error" => $e->getMessage()
            ], 422);
        }
    }
}
