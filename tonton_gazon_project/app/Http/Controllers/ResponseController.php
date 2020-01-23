<?php

namespace App\Http\Controllers;

use App\Response;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    /**
     * Retrieve a specific response by its ID
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchResponseById($id)
    {
        $response = Response::find($id);

        return response(['response' => $response], 200);
    }
}
