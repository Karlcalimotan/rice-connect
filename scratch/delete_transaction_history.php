<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Disable foreign key checks to allow truncation
Schema::disableForeignKeyConstraints();

$tables = [
    'orders',
    'finished_rice_stocks',
    'harvest_interests',
    'harvest_batches',
    'miller_driver', // Clear driver assignments as well
];

foreach ($tables as $table) {
    if (Schema::hasTable($table)) {
        DB::table($table)->truncate();
        echo "Truncated table: $table\n";
    }
}

Schema::enableForeignKeyConstraints();

echo "All transaction history has been deleted.\n";
