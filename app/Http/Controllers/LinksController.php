<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LinksController extends Controller
{
    public function save(Request $request)
    {
        $linkString = $request->input('links');
        $linkString = str_replace(' ', '', $linkString);
        $links = explode(',', $linkString);

        $file = storage_path('app/links.txt');
        foreach ($links as $link) {
            file_put_contents($file, $link . PHP_EOL, FILE_APPEND);
        }

        return response()->json(
            [
                'success' => true,
                'links' => $links
            ]
        );
    }

    public function links()
    {
        $file = storage_path('app/links.txt');
        $links = [];

        if (file_exists($file)) {
            $content = file_get_contents($file);
            $content = str_replace(' ', '', $content);
            $links = explode(',', $content);
        }

        return response()->json(['links' => $links]);
    }
}
