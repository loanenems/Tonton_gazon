<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Lawnmower;
use Faker\Generator as Faker;

$factory->define(Lawnmower::class, function (Faker $faker) {

    $g_ids = App\Garden::pluck('id')->toArray();

    return [
        'idGarden' => $faker->randomElement($g_ids),
        'name' => $faker->name,
        'photo' => $faker->imageUrl,
        'type' => $faker->realText(20),
        
    ];
});
