<?php

namespace App\Http\Middleware;

use Closure;

class isMowered
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
        if($request->user()->primary_role !== 0){
            return response()->json(["You must have the mowered role to access this page"],403);
        }
        return $next($request);
    }
}
