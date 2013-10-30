/*
   frameplayer.js
   A video player without video files, just JSON. Based on "images frames" thought to mobile devices!

   @category
   @author Vagner Santana
   @link http://github.com/vagnervjs/frame-video
   @version:0.1
   @since: 04/10/2013
 */

 var FramePlayer = function(){
        this.divCont = null,
        this.elem = null,
        this.videoSrc = null,
        this.frames = 0,
        this.rate = 20,
        this.controls = true,
        this.paused = false,
        this.width = '480px',
        this.height = '320px';
        this.radius = null;
};

FramePlayer.prototype.load = function(el, options) {
    this.divCont = document.querySelector('#' + el);
    this.elem = el;
    this.videoSrc = this.divCont.getAttribute('data-vidsrc');

    var head = document.querySelector('head'),
        style = document.createElement('style');
        style.setAttribute('id', 'style-' + this.elem);
        head.appendChild(style);

    // Options
    if (options.frames !== undefined){ this.frames = options.frames; }
    if (options.rate !== undefined){ this.rate = options.rate; }
    if (options.controls !== undefined){ this.controls = options.controls;}
    if (options.autoplay !== undefined){ if (!options.autoplay) { this.paused = true; } }
    if (options.width !== undefined){ this.width = options.width; }
    if (options.height !== undefined){ this.height = options.height; }
    if (options.radius !== undefined){
        var currentStyle = document.querySelector('#style-' + this.elem);
        currentStyle.innerHTML = '#' + this.elem + ', .frames-' + this.elem + '{ border-radius: ' + options.radius + '; overflow: hidden;}';
    }

    this.divCont.style.background = '#3b3b3b';
    this.divCont.style.width = this.width;
    this.divCont.style.height = this.height;
    this.divCont.style.position = 'relative';

    if(this.controls){
        this.createControlsBar();
    }
};

FramePlayer.prototype.createControlsBar = function() {
    var player = this,
    controlsBar = document.createElement('div');
    controlsBar.setAttribute('id', 'ctrl-'  + player.elem);
    controlsBar.style.position = 'absolute';
    controlsBar.style.bottom = '0';
    controlsBar.style.left = '0';
    controlsBar.style.margin = '0';
    controlsBar.style.zIndex = '1';
    controlsBar.style.opacity = '.6';
    controlsBar.style.width = this.width;
    controlsBar.style.height = '40px';
    controlsBar.style.background = '#000000';

    // Buttons
    var btnPause = document.createElement('button');
    btnPause.setAttribute('id', 'pause-' + player.elem);
    btnPause.style.marginTop = '10px';
    btnPause.style.marginLeft = '10px';
    btnPause.style.marginRight = '10px';
    btnPause.style.float = 'left';
    btnPause.innerHTML = 'Pause';
    btnPause.addEventListener('click', function(){
            player.pause();
        }, false
    );
    controlsBar.appendChild(btnPause);

    var btnPlay = document.createElement('button');
    btnPlay.setAttribute('id', 'play-' + player.elem);
    btnPlay.style.marginTop = '10px';
    btnPlay.style.marginLeft = '10px';
    btnPlay.style.marginRight = '10px';
    btnPlay.style.float = 'left';
    btnPlay.innerHTML = 'Play';
    btnPlay.addEventListener('click', function(){
            player.resume();
        }, false
    );
    controlsBar.appendChild(btnPlay);

    var selectFilter = document.createElement('select'),
        option1 = document.createElement('option'),
        option2 = document.createElement('option'),
        option3 = document.createElement('option'),
        option4 = document.createElement('option');

    selectFilter.setAttribute('id', 'filter-' + player.elem);
    selectFilter.style.marginTop = '10px';
    selectFilter.style.float = 'left';
    option1.setAttribute('value', 'normal');
    option2.setAttribute('value', 'grayscale');
    option3.setAttribute('value', 'sepia');
    option4.setAttribute('value', 'invert');
    option1.innerHTML = 'Normal';
    option2.innerHTML = 'Grayscale';
    option3.innerHTML = 'Sepia';
    option4.innerHTML = 'Invert';
    selectFilter.appendChild(option1);
    selectFilter.appendChild(option2);
    selectFilter.appendChild(option3);
    selectFilter.appendChild(option4);
    selectFilter.addEventListener('change', function(){
            player.setFilter(this.value);
        }, false
    );
    controlsBar.appendChild(selectFilter);

    if(player.paused){
        btnPause.style.display = 'none';
    } else{
        btnPlay.style.display = 'none';
    }
    this.divCont.appendChild(controlsBar);
};

