<template>
    <div>
        <header ref="header" id='header' class='fixed' :class="headerHidden ? 'slideUp' : 'slideDown'">
            <nav id='nav-bar'>
                <img src='' id='header-img' style='display:none'/>
                <div class='logo-container'>
                    <div @click="collapseMenu" id='collapse'><i></i><i></i><i></i></div>
                    <a class='logo' href='#top'>
                        <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 430">
                            <defs>
                                <style>.logo {
                                    fill: #fee77f;
                                }</style>
                            </defs>
                            <path class='logo'
                                  d="M267,435c.06-.49.37-1.21.15-1.44-4.78-5.14-.72-9.11,1.81-13.14,6.29-10,12.72-19.93,19.06-29.9s9.13-21.23,11.91-32.61c2.95-12.07,7.35-23.77,11-35.67a22.61,22.61,0,0,0,.94-6.39c.18-16.12.59-32.25.23-48.37-.22-10.11-1.63-20.2-2.52-30.3-.42-4.63-.81-9.26-1.34-13.88-1.78-15.69-3.92-31.34-5.37-47.05-1.73-18.72-9.73-35.41-15.7-52.82-6.52-19-15.5-36.66-25.23-54.15-9.63-17.3-34.59-21.55-50.75-11.11-2.84,1.83-5.12,4.71-7.23,7.44-4.15,5.38-7.73,11.22-12,16.47-6.27,7.63-12.32,15.29-15.21,25a17.23,17.23,0,0,1-2.92,5.76c-12.31,15.45-17,33.92-21.35,52.61-1.68,7.27-5.42,14.26-6,21.54-1.38,18.74-2.24,37.59-1.88,56.37a347.91,347.91,0,0,0,4.3,51.1c1.71,10.23,6.65,20.12,11.3,29.59,7,14.33,14.9,28.26,22.77,42.16,3.92,6.93,8.69,13.38,13,20.1,1.87,2.92,4.14,5.76.94,9.41s-6.6,3-9.88,1c-3.92-2.43-8-5-11.09-8.3C163.49,375,151.86,360.74,139,347.7A105.75,105.75,0,0,1,113.27,305c-4.22-13.12-9.78-25.82-13.89-39-2.61-8.35-3.53-17.23-5.43-25.82-2.55-11.52-5.62-22.93-7.88-34.5a65.4,65.4,0,0,1-1-16.88c1.1-15.76,2.64-31.5,4.21-47.22a174.43,174.43,0,0,1,10.75-46c6.7-17.22,2.74-32.3-9.51-45.59-3.5-3.8-7.31-7.32-10.66-11.24-3.55-4.15-3.53-6.85.76-10.22C89,22,98.52,16.87,109.15,16.44c19.45-.77,39-1.43,58.39.14,14.78,1.2,29.21-.37,43.8-.74a137,137,0,0,1,21.44.87c19,2.54,37.91-1.08,56.87-1A8.46,8.46,0,0,0,292,15h36a22.86,22.86,0,0,0,3.85.84c9,.43,18,.49,26.93,1.29,2.6.23,6,1.92,7.2,4,.94,1.67-.66,5.06-1.68,7.46-.6,1.42-2.34,2.31-3.4,3.58-5.95,7.15-12,14.2-17.71,21.56s-5.73,15.31-.45,23.14c7.82,11.58,10.55,25.07,13.8,38.24,2.74,11.1,4.16,22.54,6,33.85,1.53,9.16,3.13,18.33,4.26,27.55.85,6.91,1.18,13.91,1.42,20.88.19,5.64-.12,11.29-.17,17-.06,6.77.1,13.55-.14,20.31-.37,10.09.72,20.65-1.92,30.14-4.89,17.62-6.06,35.66-9.11,53.47-1.25,7.31-1.94,15.32-5.52,21.49-8.62,14.88-15.09,30.79-26.17,44.58-14.62,18.21-31.54,33.21-50.31,46.59-1.29.92-2,2.7-2.93,4.08Z"/>
                            <path class='logo'
                                  d="M203.76,189.68c1.71-7.57,2.4-15.56,5.36-22.6,5.64-13.41,22.81-17.47,34.62-8.94,10.61,7.67,16.64,18.35,19.66,30.89,4,16.79-10.91,41.64-27.48,46-5.4,1.42-9.88,0-13.83-3.5C212.71,223.11,204.13,202.38,203.76,189.68Z"/>
                        </svg>
                        <h1>young scrolls</h1></a>
                </div>
                <a class='nav-link collapse' href='#listen'>Listen</a>
                <a class='nav-link collapse' href='#download'>Download</a>
                <a class='nav-link collapse' href='#donate'>Donate</a>
            </nav>
        </header>
        <main ref="main" id='main' :class="playing ? 'playing' : ''">
            <div class='aspectratio'>
                <img ref="overlay" id='overlay' :class="playing ? 'hidden' : ''"
                     src='https://img.youtube.com/vi/RPxvTd_jCPQ/maxresdefault.jpg' alt=""/>
                <div class="hidden" id='video'></div>
            </div>

            <div class='track-info flex' id='listen'>
                <table ref="trackList" id='track-list'>
                    <tbody>
                    <tr>
                        <td>1.</td>
                        <td>Pretty Boy</td>
                        <td>02:23</td>
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>Drink Water</td>
                        <td>02:03</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>Sauce (feat. Gourmet)</td>
                        <td>02:12</td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>Foreign Whips</td>
                        <td>02:00</td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>Zoomin (feat. Dervenin)</td>
                        <td>02:05</td>
                    </tr>
                    <tr>
                        <td>6.</td>
                        <td>Xedilian</td>
                        <td>01:37</td>
                    </tr>
                    <tr>
                        <td>7.</td>
                        <td>Juice (feat. Runs-In-Circles)</td>
                        <td>03:20</td>
                    </tr>
                    <tr>
                        <td>8.</td>
                        <td>Cliff Racer (feat. Aldos Othran)</td>
                        <td>03:11</td>
                    </tr>
                    <tr>
                        <td>9.</td>
                        <td>Stupid (feat. Sanguine)</td>
                        <td>01:52</td>
                    </tr>
                    <tr>
                        <td>10.</td>
                        <td>Sharp Dresser (feat. Syl)</td>
                        <td>02:14</td>
                    </tr>
                    <tr>
                        <td>11.</td>
                        <td>Gucci God</td>
                        <td>02:09</td>
                    </tr>
                    </tbody>
                </table>
                <div class='controls'>
                    <div @click="toggleFullscreen" id='fullscreen'>
                        <i ref="fullscreenicon" id='fullscreenicon' class="fas fa-expand"></i>
                    </div>
                    <div class='flex center'>
                        <i @click="prevTrack" id='previcon' class="playback fas fa-step-backward"></i>
                        <i @click="playPause" ref="playpause" id='playpauseicon' class="playback"
                           :class="ready && !buffering ? (playing ? 'far fa-pause-circle' : 'far fa-play-circle') : 'fas fa-spinner loading'"></i>
                        <i @click="nextTrack" id='nexticon' class="playback fas fa-step-forward"></i>
                    </div>
                    <p class='currently-playing'>Currently Playing:</p>
                    <p id='track-name'>{{trackInfo.name}}</p>
                    <div class='seekbar flex center'><span id='seek-current'>{{parseSeekToMinutes(currentSeek)}}</span>
                        <input type="range" min="0" @change="onSliderChange" :max="trackInfo.lengthInSeconds"
                               :value="currentSeek" class="slider" id="seek-slider">
                        <span id='seek-total'>{{trackInfo.length}}</span>
                    </div>
                </div>
            </div>

            <div id="download">
                <h2>Download the latest young scrolls album</h2>
                <p>Visit the <i>young scrolls</i> bandcamp page to download the latest album Zoom. Any donations to
                    support the youth of Tamriel in their pursuit of music are welcomed with open arms.</p>
                <a href="https://youngscrolls.bandcamp.com/album/zoom">download or purchase <i>Zoom</i> now!</a>
            </div>

            <div id='donate' class='flex center'>
                <div><i class="fas fa-coffee"></i>
                    <p>Buy the young scrolls a <a href='https://ko-fi.com/youngscrolls' alt='Donate a coffee'>skooma
                        coffee.</a></p></div>
                <div><i class="fas fa-shopping-cart"></i>
                    <p>You ain't nothing without some Tamriel swagger. Get yourself <a
                            href='https://society6.com/youngerscrolls' alt='young scrolls merchandise'>some merch!</a>
                    </p></div>
                <div><i class="fas fa-compact-disc"></i>
                    <p>Stream the latest singles <a href='https://soundcloud.com/youngscrolls/sets/zoom'
                                                    alt='young scrolls merchandise'>at soundcloud</a> - for free! Khajit
                        ain't got nothin' on that discount.</p></div>
            </div>
        </main>

        <footer>
            <span id="#subscribe"/>
            <form id='form' action="">
                <label for='email'>Subscribe for more hot beats</label>
                <input type='email' name='email' id='email' placeholder="your email here" required/>
                <input type='submit' id='submit' value='subscribe'/>
            </form>
        </footer>
    </div>
