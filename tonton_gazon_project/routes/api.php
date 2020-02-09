<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * These route are intended to authenticate the user
 */
Route::group([
    'prefix' => 'auth' //We are adding a prefix to routes ("api/auth/login" for example)
], function () {
    Route::post('login', 'Api\AuthController@login');
    Route::post('register', 'Api\AuthController@register');


    //This group of routes use the auth:api middleware which require a valide access token. Of course,
    //You will need an access token to identify who you are, and as well logout
    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'Api\AuthController@logout'); //Logout the authenticated user
        Route::get('user', 'Api\AuthController@user'); //Get the authenticated user's informations
    });
});

//Group of routes that require to know who is making the request
Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::post('garden_add', 'GardenController@addGarden'); //Add a garden into database
    Route::get('garden_get_id', 'GardenController@fetchGardenByIdOwner'); //Fetch all the gardens from database
    Route::get('adverts', 'AdvertController@fetchAdvert'); //Fetch all the adverts from the database
});



