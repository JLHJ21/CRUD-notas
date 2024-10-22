<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notes;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\NotesData;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class notesController extends Controller
{

    protected $limit;

    function __construct()
    {
        $this->limit = 2;
    }


    /*
    function test(Request $request, $id)
    {
        $note = NotesData::from('notes_data as not_dat')

            ->join('notes as not', function (JoinClause $join) {
                $join->on('not_dat.id_note', '=', 'not.id_note');
            })
            //colocar columnas a retirar, o escribir sentencia SQL
            ->select(['not_dat.id_note_data', 'not.description_note', 'not.date_note'])
            ->where('not_dat.id_state', '=', 1, 'and')
            ->where('not_dat.id_note_data', '=', $id)
            ->get();
        # ->find($id, ['not_dat.id_note_data']);


        if (!$note) {

            $data = [
                'message' => 'Nota no encontrada',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $validator = Validator::make(data: $request->all(), rules: [
            'description_note' => 'required|max:255',
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
        $newDate = date('Y-m-d H:i:s');
        $note->description_note = $request->description_note;
        $note->newDate = $request->newDate;

        #guarda los nuevos datos
        $note->save();

        $data = [
            'message' => 'Nota actualizada',
            'note' => $note,
            'status' => 200
        ];

        return response()->json(data: $data, status: 200);
    }
    */

    function index(): JsonResponse
    {
        #obtiene todos los datos
        /*
        $notes = NotesData::join('notes', function (JoinClause $join) {
            $join->on('notes_data.id_note', '=', 'notes.id_note');
        })
            //colocar columnas a retirar, o escribir sentencia SQL
            ->select(['notes.description_note', 'notes.date_note', 'notes_data.id_note_data'])
            ->where('id_state', '=', 1)

            //funciona como un execute
            ->get();
        */


        $notes = NotesData::from('notes_data')
            ->select(['id_note_data', 'id_note'])
            ->with('notes:id_note,description_note,date_note')

            //colocar columnas a retirar, o escribir sentencia SQL
            ->where('id_state', '=', 1)
            ->offset(0)
            ->limit($this->limit)
            //funciona como un execute
            ->get();

        //auth()->user()->id;

        if ($notes->isEmpty()) {
            $data = [
                'message' => 'No se encontraron notas',
                'error' => '200',
            ];

            return response()->json(data: $data, status: 200);
        }


        $notesPage = NotesData::from('notes_data')
            ->select(['id_note_data'])
            ->where('id_state', '=', 1)
            ->count();

        //////////////////////////
        //Pagination
        $totalPage = ceil($notesPage / $this->limit);
        $data_page = [];

        for ($i = 0; $i < $totalPage; $i++) {
            $data_page[$i]['page'] = $i + 1;
            $data_page[$i]['selected'] = $i === 0 ? true : false; // si es 0 será true en caso tal que no false
        }



        $data = [
            'message' => 'Búsqueda con éxito',
            'notes' => $notes,
            'pages' => $data_page,
            'error' => '200'
        ];
        return response()->json(data: $data, status: 200);
    }


    #muestra un elemento en especifico
    function show($id): JsonResponse
    {

        $note = NotesData::from('notes_data')
            ->select(["id_note_data", "id_note"])
            ->with('notes:id_note,date_note,description_note')
            /*
            ->join('notes as not', function (JoinClause $join) {
                $join->on('not_dat.id_note', '=', 'not.id_note');
            })
                */
            //colocar columnas a retirar, o escribir sentencia SQL
            ->where("id_state", "=", 1)
            ->where('id_note_data', '=', $id)
            ->first();

        if (!$note) {

            $data = [
                'message' => 'Nota no encontrada',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $data = [
            'note' => $note,
            'message' => 'Busqueda de la nota con éxito',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    function store(Request $request)
    {

        $validator = Validator::make(data: $request->all(), rules: [
            'description_note' => 'required|max:255',
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
        $newDate = date('Y-m-d H:i:s');

        $notes = Notes::create(
            attributes: [
                'description_note' => $request->description_note,
                'date_note' => $newDate
            ]
        );
        $notes->save();


        $notes_data = NotesData::create(
            attributes: [
                'id_state' => 1,
                'id_note' => $notes->getKey()
            ]
        );
        $notes_data->save();


        #si no se pudo crear el nuevo estudiante
        if (!$notes_data) {
            $data = [
                'message' => 'Error al crear el estudiante',
                'status' => 500
            ];

            return response()->json(data: $data, status: 500);
        }

        #si todo sale bien, retorna
        $data = [
            'message' => $notes_data,
            'status' => 201
        ];

        return response()->json(data: $data, status: 201);
    }

    function update(Request $request, $id): JsonResponse
    {

        $note = NotesData::from('notes_data')
            ->select(["id_note_data", "id_note"])
            ->with('notes:id_note,date_note,description_note')
            /*
            ->join('notes as not', function (JoinClause $join) {
                $join->on('not_dat.id_note', '=', 'not.id_note');
            })
                */
            //colocar columnas a retirar, o escribir sentencia SQL
            #->where("id_state", "=", 1)
            ->where('id_note_data', '=', $id)
            ->first();


        if (!$note) {

            $data = [
                'message' => 'Nota no encontrada',
                'status' => 404
            ];

            return response()->json($data, 404);
        }

        $validator = Validator::make(data: $request->all(), rules: [
            'description_note' => 'required|max:255',
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
        $newDate = date('Y-m-d H:i:s');
        $note->notes->description_note = $request->description_note;
        $note->notes->date_note = $newDate;

        #var_dump($note->description_note);

        #guarda los nuevos datos
        $note->notes->save();

        $data = [
            'message' => 'Nota actualizada',
            'note' => $note,
            'status' => 200
        ];

        return response()->json(data: $data, status: 200);
    }

    function updatePartial(Request $request, $id): JsonResponse
    {
        $notes = NotesData::find($id);


        if (!$notes) {
            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];

            return response()->json($data, 404);
        }


        $validator = Validator::make(data: $request->all(), rules: [
            'id_state' => 'int',
            'description_note' => 'max:255',
            'date_note' => 'date_format:Y-m-d H:i:s',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 421
            ];

            return response()->json(data: $data, status: 421);
        }


        if ($request->has('id_state')) {
            $notes->id_state = $request->id_state;
        }

        if ($request->has('description_name')) {
            $notes->description_name = $request->description_name;
        }


        if ($request->has('date_note')) {
            $notes->date_note = $request->date_note;
        }


        $notes->save();

        $data = [
            'message' => 'Actualizado notas',
            'notes' => $notes,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    function search(Request $request)
    {


        $validator = Validator::make(data: $request->all(), rules: [
            'input_search' => 'max:255',
            'number_page' => 'required|integer',
            'option_select' => [
                'required',
                Rule::in(['Description', 'Hi']),
            ],
        ]);


        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 421
            ];

            return response()->json(data: $data, status: 421);
        }

        //transformar los valores
        $option_select = $request->option_select;
        switch ($option_select) {
            case 'Description':
                $option_select = 'description_note';
                break;
            case 'Hi':
                $option_select = 'hola_que_tal';
                break;
            default:
                $option_select = 'error';
                break;
        }


        #obtiene todos los datos
        $dataSearch = '%' . $request->input_search . '%';
        //pagination
        if ($request->number_page === 1) {
            $begin = 0;
        } else {
            $begin = (intval(value: $this->limit)) * (intval($request->number_page) - 1);
        }

        $notes = NotesData::from('notes_data')
            ->select(['id_note_data', 'id_note'])
            ->with('notes:id_note,description_note,date_note')

            //colocar columnas a retirar, o escribir sentencia SQL
            ->where('id_state', '=', 1)
            ->whereHas('notes',  function ($query) use ($option_select, $dataSearch) {
                $query->where($option_select, 'LIKE', $dataSearch);
            })
            ->offset($begin)
            ->limit($this->limit)

            //funciona como un execute
            ->get();


        if ($notes->isEmpty()) {
            $data = [
                'message' => 'No se encontraron notas',
                'error' => '200',
                'page' => [['page' => 1, 'selected' => true]]
            ];
            return response()->json(data: $data, status: 200);
        }


        /////////////

        $notesPage = NotesData::from('notes_data')
            ->select(['id_note_data', 'id_note'])
            ->with('notes:id_note,description_note,date_note')

            //colocar columnas a retirar, o escribir sentencia SQL
            ->where('id_state', '=', 1)
            ->whereHas('notes',  function ($query) use ($option_select, $dataSearch) {
                $query->where($option_select, 'LIKE', $dataSearch);
            })
            ->count();

        //////////////////////////
        //Pagination
        $totalPage = ceil($notesPage / $this->limit);
        $data_page = [];

        for ($i = 0; $i < $totalPage; $i++) {
            $data_page[$i]['page'] = $i + 1;
            $data_page[$i]['selected'] = ($i + 1) === $request->number_page ? true : false; // si es 0 será true en caso tal que no false
        }

        $data = [
            'message' => 'Búsqueda con éxito',
            'notes' => $notes,
            'page' => $data_page,
            'error' => '200'
        ];

        return response()->json(data: $data, status: 200);
    }

    //
}
