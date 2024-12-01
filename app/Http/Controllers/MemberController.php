<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberRequest;
use App\Models\Member;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    /**
     * Get members.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $members = Member::all();
        return response()->json(["members" => $members], 200);
    }

    /**
     * Get members names.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNames(): JsonResponse
    {
        $names = Member::select("id", "name")->get();
        return response()->json(["members" => $names], 200);
    }

    /**
     * Save member.
     * @param \App\Http\Requests\MemberRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(MemberRequest $request): JsonResponse
    {
        try {
            $member = Member::create($request->validated());

            return response()->json([
                "member" => $member,
                "message" => "¡Miembro guardado exitosamente!"
            ], 201);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al guardar el miembro!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Show member.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $member = Member::findOrFail($id);

            return response()->json([
                "member" => $member,
                "message" => ""
            ], 200);
        } catch(ModelNotFoundException $e) {
            return response()->json(["message" => "¡Miembro no encontrado!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al obtener el miembro!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Update member.
     * @param \App\Http\Requests\MemberRequest $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(MemberRequest $request, string $id): JsonResponse
    {
        try {
            $member = Member::findOrFail($id);
            $member->update($request->validated());

            return response()->json([
                "member" => $member,
                "message" => "¡Miembro actualizado exitosamente!"
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Miembro no encontrado!"], 404);
        } catch (Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al actualizar el miembro!",
                "error" => $e->getMessage()
            ], 422);
        }
    }

    /**
     * Delete member.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $member = Member::findOrFail($id);
            $member->delete();

            return response()->json(["message" => "¡Miembro eliminado exitosamente!"], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(["message" => "¡Miembro no encontrado!", 404]);
        } catch(Exception $e) {
            Log::error("Error: " . $e->getMessage());

            return response()->json([
                "message" => "¡Error al eliminar el miembro!",
                "error" => $e->getMessage()
            ], 422);
        }
    }
}
