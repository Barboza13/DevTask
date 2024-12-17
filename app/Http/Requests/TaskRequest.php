<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "member_id" => "required|string|exists:members,id",
            "project_id" => "required|string|exists:projects,id",
            "title" => "required|string|max:255",
            "description" => "required|string",
            "deadline" => "required|date",
            "status" => "boolean",
        ];
    }
}
