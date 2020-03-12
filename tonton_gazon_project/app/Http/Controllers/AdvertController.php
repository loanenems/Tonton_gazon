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
        //Fetching all informations from database
        $fetch = DB::table('advert')
            ->join('garden', 'advert.idGarden', 'garden.id')
            ->join('users', 'advert.idAuthor', 'users.id')
            ->select('advert.*',
                'garden.description as description_jardin',
                'garden.size',
                'garden.movableObstacle',
                'garden.unmovableObstacle',
                'garden.pets',
                'garden.equipment',
                'garden.image',
                'users.primary_role',
                'users.xp',
                'users.name',
                'users.surname'
                )
            ->orderBy('advert.created_at', 'desc')
            ->get();

        $list = [];

        foreach ($fetch as $row) {
            $advert = [
                "id" => $row->id,
                "title" => $row->title,
                "description" => $row->description,
                "state" => $row->state,
                "created_at" => $row->created_at,
                "updated_at" => $row->updated_at,
            ];
            $garden = [
                "id" => $row->idGarden,
                "description" => $row->description_jardin,
                "size" => $row->size,
                "movableObstacle" => $row->movableObstacle,
                "unmovableObstacle" => $row->unmovableObstacle,
                "pets" => $row->pets,
                "equipment" => $row->equipment,
                "image" => $row->image,
            ];
            $user = [
                "id" => $row->idAuthor,
                "primary_role" => $row->primary_role,
                "xp" => $row->xp,
                "name" => $row->name,
                "surname" => $row->surname,
            ];

            $list[] = array("Advert" => $advert, "Garden" => $garden, "User" => $user);
        }

        return response(['data' => $list], 200);
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
