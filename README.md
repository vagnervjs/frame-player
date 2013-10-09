#Frame Player

A video player without video files, just JSON. Based on "images frames" thought to mobile devices!

- Project Page: [http://vagnervjs.github.io/frame-player](http://vagnervjs.github.io/frame-player)

#The Problem
The problem of today's HTML5 video is that it can't be played in-line on an HTML page on mobile devices. The way the handheld devices handle it is they open the video in a native player which takes over the page itself, making it impossible to implement any interaction while the video is playing. Also, you can't play two videos at the same time.

#The Solution
Create a player instead of playing video files, show a sequence of images at a certain rate.


#Usage

- Put the script on your HTML

```html
	<div id="my-player" data-vidsrc="videos/video.json"></div>
```
- Set the options
```html
var options = ({
    'rate': 30,
    'controls': false,
    'autoplay': true,
    'width': '640px',
    'height': '390px',
    // 'radius': '50%'
});
```
- Init the player
```html
var player = new FramePlayer();
player.load('my-player', options);
player.play();
```
- Using ffmpeg to generate the frames from a video file:
```bash
ffmpeg -i video.mp4 -an -f image2 "%d.jpg"
```
- To convert all frames on a single JSON file, use the PHP file: to_data_uri.php
```bash
php to_data_uri.php frameStart frameEnd folder/to/imgs/ json/video.json
```


### Author

[![Vagner Santana](http://gravatar.com/avatar/d050e3a593aa5c49738028ade14606ed?s=70)](http://vagnersantana.com) |
--- | --- | --- | --- | --- | --- | ---
[Vagner Santana](http://vagnersantana.com)<br>[@vagnervjs](http://twitter.com/vagnervjs)|

<!--###Contributors-->


## License

- Code is under [MIT license](http://vagnersantana.mit-license.org)  © Vagner Santana
