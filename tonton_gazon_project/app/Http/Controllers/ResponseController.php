<?php

namespace App\Http\Controllers;

use App\Advert;
use App\Mail\acceptedResponse;
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

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * Fetch all the responses regarding a specific user
     */
    public function fetchResponseByIdUser(Request $request)
    {
        $data = $request->validate([
            "id" => 'required'
        ]);

        $response = DB::table('response')
            ->where('idMowerer', $data['id'])
            ->orWhere('idMowered', $data['id'])
            ->get();


        return response(["response" => $response], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * Add a row to the response table
     */
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
        if ($data['advertType'] === 0) {
            $response->idMowerer = $user_id;
            $response->idMowered = $data['clientId'];
        } else {
            $response->idMowerer = $data['clientId'];
            $response->idMowered = $user_id;
        }

        $response->save();

        $to = User::where('id', $data['clientId'])->first();

        Mail::to($to->email)->send(new responseSend($to,$data['advertType']));

        return response([], 200);
    }

    /**
     * @param Request $request
     * Remove a response when a user click on "ne plus repondre"
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
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

        return response([], 200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     * Update the response state, depending on the response state.
     */
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
            $response = Response::where('idAdvert', $data['advertId'])->first();

            //We are sending an email to both users to give them contact informations
            $mowerer = User::where('id', $response->idMowerer)->first();
            $mowered = User::where('id', $response->idMowered)->first();

            Mail::to($mowered)->send(new acceptedResponse($mowerer));
            Mail::to($mowerer)->send(new acceptedResponse($mowered));

            //The advert is now closed because the two users found an agreement
            Advert::where('id', $data['advertId'])->update(["state" => 1]);

        } else {
            Response::where('idAdvert', $data['advertId'])
                ->update(['state' => 2]);
        }

        return response([], 200);
    }
}
