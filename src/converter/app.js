var fs = require('fs'),
    util = require('util'),
    mime = require('mime');

function base64Img(src) {
    var data = fs.readFileSync(src).toString('base64');
    return util.format('data:%s;base64,%s', mime.lookup(src), data);
}

var frameStart = process.argv[2],
    frameEnd = process.argv[3],
    folder = process.argv[4],
    outputFile = process.argv[5],
    dataUri = null,
    framesImg = [];

for (; frameStart <= frameEnd; frameStart++) {
    console.log('Converting file: ' + frameStart);
    dataUri = base64Img(folder + frameStart + '.png');
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
