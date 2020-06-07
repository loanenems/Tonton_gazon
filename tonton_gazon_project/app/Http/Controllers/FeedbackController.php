<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FeedbackController extends Controller
{

    /**
     * Retrieve all the feedbacks of the application
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function fetchFeedback()
    {
        $feedback = Feedback::get();

        return response(['feedback' => $feedback], 200);
    }

    public function addFeedback(Request $request)
    {

        //We validate the data through the request validator
        $validateData = $request->validate([
            'idTarget' => 'numeric|required',
            'title' => 'string|max:1000|required',
            'comment' => 'string|max:5000|required',
            'rating' => 'required',
        ]);

        //Once there are no errors, we insert a new row in the Advert_Index table
        $feedback = new Feedback;

        $feedback->idAuthor = auth()->id();
        $feedback->idTarget = $validateData['idTarget'];
        $feedback->title = $validateData['title'];
        $feedback->comment = $validateData['comment'];
        $feedback->rating = $validateData['rating'];

        $feedback->save();

        //Once we added the new record, we have to update the target's eval.
        $evalList = Feedback::where('idTarget', $validateData['idTarget'])->get();

        $moyenne = 0;
        $cpt = 0;
        $sum = 0;
        foreach ($evalList as $eval) {
            $sum += $eval->rating;
            $cpt += 1;
        }

        if ($cpt > 0) {
            $moyenne = $sum / $cpt;
        }

        User::where('id', $validateData['idTarget'])->update(["eval" => $moyenne]);

        return response([], 200);
    }

    public function delete(Request $request)
    {
        $data = $request->validate([
            "id" => 'required'
        ]);

        Feedback::where('id', $data['id'])->delete();

        return response(["message" => "Le commentaire a bien été supprimé"], 200);
    }

    public function topUsers()
    {
        $users = DB::table('users')
            ->join('feedback', 'users.id', 'feedback.idTarget')
            ->select(
                'users.id',
                'users.profile_picture',
                'users.name',
                'users.surname',
                'users.eval'
            )
            ->limit(9)
            ->orderBy('eval', 'desc')
            ->get();

        return response($users, 200);
    }
}
