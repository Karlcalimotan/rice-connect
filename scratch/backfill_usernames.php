<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$users = User::all();
foreach($users as $user) {
    if (!$user->username) {
        $user->username = explode('@', $user->email)[0];
        $user->save();
        echo "Updated {$user->email} to username: {$user->username}\n";
    }
}
