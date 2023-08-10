<?php
// app/Http/Controllers/TodoController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;

class TodoController extends Controller
{
    public function index(): JsonResponse
    {
        $todos = Todo::all();
        return response()->json($todos);
    }
    public function store(Request $request): JsonResponse
    {
        $data = Todo::where('user_id', $request->user()->id)->where('title', $request->title);
        if ($data->first()) {
            return response()->json(['status' => false, 'message' => 'Already exist']);
        }
        $req = $request->all();
        $req['user_id'] = $request->user()->id;
        $data = Todo::create($req);
        return response()->json(['status' => true, 'data' => $data], 201);
    }
    
    public function update(Request $request, $id): JsonResponse
    {
        $data = Todo::find($id);
        if (!$data) {
            return response()->json(['status' => false, 'message' => 'Todo not found'], 404);
        }

        $validateUser = Validator::make(
            $request->all(),
            [
                'has_completed' => 'required',
            ]
        );

        if ($validateUser->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validateUser->errors()
            ], 401);
        }

        $data->has_completed = $request->has_completed;
        $data->save();

        return response()->json(['status' => true, 'data' => $data], 202);
    }

    public function destroy(int $id): JsonResponse
    {
        throw_if(!$id, 'todo Id is missing');
        Todo::findOrFail($id)->delete();
        return response()->json(['status' => true, 'message' => 'todo deleted']);
    }
}