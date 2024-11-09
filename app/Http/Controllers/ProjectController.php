<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Exception;
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
        $projects = Project::all();
        return response()->json(["projects" => $projects], 200);
    }

    /**
     * Save project.
     * @param \App\Http\Requests\ProjectRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProjectRequest $request): JsonResponse
    {
        try {
            $project = Project::create($request->validated());
            return response()->json([
                "project" => $project,
                "message" => "Proyecto creado exitosamente.",
                "status" => true
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrio un error",
                "status" => false,
                "error" => $e->getMessage(),
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
            $project = Project::find($id);
            
            return response()->json([
                "project" => $project,
                "status" => true
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "status" => false
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Delete project.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $project = Project::find($id);
            $project->delete();

            return response()->json([
                "message" => "Registro eliminado exitosamente.",
            ], 200);
        } catch(Exception $e) {
            Log::error("Error: " . $e->getMessage());
            return response()->json([
                "message" => "Error al eliminar el registro.",
            ], 422);
        }
    }
}
