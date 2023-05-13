<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagesController extends Controller
{
    public function save(Request $request)
    {
        $file = $request->file('image');
        $id = uniqid();
        $path = $file->store('files');
        $fileData = "{$id}:{$path}";
        file_put_contents(storage_path('app/files.txt'), $fileData . PHP_EOL, FILE_APPEND);
        return response()->json(['success' => true]);
    }

    public function get()
    {
        # code...
    }
}
