<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagesController extends Controller
{
    public function fetchGardenImages() {
        $storagePath = storage_path('/app/'.auth()->id().'/Garden/vowDomcsYr2wx8WP44bpP5higWI2yOG3WaUwWxt7.png');
        return response()->file($storagePath);
    }
}
