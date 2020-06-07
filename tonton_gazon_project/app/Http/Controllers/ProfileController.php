<?php

namespace App\Http\Controllers;

use App\Advert;
use App\Garden;
use App\Rules\PhoneNumber;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * This function returns the user's informations
     */
    public function getInformations(Request $request)
    {
        $userId = $request->get('id');
        $informations = User::where('id', $userId)->firstOrFail();
        $listGardenId = [];
        $gardens = Garden::where('idOwner', $informations->id)->get();
        foreach ($gardens as $garden) {
            $listGardenId[] = $garden->id;
        }
        $adverts = Advert::whereIn('idGarden', $listGardenId)->get();

        return response(["User" => $informations, "Gardens" => $gardens, "Adverts" => $adverts], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * This function updates the user's profile picture
     */
    public function updatePicture(Request $request)
    {
        $image = $request->image;
        if (isset($image)) {
            $image->storeAs('public/' . auth()->id() . '/profile_picture', $image->getClientOriginalName());
            User::where('id', auth()->user()->id)
                ->update(["profile_picture" => asset('storage/' . auth()->id() . '/profile_picture/' . $image->getClientOriginalName())]);
        }
        return response([], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * This function updates the user's informations
     */
    public function update(Request $request) {
        $data = $request->validate([
            "name" => "required",
            "surname" => "required",
            "email" => "required",
            "phone_number" => ["required", new PhoneNumber],
            "about_me" => "",
        ]);

        User::where('id',auth()->user()->id)
            ->update($data);

        return response([],200);
    }
}
