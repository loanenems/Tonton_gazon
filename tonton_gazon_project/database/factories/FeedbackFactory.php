<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Feedback;
use Faker\Generator as Faker;

$factory->define(Feedback::class, function (Faker $faker) {
    
        $u_ids = App\User::pluck('id')->toArray();
    
        return [
                    
                    'idAuthor' => $faker->randomElement($u_ids),
                    'idTarget' => $faker->randomElement($u_ids),
                    'title' => $faker->realText(50),
                    'comment' => $faker->paragraph(2,true),
                    'rating' => $faker->randomDigit,
                ];
            });
