<?php

use Illuminate\Database\Seeder;

class LawnmowerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Lawnmower::class,100)->create();
    }
}