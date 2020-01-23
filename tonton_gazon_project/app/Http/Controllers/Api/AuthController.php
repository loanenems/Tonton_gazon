<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function register(Request $request)
    {

        $validatedData = $request->validate([
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        $validatedData['password'] = Hash::make($request->password);

        $user = User::create($validatedData);

        $accessToken = $user->createToken('authToken')->accessToken;

        return response(['user' => $user, 'access_token' => $accessToken]);
    }

    function login(Request $request)
    {

        $validatedLogin = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($validatedLogin)) {
            return response(['message' => 'Invalid credentials'],409);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response(['user' => auth()->user(), 'access_token' => $accessToken]);
    }
}
