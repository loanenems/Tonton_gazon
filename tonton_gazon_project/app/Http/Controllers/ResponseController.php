<?php

namespace App\Http\Controllers;

use App\Mail\responseSend;
use App\Response;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

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

    public function fetchResponseByIdUser(Request $request)
    {
        $data = $request->validate([
            "id" => 'required'
        ]);

        $response = DB::table('response')
            ->where('idMowerer',$data['id'])
            ->orWhere('idMowered',$data['id'])
            ->get();


        return response(["response" => $response], 200);
    }


    public function add(Request $request)
    {
        //Check the data's validity
        $data = $request->validate([
            "advertId" => 'required',
            "clientId" => 'required',
            "advertType" => 'required'
        ]);

        $user_id = auth()->user()->id;
        $response = new Response();
        $response->idAdvert = $data['advertId'];

        //If the current user is a mowerer
        if ($data['advertType'] === 1) {
            $response->idMowerer = $user_id;
            $response->idMowered = $data['clientId'];
        } else {
            $response->idMowerer = $data['clientId'];
            $response->idMowered = $user_id;
        }

        $response->save();

        $to = DB::table('users')->where('id',$data['clientId'])->first();

        Mail::to($to->email)->send(new responseSend($data['advertType']));

        return response([], 200);
    }

    public function delete(Request $request)
    {
        //Check the data's validity
        $data = $request->validate([
            "advertId" => 'required',
            "clientId" => 'required',
            "advertType" => 'required'
        ]);

        $user_id = auth()->user()->id;

        $deletedRows = DB::table('response')->where('idAdvert', $data['advertId'])
            ->orWhere(function ($query) use ($user_id) {
                $query->where('idMowerer', $user_id)
                    ->where('idMowered', $user_id);
            })
            ->delete();
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            "state" => 'required',
            "advertId" => 'required'
        ]);


        //If the response is accepted
        if ($data['state'] === 1) {
            Response::where('idAdvert', $data['advertId'])
                ->update(['state' => 1]);
        } else {
            Response::where('idAdvert', $data['advertId'])
                ->update(['state' => 2]);
        }

        return response([], 200);
    }
}
