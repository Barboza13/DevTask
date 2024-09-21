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
        Schema::create("tasks", function (Blueprint $table) {
            $table->id();
            $table->foreignId("member_id")->constrained("members")
                ->onUpdate("cascade")->onDelete("cascade");
            $table->foreignId("project_id")->constrained("projects")
                ->onUpdate("cascade")->onDelete("cascade");
            $table->string("title", 255);
            $table->text("description");
            $table->date("deadline");
            $table->boolean("status")->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("tasks");
    }
};
