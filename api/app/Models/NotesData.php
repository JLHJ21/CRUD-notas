<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#use App\Models\Notes;

class NotesData extends Model
{
    use HasFactory;


    protected $table = 'notes_data';
    protected $primaryKey = 'id_note_data';

    protected $fillable = [
        'id_state',
        'id_note'
    ];


    public function notes()
    {

        return $this->belongsTo(Notes::class, 'id_note');
    }
}
