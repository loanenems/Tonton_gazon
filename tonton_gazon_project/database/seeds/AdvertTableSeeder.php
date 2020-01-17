<?php

use Illuminate\Database\Seeder;

class AdvertTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Advert::class,100)->create();
    }
}
