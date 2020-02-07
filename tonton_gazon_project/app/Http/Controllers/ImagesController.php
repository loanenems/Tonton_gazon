<?php

namespace App\Http\Controllers;

use App\Garden;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    public function fetchGardenImages()
    {
        //Fetch gardens belonging to the current user
        $gardens = Garden::where('idOwner', auth()->id())->get();
        $garden_list = array();
        foreach ($gardens as $garden){
            $images = json_decode($garden->image);
            foreach ($images as $image){
                $garden_list[] = asset($image);
            }
        }
        return response($garden_list);
    }
}
