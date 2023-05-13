<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class LinksController extends Controller
{
    public function save(Request $request)
    {
        $links = $request->input('links');
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

    public function new()
    {
        echo base_path('public\script.py');
        $process = new Process(['python', public_path('script.py')]);
        // $process = new Process(['python', base_path('public\script.py')]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        echo $process->getOutput();

        return response()->json(['message' => 'Python script executed successfully']);
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
