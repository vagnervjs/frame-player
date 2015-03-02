<?php
/*
   to_data_uri.php
   Convert a sequence of images in a JSON file

   @category
   @author Vagner Santana
   @link http://github.com/vagnervjs/frame-video
   @version:0.1
   @since: 04/10/2013
 */

    function getDataURI($image,$mime='') {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->buffer(file_get_contents($image));
        return 'data:'.$mime.';base64,'.base64_encode(file_get_contents($image));
    }

    $frameStart = $argv[1];
    $frameEnd = $argv[2];
    $folder = $argv[3];
    $outputFile = $argv[4];

    for ($i= $frameStart; $i < $frameEnd; $i++) {
        $image = $folder . $i . '.jpg';
        $frames[] = getDataURI($image);
    }

    $json['frames'] = $frames;

    $file = fopen($outputFile, 'w');
    fwrite($file, json_encode($json));
    fclose($file);
