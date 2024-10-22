<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notes_data', function (Blueprint $table) {
            $table->id('id_note_data');

            ///////////////////////////////////////
            //
            $table->foreignId('id_state')
                ->references('id_state')
                ->on('states')
                ->onDelete('cascade');
            //
            $table->foreignId('id_note')
                ->unique()
                ->references('id_note')
                ->on('notes')
                ->onDelete('cascade');
            ///////////////////////////////////////

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes_data');
    }
};
