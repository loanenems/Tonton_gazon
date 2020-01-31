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
}