FramePlayer.prototype.play = function() {
    this.getFrames(this.videoSrc, function(frames, player){
        var img = null,
            lastImg = null,
            i = 0,
            container = document.createElement('div');

        container.style.width = player.width;
        container.style.height = player.height;
        container.style.margin = '0';
        container.style.position = 'absolute';
        player.divCont.appendChild(container);

        setInterval(function() {
            if(!player.paused){
                i++;

                if (i >= frames.length) {
                    i = 1;
                }

                img = frames[i];
                img.setAttribute('class', 'frames-' + player.elem);
                img.style.width = player.width;
                img.style.height = player.height;
                if (lastImg) {
                    container.replaceChild(img, lastImg);
                } else {
                    container.appendChild(img);
                }
                lastImg = img;
            }
        }, Math.round(1000 / player.rate));
    });
};

FramePlayer.prototype.resume = function() {
    var btnPlay = document.querySelector('#play-' + this.elem),
        btnPause = document.querySelector('#pause-' + this.elem);

    btnPlay.style.display = 'none';
    btnPause.style.display = 'block';
    this.paused = false;
};

FramePlayer.prototype.pause = function() {
    var btnPlay = document.querySelector('#play-' + this.elem),
        btnPause = document.querySelector('#pause-' + this.elem);

    btnPlay.style.display = 'block';
    btnPause.style.display = 'none';
    this.paused = true;
};

FramePlayer.prototype.setFilter = function(filter) {
    var currentStyle = document.querySelector('#style-' + this.elem);
    currentStyle.innerHTML = null;

    switch (filter) {
      case 'normal':
        currentStyle.innerHTML = '.frames-' + this.elem + '{ }';
        break;
      case 'grayscale':
        currentStyle.innerHTML = '.frames-' + this.elem + '{ -webkit-filter: grayscale(100%); }';
        break;
      case 'sepia':
        currentStyle.innerHTML = '.frames-' + this.elem + '{ -webkit-filter: sepia(100%); }';
        break;
      case 'invert':
        currentStyle.innerHTML = '.frames-' + this.elem + '{ -webkit-filter: invert(100%); }';
        break;
      default:
        break;
    }
};

FramePlayer.prototype.getFile = function(src, callback){
    var _HTTP = null,
        player = this;

    if (window.XMLHttpRequest) {
        _HTTP = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        _HTTP = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (_HTTP) {
        _HTTP.open('GET', src, true);
        _HTTP.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        _HTTP.send(null);
        var p = document.createElement('p');

        _HTTP.onprogress = function() {
            p.innerHTML = 'Loading...';
            p.style.textAlign = 'center';
            p.style.lineHeight = '20';
            p.style.fontSize = '18px';
            player.divCont.appendChild(p);
        };

        if (typeof(_HTTP.onload) !== undefined){
            _HTTP.onload = function() {
                player.divCont.removeChild(p);
                callback(JSON.parse(this.responseText), player);
                _HTTP = null;
            };
        } else {
            _HTTP.onreadystatechange = function() {
                if (_HTTP.readyState === 4) {
                    player.divCont.removeChild(p);
                    callback(JSON.parse(this.responseText), player);
                    _HTTP = null;
                }
            };
        }
    } else {
        console.log('Error loading file.');
    }
};

FramePlayer.prototype.getFrames = function(src, callback){
    var frames = [],
        player = this,
        percentageLoaded = 0,
        i = 1,
        j = 1,
        call = true,
        controlBar = document.querySelector('#ctrl-'  + player.elem);

    while(i <= player.frames){
        var imgObj = new Image(),
            url = document.URL + src + i + '.jpg';

        imgObj.src = url;
        frames[i] = imgObj;
        i++;
    }

    var p = document.createElement('p');
        p.style.float = 'right';
        p.style.fontSize = '14px';
        p.style.marginRight = '10px';
        p.style.color = '#dedede';
        controlBar.appendChild(p);

    frames.forEach(function(imgElem){
        imgElem.addEventListener('load', function() {
            j++;
            percentageLoaded = (j*100/frames.length).toFixed(2);
            if(percentageLoaded > 50 && call){
                callback(frames, player);
                call = false;
            }
            if (percentageLoaded != 100) {
                p.innerHTML = 'Loading... ' + percentageLoaded + '%';
            } else{
                controlBar.removeChild(p);
            }
        }, false);
    });
};
