<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagesController extends Controller
{
    public function save(Request $request)
    {
        dd('Поправить эндпоинт');
        $file = $request->file('image');
        $id = uniqid();
        $path = $file->store('files');
        $fileData = "{$id};{$path}";
        file_put_contents(storage_path('app/files.txt'), $fileData . PHP_EOL, FILE_APPEND);
        return response()->json(['success' => true]);
    }

    public function get(Request $request)
    {
        $url = $request->input('url');
        $file = storage_path('app/files.txt');
        $files = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

        foreach ($files as $row) {
            [$existingUrl, $fileUrl] = explode(';', $row);
            if ($url == $existingUrl) {
                return response()->json([
                    'success' => true,
                    'image-url' => $fileUrl
                ]);
            }
            return response()->json([
                'success' => false,
                'error' => 'Url does not exists'
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Invalid url, or file does not existsF']);
    }
}
