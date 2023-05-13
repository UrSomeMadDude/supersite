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
<<<<<<< HEAD
        $output = shell_exec("python C:\hakaton-super-site\public\script.py");

        return response()->json(['message' => $output]);
=======
        $path = base_path("public\script.py");
        $output = shell_exec("python $path");
        return response()->json(['message' => $output]);
        // $process = new Process(['python', "D:\OpenServer\OSPanel\domains\super\public\script.py"]);
        // $process->run();

        // if (!$process->isSuccessful()) {
        //     throw new ProcessFailedException($process);
        // }

        // echo $process->getOutput();
>>>>>>> bc318805cb536269f9ddcdad97c56927187a4ea5
    }

    public function links()
    {
        $file = storage_path('app/links.txt');
        $lines = [];

        if (file_exists($file)) {
            $handle = fopen($file, "r");
            if ($handle) {
                while (($line = fgets($handle)) !== false) {
                    $content = str_replace('\n', '', $line);
                    $lines[] = $content;
                }
                fclose($handle);
            }
        }

        return response()->json(['links' => $lines]);
    }
}
