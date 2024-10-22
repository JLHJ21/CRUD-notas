<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use HasFactory;


    protected $table = 'notes';
    protected $primaryKey = 'id_note';

    protected $fillable = [
        'description_note',
        'date_note'
    ];


    public function notesData()
    {
        #return $this->hasMany('App\Models\NotesData');
        return $this->belongsTo(Notes::class, 'id_note');
    }
}
