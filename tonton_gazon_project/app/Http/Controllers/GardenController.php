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
        $garden = Garden::where('idOwner', 10)->get();

        return response(['jardins' => $garden], 200);
    }

    /**
     * Retrieve a specific garden by its ID
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchGardenById($id)
    {
        $garden = Garden::find($id);

        return response((['jardin' => $garden]), 200);
    }

    public function addGarden(Request $request) {
        $validateData = $request->validate([
            'description' => 'required|max:5000',
            'size' => 'numeric|gt:0|lt:2000',
            'movableObstacle' => 'required',
            'unmovableObstacle' => 'required',
            'pets' => 'required',
            'equipment' => 'required',
        ]);

        Garden::insert(
            [
                'idOwner' => 10,
                'description' => $validateData['description'],
                'size' => $validateData['size'],
                'movableObstacle' => $validateData['movableObstacle'],
                'unmovableObstacle' => $validateData['unmovableObstacle'],
                'pets' => $validateData['pets'],
                'equipment' => $validateData['equipment'],
            ]
        );

        return response(['status' => '200'],200);




    }
}
