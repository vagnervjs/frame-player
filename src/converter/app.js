var fs = require('fs'),
    util = require('util'),
    mime = require('mime'),
    path = require('path');

function base64Img(src) {
    var data = fs.readFileSync(src).toString('base64');
    return util.format('data:%s;base64,%s', mime.lookup(src), data);
}

/*
 *    Possible argument positions
 *
 *    converter frameStart(number) frameEnd(number) folder(string) outputFile(string)
 *    converter folder(string) outputFile(string)
 *
 */

if(process.argv.length > 2) {
    // Check if the first argument is a number or string
    if(!isNaN(parseInt(process.argv[2]))) {
        var frameStart = process.argv[2],
            frameEnd = process.argv[3],
            folder = process.argv[4],
            outputFile = process.argv[5],
            dataUri = null,
            framesImg = [];
    } else {
        var frameStart = 1,
            frameEnd = fs.readdirSync(process.argv[2]).length,
            folder = process.argv[2],
            outputFile = process.argv[3];
    }

    var dataUri = null,
        framesImg = [],
        fileTypeExt = path.extname(fs.readdirSync(folder)[0]); //If there's a better way, please do it...

    for (; frameStart <= frameEnd; frameStart++) {
        console.log('Converting file: ' + frameStart);
        dataUri = base64Img(folder + frameStart + fileTypeExt);
        framesImg[frameStart] = dataUri;
    }

    framesImg.splice(null, 1);

    var json = {
        frames: framesImg
    };

    fs.writeFile(outputFile, JSON.stringify(json), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('Completed!');
        }
    });
} else {
    console.error('Not enough parameters supplied!');
}