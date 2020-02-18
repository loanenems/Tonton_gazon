<?php

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
 * AUTH GROUP
 */
Route::group([],
//Main routes that doesn't require access_token (indeed, they will provide one ^^)
    function () {
        Route::post('login', 'Auth\AuthController@login');
        Route::post('register', 'Auth\AuthController@register');


        //This group of routes use the auth:api middleware which require a valide access token. Of course,
        //You will need an access token to identify who you are, and as well logout
        Route::group([
            'middleware' => 'auth:api'
        ], function () {
            Route::get('logout', 'Auth\AuthController@logout'); //Logout the authenticated user
            Route::get('user', 'Auth\AuthController@user'); //Get the authenticated user's informations
        });
    });

/**
 * Group of routes that require to know who is making the request. access_token provided
 * via Authorization header
 *
 * /!\ DISCLAIMER /!\
 * The route name should not be separated with "_" or "-". Because it may produce an error while trying to get access.
 * For example, if there are two routes, one named "advert_add" and the other named "advert_search", one of them
 * may have some issues trying to access the server-side. Be aware about this fact !
 */
Route::group([
    'middleware' => ['auth:api','verified']
], function () {
    Route::post('garden_add', 'GardenController@addGarden'); //Add a garden into database
    Route::get('garden_get_id', 'GardenController@fetchGardenByIdOwner'); //Fetch all the gardens from database
    Route::get('adverts', 'AdvertController@fetchAdvert'); //Fetch all the adverts from the database
    Route::post('addAdvert', 'AdvertController@addAdvert'); //Add an advert into database
    Route::get('searchAdvert', 'AdvertController@searchAdvert'); //Add an advert into database
});

Route::get("email/verify/{id}", "Auth\AuthController@verify")->name("verificationapi.verify");
Route::get("email/resend", "Auth\AuthController@resend")->name("verificationapi.resend");



