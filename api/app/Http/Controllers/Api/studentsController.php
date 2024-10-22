<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;


class studentsController extends Controller
{

    function index(): JsonResponse
    {


        #obtiene todos los datos
        $students = Students::all();


        if ($students->isEmpty()) {
            $data = [
                'message' => 'No se encontraron estudiantes',
                'error' => '404'
            ];

            return response()->json(data: $data, status: 404);
        }


        $data = [
            'message' => $students,
            'error' => '200'
        ];
        return response()->json(data: $data, status: 200);
    }

    #request $request es para recibir los datos mediante el metodo post
    function store(Request $request): JsonResponse
    {

        #retornar algo el Validator::make
        $validator = Validator::make(data: $request->all(), rules: [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:students',
            'phone' => 'required|unique:students|digits:5',
            'language' => [
                'required',
                Rule::in(['Ingles', 'Español', 'Frances']),
            ],
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
        $student = Students::create(
            attributes: [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'language' => $request->language,
            ]
        );

        #si no se pudo crear el nuevo estudiante
        if (!$student) {
            $data = [
                'message' => 'Error al crear el estudiante',
                'status' => 500
            ];

            return response()->json(data: $data, status: 500);
        }

        #si todo sale bien, retorna
        $data = [
            'message' => $student,
            'status' => 201
        ];

        return response()->json(data: $data, status: 201);
    }

    #muestra un elemento en especifico
    function show($id): JsonResponse
    {
        $student = Students::find($id);


        if (!$student) {

            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $data = [
            'student' => $student,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    #elimina permanentemente un elemento
    function delete($id): JsonResponse
    {
        $student = Students::find($id);


        if (!$student) {

            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $student->delete();

        $data = [
            'student' => 'Estudiante eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    function update(Request $request, $id): JsonResponse
    {

        $student = Students::find($id);

        if (!$student) {

            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $validator = Validator::make(data: $request->all(), rules: [
            'name' => 'required|max:255|unique:students',
            'email' => 'required|email|unique:students',
            'phone' => 'required|unique:students|digits:5',
            'language' => [
                'required',
                Rule::in(['Ingles', 'Espannol', 'Frances']),
            ],
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 422
            ];

            return response()->json(data: $data, status: 422);
        }

        #nuevos datos a guardar
        $student->name = $request->name;
        $student->email = $request->email;
        $student->phone = $request->phone;
        $student->language = $request->language;

        #guarda los nuevos datos
        $student->save();

        $data = [
            'message' => 'Estudiante actualizado',
            'student' => $student,
            'status' => 200
        ];

        return response()->json(data: $data, status: 200);
    }

    function updatePartial(Request $request, $id): JsonResponse
    {
        $student = Students::find($id);


        if (!$student) {
            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }


        $validator = Validator::make(data: $request->all(), rules: [
            'name' => 'max:255',
            'email' => 'email|unique:students',
            'phone' => 'unique:students|digits:5',
            'language' => [
                Rule::in(['Ingles', 'Espannol', 'Frances']),
            ],
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];

            return response()->json(data: $data, status: 200);
        }

        if ($request->has('name')) {
            $student->name = $request->name;
        }


        if ($request->has('email')) {
            $student->email = $request->email;
        }


        if ($request->has('phone')) {
            $student->phone = $request->name;
        }


        if ($request->has('language')) {
            $student->language = $request->language;
        }

        $student->save();

        $data = [
            'message' => 'Actualizado estudiante',
            'student' => $student,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    //
}
