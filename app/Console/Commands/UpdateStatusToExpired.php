<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateStatusToExpired extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-status-to-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the overdue status of all tasks and projects that pass the due date.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $current_date = Carbon::now();

        DB::table('tasks')
            ->where('deleted_at', '=', null) // Check if the task is deleted
            ->where('status', '!=', 'finished')
            ->where('deadline', '<', $current_date)
            ->update(['status' => 'expired']);

        DB::table('projects')
            ->where('deleted_at', '=', null) // Check if the task is deleted
            ->where('status', '!=', 'finished')
            ->where('deadline', '<', $current_date)
            ->update(['status' => 'expired']);

        $this->info('All overdue tasks and projects have been updated to expired status.');
    }
}
