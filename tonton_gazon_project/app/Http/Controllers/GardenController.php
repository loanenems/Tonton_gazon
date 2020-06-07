<?php

namespace App\Http\Controllers;

use App\Advert;
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
    public function fetchGardenById(Request $request)
    {
        $data = $request->validate([
            "id" => 'required',
        ]);
        $garden = Garden::find($data["id"]);

        return response( $garden, 200);
    }

    /**
     * Retrieve a specific garden by its owner's ID
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchGardenByIdOwner()
    {
        $garden = Garden::where('idOwner', auth()->id())->get();

        return response((['jardin' => $garden]), 200);
    }

    public function addGarden(Request $request)
    {
        //We validate the data through the request validator
        $validateData = $request->validate([
            'description' => 'required|max:5000',
            'size' => 'numeric|gt:0|lt:2000',
            'movableObstacle' => 'required',
            'unmovableObstacle' => 'required',
            'pets' => 'required',
            'equipment' => 'required',
            'image' => 'required',
            'address' => 'required',
        ]);

        if ($validateData["movableObstacle"] == "true") {
            $result = $request->validate([
                'movableObstacle_details' => 'required',
            ]);
            $validateData["movableObstacle"] = $result["movableObstacle_details"];
        }
        if ($validateData["unmovableObstacle"] == "true") {
            $result = $request->validate([
                'unmovableObstacle_details' => 'required',
            ]);
            $validateData["unmovableObstacle"] = $result["unmovableObstacle_details"];
        }
        if ($validateData["pets"] == "true") {
            $result = $request->validate([
                'pets_details' => 'required',
            ]);
            $validateData["pets"] = $result["pets_details"];
        }

        //We store the image in a folder named with the user id and file with original name
        $validateData['image']->storeAs('public/' . auth()->id() . '/Advert_Index', $validateData['image']->getClientOriginalName());

        //Once there are no errors, we insert a new row in the Advert_Index table
        Garden::insert(
            [
                'idOwner' => auth()->id(),
                'description' => $validateData['description'],
                'size' => $validateData['size'],
                'movableObstacle' => $validateData['movableObstacle'],
                'unmovableObstacle' => $validateData['unmovableObstacle'],
                'pets' => $validateData['pets'],
                'equipment' => $validateData['equipment'],
                'image' => json_encode(['image_0' => asset('storage/' . auth()->id() . '/Advert/' . $validateData['image']->getClientOriginalName())]),
                'address' => $validateData['address'],
            ]
        );
        //Then we return a response to the client
        return response([], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * This function remove a garden from the database
     */
    public function delete(Request $request) {
        $data = $request->validate([
            "id" => "required"
        ]);

        Advert::where('idGarden',$data['id'])
            ->delete();
        Garden::where('id',$data['id'])
            ->delete();

        return response([],200);
    }

    public function update(Request $request) {
        $validateData = $request->validate([
            'description' => 'required|max:5000',
            'size' => 'numeric|gt:0|lt:2000',
            'movableObstacle' => 'required',
            'unmovableObstacle' => 'required',
            'pets' => 'required',
            'equipment' => 'required',
            'address' => 'required',
        ]);
    }
}
