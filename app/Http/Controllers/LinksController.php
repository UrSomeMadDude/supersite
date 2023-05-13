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
        $path = base_path("public\script.py");
        $output = shell_exec("python $path");
        return response()->json(['message' => $output]);
        // $process = new Process(['python', "D:\OpenServer\OSPanel\domains\super\public\script.py"]);
        // $process->run();

        // if (!$process->isSuccessful()) {
        //     throw new ProcessFailedException($process);
        // }

        // echo $process->getOutput();
    }

    public function links()
    {
        $file = storage_path('app/links.txt');
        $links = [];

        if (file_exists($file)) {
            $content = file_get_contents($file);
            $content = str_replace(' ', '', $content);
            $array = explode(PHP_EOL, $content);
            foreach ($array as $link) {
                $links[] = $link;
            }
        }

        return response()->json(['links' => $links]);
    }
}
