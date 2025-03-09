<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        User::create([
            'name' => 'Admin',
            'username' => 'adminrifki',
            'email' => 'adminrifki@gmail.com',
            'password' => bcrypt('123123123'),
        ])->assignRole('Admin');
    }
}
