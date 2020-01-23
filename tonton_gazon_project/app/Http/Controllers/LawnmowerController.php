<?php

namespace App\Http\Controllers;

use App\Lawnmower;
use Illuminate\Http\Request;

class LawnmowerController extends Controller
{
    /**
     * Retrieve all the existing lawnmowers on the application
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchLawnmower()
    {
        $lawnmower = Lawnmower::get();

        return response(['lawnmower' => $lawnmower], 200);
    }

    /**
     * Retrieve a specific lawnmower by its ID
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchLawnmowerById($id)
    {
        $lawnmower = Lawnmower::find($id);

        return response((['lawnmower' => $lawnmower]), 200);
    }
}
