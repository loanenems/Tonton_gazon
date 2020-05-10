<?php

namespace App\Http\Controllers;

use App\Advert;
use App\Garden;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function getInformations() {
        $listGardenId = [];
        $informations = auth()->user();
        $gardens = Garden::where('idOwner',$informations->id)->get();
        foreach ($gardens as $garden) {
            $listGardenId[] = $garden->id;
        }
        $adverts = Advert::whereIn('idGarden', $listGardenId)->get();

        return response(["User" => $informations, "Gardens" => $gardens, "Adverts" => $adverts],200);
    }
}
