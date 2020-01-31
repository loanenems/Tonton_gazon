<?php

namespace App\Http\Controllers;

use App\Advert;
use Illuminate\Http\Request;

class AdvertController extends Controller
{
    /**
     * Retrieve all the adverts of the application
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchAdvert()
    {
        $advert = Advert::get();

        return response(['advert' => $advert], 200);
    }

    /**
     * Retrieve a specific advert by its ID
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchAdvertById($id)
    {
        $advert = Advert::find($id);

        return response((['advert' => $advert]), 200);
    }

    /**
     * Retrieve all the adverts of a specified author's ID
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchAdvertByAuthor($id)
    {
        $advert = Advert::where('idAuthor', $id)->get();

        return response(['advert' => $advert], 200);
    }
}
