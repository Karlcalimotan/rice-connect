<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$creds = [
    ['username' => 'admin', 'email' => 'admin@rice.com', 'role' => 'admin', 'first_name' => 'System', 'last_name' => 'Admin'],
    ['username' => 'farmer', 'email' => 'farmer@example.test', 'role' => 'farmer', 'first_name' => 'Farmer', 'last_name' => 'Joe'],
    ['username' => 'miller', 'email' => 'miller@example.test', 'role' => 'miller', 'first_name' => 'Miller', 'last_name' => 'Mary'],
    ['username' => 'retailer', 'email' => 'retailer@example.test', 'role' => 'retailer', 'first_name' => 'Retailer', 'last_name' => 'Rex'],
    ['username' => 'driver', 'email' => 'driver@example.test', 'role' => 'driver', 'first_name' => 'Driver', 'last_name' => 'Dan'],
];

foreach ($creds as $c) {
    User::updateOrCreate(
        ['email' => $c['email']],
        [
            'username' => $c['username'],
            'role' => $c['role'],
            'first_name' => $c['first_name'],
            'last_name' => $c['last_name'],
            'password' => Hash::make('password'),
            'contact' => '09170000000',
            'province' => 'Iloilo',
            'municipality' => 'Iloilo City',
        ]
    );
    echo "Ensured user: {$c['username']} ({$c['role']})\n";
}
