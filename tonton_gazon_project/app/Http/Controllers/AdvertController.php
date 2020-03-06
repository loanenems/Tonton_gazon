<?php

namespace App\Http\Controllers;

use App\Advert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdvertController extends Controller
{
    /**
     * Retrieve all the adverts of the application
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchAdvert()
    {
        $advert = DB::Table('advert')
            ->join('garden', 'garden.id', '=', 'advert.idGarden')
            ->join('users', 'users.id', '=', 'garden.idOwner')
            ->select('garden.*','advert.*','users.name','users.surname','users.email')
            ->get();

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

    public function addAdvert(Request $request)
    {

        //We validate the data through the request validator
        $validatedData = $request->validate([
            "title" => "required",
            "description" => "required",
            "idGarden" => "required",
        ]);

        $advert = new Advert;

        $advert->idAuthor = auth()->id();
        $advert->idGarden = $validatedData['idGarden'];
        $advert->title = $validatedData['title'];
        $advert->description = $validatedData['description'];

        $advert->save();
    }

    public function searchAdvert(Request $request)
    {
        $search = $request->query('search');
        $adverts = Advert::where('title', 'like', '%' . $search . '%')->orWhere('description', 'like', '%' . $search . '%')->paginate(5);
        return response(['adverts' => $adverts], 200);
    }
}
