<?php

use Illuminate\Database\Seeder;

class GardenTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Garden::class,100)->create();
    }
}
