var fs = require('fs'),
    util = require('util'),
    mime = require('mime'),
    path = require('path'),
    ffmpeg = require('fluent-ffmpeg'),
    stream = require('stream'),
    mkdirp = require('mkdirp'),
    rimraf = require('rimraf');

var dirName = path.resolve('/tmp/', '.images');


function saveVideoFrames(_path, startTime, endTime){
    // Create or clean image dir if it exists
    mkdirp(dirName, function(err){
        console.log('Existes');
        fs.readdirSync(dirName).map(function(elem, index){
            fs.unlinkSync(path.resolve(dirName, elem));
        });
    })

    var promise = new Promise(function(resolve, reject){
        var command = ffmpeg(path.resolve(_path))
        .noAudio()
        .on('end', function(){
            console.log('end encoding');
            resolve();
        })
        .on('error', function(err){
            reject(err);
        })

        if (startTime){
            command = command.seekInput(startTime);
        }
        if (endTime){
            command = command.duration(endTime);
        }

        command.save(path.resolve(dirName, 'image-%07d.jpg'));

    })

    return promise;
}

function generateFrameVideo(){
    console.log('Start with decoding')
    var ret = fs.readdirSync(dirName).sort().map(function(elem, index){
        return base64Img(path.resolve(dirName, elem));
    })
    console.log('Finish with decoding')
    return ret;
}

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
    var pathVideo = process.argv[2],
        pathVideoFrame = process.argv[3],
        startVideoTime = parseInt(process.argv[4]),
        endVideoTime = parseInt(process.argv[5]);

    var json = {};


    // console.log(process.argv);
    saveVideoFrames(pathVideo, startVideoTime, endVideoTime).then(function(data, err){
        json.frames = generateFrameVideo();
        console.log(json.frames.length);

        fs.writeFile(pathVideoFrame, JSON.stringify(json), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('Completed!');
            }
        });        
    });

    // // Check if the first argument is a number or string
    // if(!isNaN(parseInt(process.argv[2]))) {
    //     var frameStart = process.argv[2],
    //         frameEnd = process.argv[3],
    //         folder = process.argv[4],
    //         outputFile = process.argv[5],
    //         dataUri = null,
    //         framesImg = [];
    // } else {
    //     var frameStart = 1,
    //         frameEnd = fs.readdirSync(process.argv[2]).length,
    //         folder = process.argv[2],
    //         outputFile = process.argv[3];
    // }
    //
    // var dataUri = null,
    //     framesImg = [],
    //     fileTypeExt = path.extname(fs.readdirSync(folder)[0]); //If there's a better way, please do it...
    //
    // for (; frameStart <= frameEnd; frameStart++) {
    //     console.log('Converting file: ' + frameStart);
    //     dataUri = base64Img(folder + frameStart + fileTypeExt);
    //     framesImg[frameStart] = dataUri;
    // }
    //
    // framesImg.splice(null, 1);
} else {
    console.error('Not enough parameters supplied!');
}
