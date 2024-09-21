<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("member_project", function (Blueprint $table) {
            $table->foreignId("member_id")->constrained("members")
                ->onUpdate("cascade")->onDelete("cascade");
            $table->foreignId("project_id")->constrained("projects")
                ->onUpdate("cascade")->onDelete("cascade");
            $table->primary(["member_id", "project_id"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("member_project");
    }
};
