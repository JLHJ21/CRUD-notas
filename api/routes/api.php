<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\studentsController;
use App\Http\Controllers\Api\authController;
use App\Http\Controllers\Api\notesController;

Route::prefix('v1')->group(function () {

    //::publica
    Route::controller(authController::class)->group(function (): void {

        Route::post(uri: '/register', action: 'register');
        Route::post(uri: '/login', action: 'login');
    });

    //::privada (necesita sesion)
    Route::middleware('auth:sanctum')->group(function () {
        #permite escribir solo la clase, ejm: "index" | en vez de studentsController::class, "index"

        //notes
        Route::controller(notesController::class)->group(function (): void {
            Route::get(uri: '/notes', action: 'index');

            //buscador
            Route::post(uri: '/notes/search', action: 'search');

            Route::post(uri: '/notes', action: 'store');

            #Route::post(uri: '/notes/test/{id}', action: 'test');

            #Obtener los datos registrados de un estudiante
            Route::get(uri: '/notes/{id}', action: 'show');

            #Actualizar parcialmente un usuario
            Route::patch(uri: '/notes/{id}', action: 'updatePartial');

            #Actualizar totalmente un usuario
            Route::put(uri: '/notes/{id}', action: 'update');
        });


        //students
        Route::controller(studentsController::class)->group(function (): void {
            #Obtener los estudiantes registrados
            Route::get(uri: '/students', action: 'index');

            #Obtener los datos registrados de un estudiante
            Route::get(uri: '/student/{id}', action: 'show');

            #Crear nuevo estudiante
            Route::post(uri: '/student', action: 'store');

            #Actualizar totalmente un usuario
            Route::put(uri: '/student/{id}', action: 'update');

            #Actualizar parcialmente un usuario
            Route::patch(uri: '/student/{id}', action: 'updatePartial');

            #Actualizar totalmente un usuario
            Route::delete(uri: '/students/{id}', action: 'delete');
        });

        //auth
        Route::controller(authController::class)->group(function (): void {

            Route::post(uri: '/logout', action: 'logout');
        });
    });
});
