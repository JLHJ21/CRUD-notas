<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Traits\HasRoles;

class authController extends Controller
{

    public function register(Request $request): JsonResponse
    {

        #retornar algo el Validator::make
        $validator = Validator::make(data: $request->all(), rules: [
            'name' => 'required|max:255|unique:users',
            'username' => 'required|max:255|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|max:255|min:5',
            'repeatPassword' => 'same:password',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 422
            ];

            return response()->json(data: $data, status: 422);
        }

        #crea/ingresa el nuevo valor a la base de datos
        $user = User::create(
            attributes: [
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => $request->password
            ]
        );

        #si no se pudo crear el nuevo estudiante
        if (!$user) {
            $data = [
                'message' => 'Error al crear el usuario',
                'status' => 500
            ];

            return response()->json(data: $data, status: 500);
        }


        #####################################
        $user->assignRole('user');

        #si todo sale bien, retorna
        $data = [
            'message' => $user,
            'status' => 201
        ];

        return response()->json(data: $data, status: 201);
    }

    public function login(Request $request)
    {
        #retornar algo el Validator::make
        $validator = Validator::make(data: $request->all(), rules: [
            'username' => 'required|max:255',
            'password' => 'required|max:255|min:5',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 422
            ];

            return response()->json(data: $data, status: 422);
        }

        //ignorar estos errores, si funciona las funciones
        if (auth()->attempt(['username' => $request->username, 'password' => $request->password])) {
            $user = auth()->user();
            $user->hasRole('user');


            #si todo sale bien, retorna
            $data = [
                'token' => $user->createToken('blognotas')->plainTextToken,
                'user' => $user,
                'status' => 201
            ];

            return response()->json(data: $data, status: 201);
        }

        #si no se pudo crear el nuevo estudiante
        $data = [
            'message' => 'Error al ingresar el usuario',
            'errors' => [],
            'status' => 422
        ];


        return response()->json(data: $data, status: 422);
    }

    public function logout()
    {

        $data['status'] = 421;

        auth()->user()->tokens()->delete();


        #si todo sale bien, retorna
        $data = [
            'status' => 200,
            'message' => 'Sesión cerrada'
        ];

        return response()->json(data: $data, status: 200);
    }

    //
}
