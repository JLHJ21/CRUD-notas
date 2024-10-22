<?php

use Illuminate\Support\Facades\Route;
#use Spatie\Permission\Models\Role;

#$role = Role::create(['name' => 'user']);

Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');
