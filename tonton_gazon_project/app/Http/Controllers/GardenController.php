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

    /**
     * Retrieve a specific garden by its owner's ID
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchGardenByIdOwner($id)
    {
        $garden = Garden::where('idOwner',auth()->id());

        return response((['jardin' => $garden]), 200);
    }

    public function addGarden(Request $request) {

        //We validate the data through the request validator
        $validateData = $request->validate([
            'description' => 'required|max:5000',
            'size' => 'numeric|gt:0|lt:2000',
            'movableObstacle' => 'required',
            'unmovableObstacle' => 'required',
            'pets' => 'required',
            'equipment' => 'required',
            'image' => 'required',
        ]);

        //We store the image in a folder named with the user id and file with original name
        $validateData['image']->storeAs('public/'.auth()->id().'/Garden',$validateData['image']->getClientOriginalName());

        //Once there are no errors, we insert a new row in the Garden table
        Garden::insert(
            [
                'idOwner' => auth()->id(),
                'description' => $validateData['description'],
                'size' => $validateData['size'],
                'movableObstacle' => $validateData['movableObstacle'],
                'unmovableObstacle' => $validateData['unmovableObstacle'],
                'pets' => $validateData['pets'],
                'equipment' => $validateData['equipment'],
                'image' => json_encode(['image_0'=>'storage/'.auth()->id().'/Garden/'.$validateData['image']->getClientOriginalName()]),
            ]
        );

        //Then we return a response to the client
        return response([],200);
    }
}
