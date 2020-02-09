<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Garden;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Garden::class, function (Faker $faker) {

    $u_ids = App\User::pluck('id')->toArray();

    return [
        'idOwner' => $faker->randomElement($u_ids),
        'description' => $faker->text,
        'size' => $faker->randomDigit,
        'movableObstacle' => $faker->randomDigit,
        'unmovableObstacle' => $faker->randomDigit,
        'pets' => $faker->randomDigit,
        'equipment' => $faker->randomDigit,
        'image' => '{"image_0":"'.$faker->imageUrl().'"}',
            ];
});


