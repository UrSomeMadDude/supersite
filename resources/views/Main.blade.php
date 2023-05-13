<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Главная</title>

        @viteReactRefresh
        @vite('resources/js/index.jsx')
        @vite(['resources/css/main.css'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>