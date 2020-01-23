<?php

namespace App\Http\Controllers;

use App\Garden;
use Illuminate\Http\Request;

class GardenController extends Controller
{

    /**
     * Retrieve all the gardens of the connected user
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchGarden()
    {
        $garden = Garden::where('idOwner', 1)->get();

        return response(['jardins' => $garden], 200);
    }

    /**
     * Retrieve a specific garden by its ID
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchGardenById($id)
    {
        dd($id);
        $garden = Garden::find($id);

        return response((['jardin' => $garden]), 200);
    }
}
