<?php

namespace App\Http\Middleware;

use Closure;

class isMowerer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->user()->primary_role !== 1){
            return response()->json(["You must have the mowerer role to access this page"],403);
        }
        return $next($request);
    }
}
