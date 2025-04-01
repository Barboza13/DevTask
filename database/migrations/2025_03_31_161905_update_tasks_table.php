<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, we need to change the column type to VARCHAR(20) to avoid data loss.
        DB::statement("ALTER TABLE tasks MODIFY COLUMN status VARCHAR(20) NOT NULL");

        DB::table('tasks')->where('status', '1')->update(['status' => 'finished']);
        DB::table('tasks')->where('status', '0')->update(['status' => 'in_progress']);

        DB::statement("ALTER TABLE tasks MODIFY COLUMN status ENUM('in_progress', 'finished', 'expired') NOT NULL DEFAULT 'in_progress'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE tasks MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 0");

        DB::table('tasks')->where('status', 'finished')->update(['status' => '1']);
        DB::table('tasks')->where('status', 'in_progress')->update(['status' => '0']);
        DB::table('tasks')->where('status', 'expired')->update(['status' => '0']);

        DB::statement("ALTER TABLE tasks MODIFY COLUMN status TINYINT(1) NOT NULL DEFAULT 0");
    }
};
