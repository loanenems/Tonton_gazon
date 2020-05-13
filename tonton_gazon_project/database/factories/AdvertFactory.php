<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Advert;
use Faker\Generator as Faker;

$factory->define(Advert::class, function (Faker $faker) {

    $g_ids = App\Garden::pluck('id')->toArray();

    return [

        'idGarden' => $faker->randomElement($g_ids),
        'title' => $faker->realText(50),
        'description' => $faker->paragraph(2, true),
        'payout' => $faker->randomFloat(2,0,500),
        'state' => $faker->randomDigit,
        'date' => "[".$faker->date()."]"
    ];
});
