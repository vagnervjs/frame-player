#Frame Player

A video player without video files, just JSON. Based on "images frames" thought to mobile devices!

- Project Page: [http://vagnervjs.github.io/frame-player](http://vagnervjs.github.io/frame-player)

##The Problem
The problem of today's HTML5 video is that it can't be played in-line on an HTML page on mobile devices. The way the handheld devices handle it is they open the video in a native player which takes over the page itself, making it impossible to implement any interaction while the video is playing. Also, you can't play two videos at the same time.

##The Solution
Create a player instead of playing video files, show a sequence of images at a certain rate.

##Instalation

- Download the [latest version](https://github.com/vagnervjs/frame-player/releases/) of Frame Player.

- **OR** Use **bower** to install Frame Player

```bash
bower install frame-player
```

- Put the script and the style on your page

```html
    <link rel="stylesheet" href="path-to/frameplayer.css">
    <script src="path-to/frameplayer.js"></script>
```

##Usage

- Insert this HTML code on any part of your page and set the data-src attribute for your JSON video file

```html
    <div id="my-player" class="frameplayer" data-vidsrc="videos/video.json"></div>
```

- Set the options

```javascript
var options = ({
    'rate': 30,
    'controls': false,
    'autoplay': true,
    'backwards': false,
    'startFrame': 10,
    'width': '640px',
    'height': '390px',
    // 'radius': '50%'
});
```

- Init the player

```javascript
var player = new FramePlayer('my-player', options);
	player.play();
```

### Methods

Method          | Parameters     | Returns            | Description
---             | ---            | ---                | ---
`play()`        | None.          | Nothing.           | Start playing the video.
`pause()`       | None.          | Nothing.           | Pause the current video.
`resume()`      | None.          | Nothing.           | Play the current video from the moment it was paused.
`gotoFrame()`   | Integer.       | Nothing.           | Jumps to a specific frame of the video.


##Generating the JSON Video File (ffmpeg lib must be installed)

    - Option 1: Node.js - single command

        ```bash
        cd converter/nodejs_one
        node app.js path/to/video/file path/to/video.json/file startTime endTime
        ```

	- Option 2: Node.js

        - Use ffmpeg to generate the frames from a video file:

        ```bash
        ffmpeg -i video.mp4 -an -f image2 "%d.jpg"
        ```

        - Convert all frames on a single JSON file

		```bash
		cd converter/nodejs
		node app.js frameStart frameEnd folder/to/imgs/ json/video.json
		```

	- Option 3: PHP

        - Use ffmpeg to generate the frames from a video file:

        ```bash
        ffmpeg -i video.mp4 -an -f image2 "%d.jpg"
        ```

		```bash
		cd converter/php
		php to_data_uri.php frameStart frameEnd folder/to/imgs/ json/video.json
		```

## Development

In order to run it locally you'll need to fetch some dependencies and a basic setup.

1. Install [Gulp](http://gulpjs.com/):

    ```sh
    $ [sudo] npm install --global gulp
    ```

2. Install local dependencies:

    ```sh
    $ npm install
    ```

3. To test your project, start the development server (using your prefered server) and open `http://localhost:8000`.

    ```sh
    $ python -m SimpleHTTPServer 8080
    ```

4. To build the distribution files before releasing a new version.

    ```sh
    $ gulp build
    ```

5. Send everything to `gh-pages` branch.


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

[![Vagner Santana](http://gravatar.com/avatar/d050e3a593aa5c49738028ade14606ed?s=70)](http://vagnersantana.com) |
--- | --- | --- | --- | --- | --- | ---
[Vagner Santana](http://vagnersantana.com)<br>[@vagnervjs](http://twitter.com/vagnervjs)|

<!--###Contributors-->


## License

- Code is under [MIT license](http://vagnersantana.mit-license.org)  © Vagner Santana
