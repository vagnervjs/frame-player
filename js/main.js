var options1 = ({
    'rate': 30,
    'controls': false,
    'autoplay': true,
    'width': '400px',
    'height': '260px',
    'radius': '40% 0'
});
var options2 = ({
    'rate': 30,
    'controls': true,
    'autoplay': true,
    'width': '640px',
    'height': '390px',
});

var player1 = new FramePlayer('player1', options1);
player1.play();

var player2 = new FramePlayer('player2', options2);
player2.play();
