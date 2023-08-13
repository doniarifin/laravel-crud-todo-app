<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{
    public function register(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // Validation
            $validatedData = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|min:6', // You can adjust the minimum password length here
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully',
                'token' => $user->createToken("API_TOKEN")->plainTextToken,
            ], 201); // Use 201 for resource creation success

        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
            ], 500); // Internal Server Error
        }
    }
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            //Validated
            $validateUser = Validator::make($request->all(),
                [
                    'email' => 'required',
                    'password' => 'required'
                ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not exist.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'Logged In Successfully',
                'token' => $user->createToken("API_TOKEN")->plainTextToken,
                'myUser' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function verifyToken(Request $request)
    {
        try {
            $user = Auth::user();
            if ($user) {
                return response()->json(['valid' => true], 200);
            } else {
                return response()->json(['valid' => false], 401);
            }
        } catch (\Throwable $e) {
            return response()->json(['valid' => false], 500);
        }
    }
}