</template>

<script>
    import { throttle } from 'lodash-es';

    export default {
        name: 'young-scrolls-album-media-player',
        layout: 'portfolio',
        logoClass: 'down',
        info: {
            order: 100,
            name: 'Young Scrolls - Album Media Player',
            description: 'A landing page / media player for a full album as a video.\n\n' +
                'Streamed as a single YouTube video it\'s hooked up a rudimentary control system to seek to each track and keep time. \n\n' +
                'It automatically generates the appropriate "time stamps" from the track list table. Making it easy to interchange the album with another one.',
            thumbnail: 'youngscrolls.png',
        },
        head: {
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Asul|Work+Sans' }
            ]
        },
        data() {
            return {
                playing: false,
                buffering: false,
                currentTrack: 0,
                trackInfo: {
                    name: 'Track Name',
                    length: 0,
                    lengthInSeconds: 0
                },
                currentSeek: 0,
                tracks: [],
                headerHidden: false,
                ready: false
            }
        },
        mounted() {
            window.onYouTubeIframeAPIReady = () => {
                this.player = new YT.Player('video', {
                    height: '100%',
                    width: '100%',
                    videoId: 'RPxvTd_jCPQ',
                    playerVars: {
                        title: 'young scrolls - ZOOM',
                        controls: 0,
                        disablekb: 1,
                        showinfo: 0,
                        allowfullscreen: 0,
                        modestbranding: 1,
                        enablejsapi: 1
                    },
                    events: {
                        'onReady': this.onPlayerReady,
                        'onStateChange': this.onStateChange
                    }
                });
            };

            this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            // Asynch load of youtube iframe API
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.trackListHandler();
            this.updateInfo(0);
            window.onscroll = throttle(this.onScroll.bind(this), 40);
        },
        methods: {
            onStateChange(state) {
                //-1 – unstarted
                // 0 – ended
                // 1 – playing
                // 2 – paused
                // 3 – buffering
                // 5 – video cued
                // console.log('State has changed', state);
                window.clearInterval(this.interval);

                switch (state.data) {
                    case -1:
                        this.playing = true;
                        this.buffering = true;
                        break;
                    case 3:
                        this.playing = true;
                        this.buffering = true;
                        this.showPlayer();
                        break;
                    case 1:
                        this.playing = true;
                        this.buffering = false;
                        this.showPlayer();
                        this.interval = window.setInterval(this.updateInfoTimer.bind(this), 1000);
                        break;
                    default:
                        this.hidePlayer();
                        this.interval = 0;
                        this.playing = false;
                        this.buffering = false;
                }
            },

            hidePlayer() {
                this.playerElement.classList.add('hidden');
            },

            showPlayer() {
                this.playerElement.classList.remove('hidden');
            },

            onPlayerReady() {
                this.ready = true;
                this.playerElement = document.getElementsByTagName('iframe')[0];
            },

            onSliderChange(ev) {
                this.seekToTrack(this.currentTrack, parseInt(ev.target.value));
            },

            prevTrack() {
                if (!this.player) return;
                const prevTrack = Math.max(this.currentTrack - 1, 0);
                this.seekToTrack(prevTrack);
            },

            nextTrack() {
                if (!this.player) return;
                const nextTrack = Math.min(this.currentTrack + 1, this.tracks.length - 1)
                this.seekToTrack(nextTrack);
            },

            playPause() {
                if (!this.player) return;
                if (this.playing) {
                    this.player.pauseVideo();
                } else {
                    this.player.playVideo();
                }
            },

            seekToTrack(track, seekTime = 0) {
                this.currentTrack = track;
                this.currentSeek = seekTime;

                if (this.player) {
                    this.player.seekTo(this.tracks[track].trackStart + seekTime, true);
                    this.player.playVideo();
                }

                this.updateInfo(track);
            },

            trackListHandler() {
                const rows = this.$refs.trackList.rows;
                let totalPlayTime = 0;
                for (let i = 0, len = rows.length; i < len; i++) {
                    const trackLengthString = rows[i].children[2].innerHTML;
                    const trackLength = this.parseSeekTime(trackLengthString);
                    const trackName = rows[i].children[1].innerHTML;

                    this.tracks.push({
                        length: trackLengthString,
                        lengthInSeconds: trackLength,
                        trackStart: totalPlayTime,
                        name: trackName
                    });

                    totalPlayTime += trackLength;
                    rows[i].onclick = () => this.seekToTrack(i);
                }
            },

            parseSeekTime(time) {
                const array = time.split(':');
                return (parseInt(array[0]) * 60) + parseInt(array[1]);
            },

            parseSeekToMinutes(time) {
                let min = 0, sec = 0;
                if (time >= 60) {
                    while (time >= 60) {
                        time -= 60;
                        min += 1;
                    }
                }
                if (time > 0) sec = time;
                if (sec < 10) sec = '0' + sec;

                return min + ':' + sec;
            },

            updateInfo(trackNr) {
                this.trackInfo = this.tracks[trackNr];
            },

            updateInfoTimer() {
                if (this.currentSeek >= this.tracks[this.currentTrack].lengthInSeconds) {
                    this.currentTrack += 1;
                    this.currentSeek = 0;
                    this.seekToTrack(this.currentTrack);
                }
                this.currentSeek += 1;
            },

            onScroll(ev) {
                const currentPosition = window.pageYOffset || document.documentElement.scrollTop;

                // Hide nav when scrolling down, reveal when scrolling  back up
                if (currentPosition > 70 && this.scrollPosition < currentPosition) {
                    // Scrolling Down
                    if (!this.headerHidden) {
                        this.headerHidden = true;
                    }
                    this.scrollPosition = currentPosition;
                } else if ((this.scrollPosition - currentPosition) >= 60) {
                    // Scrolling Up
                    if (this.headerHidden) {
                        this.headerHidden = false;
                    }

                    this.scrollPosition = currentPosition;
                }
            },

            toggleFullscreen() {
                const element = document.documentElement;
                const icon = this.$refs.fullscreenicon;

                const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

                element.requestFullScreen = element.requestFullScreen
                    || element.webkitRequestFullScreen
                    || element.mozRequestFullScreen
                    || function () {
                        return false;
                    };

                document.cancelFullScreen = document.cancelFullScreen
                    || document.webkitCancelFullScreen
                    || document.mozCancelFullScreen
                    || function () {
                        return false;
                    };

                if (isFullscreen) {
                    icon.classList.replace('fa-compress', 'fa-expand');
                    document.cancelFullScreen();
                } else {
                    icon.classList.replace('fa-expand', 'fa-compress');
                    element.requestFullScreen();
                }
            },

            collapseMenu(ev) {
                if (!this.navLinks) this.navLinks = document.getElementsByClassName('nav-link');
                let collapsed;
                for (let i = 0, len = this.navLinks.length; i < len; i++) {
                    collapsed = this.navLinks[i].classList.toggle('collapse');
                }

                if (!collapsed) {
                    document.getElementById('nav-bar').onmouseleave = () => this.collapseMenu();
                } else {
                    document.getElementById('nav-bar').onmouseleave = undefined;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    //
    // Variables / Imports
    //
    $grey: #2d2d2d;
    $pink: #fea5c3;
    $yellow: #fee77f;

    //
    // Default styling
    //
    a:link, a:visited {
        text-decoration: none;
    }

    p {
        margin: 1em 0;
    }

    h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: .83em 0;
    }

    //
    // Custom Styling
    //

    // Toggle Classes
    .playing {
        background: $grey;
    }

    /deep/ .hidden {
        visibility: hidden;
    }

    .flex {
        display: flex;
        justify-content: space-evenly;
    }

    .center {
        align-items: center;
    }

    // Header
    header, footer {
        background: $grey;
    }

    .fixed {
        position: fixed;
        z-index: 10;
        width: 100%;
    }

    // End of Header


    // Navigation
    #nav-bar {
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 20px;

        #collapse {
            display: none;
            cursor: pointer;
            margin: 5px;

            i {
                background: white;
                display: block;
                border-radius: 3px;
                height: 3px;
                width: 25px;
                margin-bottom: 5px;

                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }

        .nav-link {
            margin: 5px;
            color: $pink;
            font-family: 'Asul', 'serif';
            font-size: 1.2em;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 2px solid #00000000;
        }

        #logo {
            height: 50px;
            padding: 5px;
        }

        .logo-container {
            box-sizing: content-box;
            margin-right: auto;
        }

        .logo {
            display: flex;
            height: 50px;
            padding: 10px;
            align-items: center;
            font-family: 'Asul', 'serif';

            h1 {
                margin: -5px 0 0 0;
                color: white;
                padding: 0 10px;
                font-size: 1.8em;
            }
        }
    }


    // Main
    main {
        background: $pink;
        transition: .5s all ease-in-out;
        padding-top: 70px;
        font-family: 'Work Sans', 'sans-serif';
    }

    // Video - deep because of injected html
    /deep/ #video, /deep/ #overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        width: 100%;
    }

    .aspectratio {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        pointer-events: none;
    }

    #fullscreen {
        position: absolute;
        right: 18px;
        margin-top: 18px;
        color: $yellow;
        cursor: pointer;
    }

    .track-info {
        padding: 30px 10px;
    }

    #track-list {
        cursor: pointer;
        color: $yellow;

        tr {
            &:hover {
                background: #fee77f22;
            }

            td {
                padding: 4px;
            }

            td:nth-of-type(3) {
                text-align: center;
            }
        }
    }

    .loading {
        animation: spin 2s infinite, fadeIn 1s ease-in-out infinite alternate;
    }

    @keyframes spin {
        100% {
            transform: rotate(359deg);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: .5;
        }
        to {
            opacity: 1;
        }
    }

    .controls {
        display: flex;
        flex-basis: 40%;
        color: white;
        flex-direction: column;
        align-items: center;

        #playpauseicon {
            font-size: 3em;
        }

        .playback {
            color: $yellow;
            margin: 3px;
            font-size: 1.7em;
            transition: all .2s;
            cursor: pointer;

            &:not(.loading):hover {
                transform: scale(1.1);
                color: lighten($yellow, 10%);
            }

            &:active {
                color: darken($yellow, 10%);
            }
        }

        .slider {
            margin: 0;
            width: 90%;
            height: 7px;
            background: white;
            outline: none;
            opacity: 0.7;
            -webkit-appearance: none;
            transition: opacity .2s;
        }

        .slider:hover {
            opacity: 1;
        }

        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 7px;
            height: 7px;
            background: $yellow;
            cursor: pointer;
        }

        p {
            text-align: center;
        }

        .currently-playing {
            margin: 3px;
            font-weight: bold;
        }

        #track-name {
            margin: 0;
            font-style: italic;
        }

        .seekbar {
            span {
                font-size: 0.6em;
                margin: 3px;
            }
        }
    }

    #download {
        color: $grey;
        background: $yellow;
        padding: 12px 40px 30px 40px;

        a {
            color: #b7164c;
            font-weight: bold;
        }
    }

    #donate {
        color: white;
        margin: 25px 15px 0;
        padding-bottom: 30px;
        flex-wrap: wrap;

        div {
            text-align: center;
            margin: 15px;

            i {
                margin: 15px 70px 0;
                font-size: 2.5em;
                color: $yellow;
            }

            p {
                min-width: 200px;
                width: min-content;
                text-align: center;
            }

            a {
                color: $yellow;
                font-weight: bolder;
            }
        }
    }

    #form {
        display: flex;
        padding: 20px;
        color: white;
        justify-content: center;
        align-items: center;

        label, input {
            margin: 0 5px;
            padding: 0 5px;
        }

        input {
            height: 40px;
            text-align: center;
            border: none;
            border-radius: 3px;
        }

        input[type='submit'] {
            color: white;
            background: #fea5c3;
            font-weight: 600;
        }
    }

    //
    // Animations
    //
    .slideUp {
        animation: slideUp .5s ease-out;
        animation-fill-mode: forwards;
    }

    @keyframes slideUp {
        100% {
            transform: translateY(-100%);
        }
    }

    .slideDown {
        animation: slideDown .2s ease-out;
        animation-fill-mode: forwards;
    }

    @keyframes slideDown {
        0% {
            transform: translateY(-100%);
        }
    }

    //
    //Media Queries
    //
    @media (max-width: 500px) {
        #nav-bar {
            flex-wrap: wrap;

            #collapse {
                display: block;
            }

            .logo-container {
                flex: 0 0 100%;
                display: flex;
                align-items: center;
            }

            .logo {
                padding: 0;
                margin: auto;
            }

            .nav-link {
                flex: 0 0 100%;
                margin: 15px 0;
                text-align: center;
                transition: .2s all;
            }

            .collapse {
                visibility: hidden;
                height: 0;
                opacity: 0;
                margin: -5px;
                font-size: 0px;
            }
        }

        .track-info {
            flex-direction: column;

            .controls {
                order: 1;
                margin-bottom: 25px;
            }

            #track-list {
                order: 2;
            }
        }

        #donate {
            flex-direction: column;

            div {
                p {
                    min-width: fit-content;
                    width: fit-content;
                }
            }
        }
    }
</style>
