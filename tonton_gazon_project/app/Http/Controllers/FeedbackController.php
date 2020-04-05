<?php

namespace App\Http\Controllers;

use App\Feedback;
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

    public function addFeedback(Request $request) {

        //We validate the data through the request validator
        $validateData = $request->validate([
            'idTarget' => 'numeric|required',
            'title' => 'string|max:1000|required',
            'comment' => 'string|max:5000|required',
            'rating' => 'required',
        ]);

        //Once there are no errors, we insert a new row in the Index table
        $feedback = new Feedback;

        $feedback->idAuthor = auth()->id();
        $feedback->idTarget = $validateData['idTarget'];
        $feedback->title = $validateData['title'];
        $feedback->comment = $validateData['comment'];
        $feedback->rating = $validateData['rating'];

        $feedback->save();
    }

    public function postedFeedback() {
        $feedback = DB::table('feedback')
            ->join('users', 'feedback.idTarget', 'users.id')
            ->select('feedback.*', 'users.*')
            ->where('feedback.idAuthor', 'like', auth()->id())
            ->get();

        return response(['feedback' => $feedback], 200);
    }

    public function receivedFeedback() {
        $feedback = DB::table('feedback')
            ->join('users', 'feedback.idAuthor', 'users.id')
            ->select('feedback.*', 'users.*')
            ->where('feedback.idTarget', 'like', auth()->id())
            ->get();

        return response(['feedback' => $feedback], 200);
    }
}
