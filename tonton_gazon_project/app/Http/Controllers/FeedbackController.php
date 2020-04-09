<?php

namespace App\Http\Controllers;

use App\Feedback;
use Illuminate\Http\Request;

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
}
