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

Route::post('create', 'PasswordResetController@create');
Route::get('find/{token}', 'PasswordResetController@find');
Route::post('reset', 'PasswordResetController@reset');

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
    'middleware' => ['auth:api', 'verified']
], function () {
    //Garden
    Route::post('garden_add', 'GardenController@addGarden'); //Add a garden into database
    Route::get('garden_get_id', 'GardenController@fetchGardenByIdOwner'); //Fetch all the gardens from database
    Route::post('deleteGarden', 'GardenController@delete'); //Remove a garden from the database

    //Adverts
    Route::get('adverts', 'AdvertController@fetchAdvert'); //Fetch all the adverts from the database
    Route::get('advertGetId', 'AdvertController@fetchAdvertById'); //Fetch an advert by its ID
    Route::post('addAdvert', 'AdvertController@addAdvert'); //Add an advert into database
    Route::get('searchAdvert', 'AdvertController@searchAdvert'); //Make a search into adverts table

    //Feedback
    Route::post('feedback_add', 'FeedbackController@addFeedback'); //Add a feedback into database

    //Profile
    Route::get('userInformations','ProfileController@getInformations'); //Get all the necessary informations for one user
    Route::post('updateProfilePic', 'ProfileController@updatePicture'); //Update informations about the user's profile
    Route::post('updateInformations', 'ProfileController@update'); //Update the user's profile pic

});

Route::get("email/verify/{id}", "Auth\AuthController@verify")->name("verificationapi.verify");
Route::get("email/resend", "Auth\AuthController@resend")->name("verificationapi.resend");



