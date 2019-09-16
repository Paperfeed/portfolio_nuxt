<template>
    <div class="hero is-fullheight">
        <div class='tv-screen'>
            <div ref='x' class="x">
                <div ref='y' class="y">
                    <div id="logo" ref="logo">
                        <svg viewBox="0 0 183 112.25">
                            <defs>
                                <style>.cls-1 {
                                    fill: #fff;
                                }</style>
                            </defs>
                            <path class="cls-1"
                                  d="M103.73,17.83C105.49,15.7,115,4.43,115,4.43H151c18.19,0,30.92,9.53,28,21.77S158.71,48,140.6,48H116.51l7.23-30.42h17l-4.95,20.83h3.81c10.14,0,19.74-3.69,21.76-12.19C163.19,18.41,156.47,14,145.55,14H125l-39,44L70.69,14.8l-.25-.65c0-.09-.33-.4-.49-.34s-.24.6-.19.71a2.91,2.91,0,0,1,.2.5,23,23,0,0,1,.89,11.18C67.82,38.42,50.6,48,32.49,48H8.4l7.23-30.42h17L27.66,38.39h3.81c10.14,0,19.69-3.69,21.7-12.19C55,18.41,48.36,14,37.44,14h-21l2.28-9.58h22.5l29.85,0v0H83.38s3.47,10.16,4.55,13.23c5.15,14.71,4.3,15.71,4.3,15.71s-.62-.95,11.5-15.54Z"/>
                            <path class="cls-1"
                                  d="M3.63,70c0-6.49,37.16-11.76,83-11.76s83,5.27,83,11.76-37.16,11.76-83,11.76-83-5.26-83-11.76Zm80,4.15c10.47,0,19-1.75,19-3.92s-8.49-3.92-19-3.92-19,1.76-19,3.92,8.49,3.92,19,3.92Z"/>
                            <polygon class="cls-1"
                                     points="163.28 79.41 162.51 79.41 162.18 81.78 161.81 81.78 162.14 79.41 161.37 79.41 161.42 79.07 163.32 79.07 163.28 79.41 163.28 79.41"/>
                            <polygon class="cls-1"
                                     points="166.09 81.78 165.74 81.78 165.74 79.72 165.73 79.72 164.64 81.78 164.17 79.7 164.16 79.7 163.49 81.78 163.13 81.78 164.03 79.07 164.34 79.07 164.76 80.91 165.74 79.07 166.09 79.07 166.09 81.78 166.09 81.78"/>
                            <polygon class="cls-1"
                                     points="31.66 102.46 31.72 102.46 36.84 92.14 41.66 92.14 32.73 107.86 30.1 107.86 21.33 92.14 26.14 92.14 31.66 102.46 31.66 102.46"/>
                            <polygon class="cls-1"
                                     points="57.1 107.45 52.62 107.45 52.62 92.14 57.1 92.14 57.1 107.45 57.1 107.45"/>
                            <path class="cls-1"
                                  d="M70.11,92.14h6.4c6.65,0,11.1,3.31,11.1,7.68s-4.57,7.63-11.13,7.63H70.11V92.14Zm4.48,12.71h.74c5.51,0,7.65-2,7.65-5.06,0-3.33-2.56-5.05-7.65-5.05h-.74v10.11Z"/>
                            <polygon class="cls-1"
                                     points="104.04 94.74 104.04 98.11 111.17 98.11 111.17 100.71 104.04 100.71 104.04 104.85 111.44 104.85 111.44 107.45 99.56 107.45 99.56 92.14 111.44 92.14 111.44 94.74 104.04 94.74 104.04 94.74"/>
                            <path class="cls-1"
                                  d="M123.08,99.78c0-4.29,4.66-8,11.36-8s11.37,3.76,11.37,8-4.66,8.08-11.37,8.08-11.36-3.7-11.36-8.08Zm4.63-.13c0,2.32,2.93,5.26,6.73,5.26s6.74-2.94,6.74-5.26c0-2.47-2.8-5-6.74-5s-6.73,2.5-6.73,5Z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class='fixed noise'></div>
        <div class='fixed vignette'></div>
        <div class='fixed scanlines'></div>
    </div>
</template>

<script>
    export default {
        name: 'dvd-screen-saver',
        layout: 'portfolio',
        info: {
            order: 94,
            name: 'DVD Screen Saver',
            description: 'A 99% CSS only rendition of the DVD screen saver, emulating old school cathode ray tube television scanlines and noise',
            thumbnail: 'dvdscreensaver.jpg',
        },
        mounted() {
            // Javascript is only to randomize color on 'bounce',
            // not strictly necessary

            const setNewColor = (el) => el.style.background = getRandomColor();

            const getRandomColor = () => {
                const random = () => (Math.round(Math.random() * 255));
                const r = random(), g = random(), b = random();
                return 'rgb(' + r + ',' + g + ',' + b + ')'
            };

            const { x, y, logo } = this.$refs;

            x.addEventListener('animationiteration', () => setNewColor(logo));

            // Set random initial color and position
            setNewColor(logo);
            x.style.setProperty('--animation-delay-x', (Math.random() * -10) + 's');
            y.style.setProperty('--animation-delay-y', (Math.random() * -10) + 's');
        }
    }
</script>

<style scoped lang="scss">
    // -----------
    // Variables
    // -----------
    // Logo
    $logo-width: 150px;
    $logo-height: 110px;

    // Vignette
    $color-stop: 55%;

    // Scanlines
    $scanlines-z-index: 2000; // 2147483647; // Max Integer
    $scanlines-frame-rate: 60;
    $scanlines-color: rgba(0, 0, 0, 0.3);
    $scanlines-height: 1.75px;

    :root {
        --animation-delay-x: 0;
        --animation-delay-y: 0;
    }

    //
    // Mixin
    //
    @mixin radial-gradient($from, $to, $color-stop) {
        background: -moz-radial-gradient(center, circle farthest-corner, $from $color-stop, $to 100%);
        background: -webkit-gradient(radial, center center, $color-stop, center center, 100%, color-stop(0%, $from), color-stop(100%, $to));
        background: -webkit-radial-gradient(center, circle farthest-corner, $from $color-stop, $to 100%);
        background: -o-radial-gradient(center, circle farthest-corner, $from $color-stop, $to 100%);
        background: -ms-radial-gradient(center, circle farthest-corner, $from $color-stop, $to 100%);
        background: radial-gradient(center, circle farthest-corner, $from $color-stop, $to 100%);
        background-color: $from;
    }

    html {
        height: 100%;
    }
    // CSS
    .tv-screen {
        display: flex;
        flex-grow: 1;
        animation: turn-on 3s linear;
        animation-fill-mode: forwards;
        background: #424242;
        overflow: hidden;
    }

    #logo {
        width: $logo-width;
        height: $logo-height;
        background: lightblue;

        svg {
            margin: 13px 5px 5px 5px;
        }
    }

    .fixed {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .noise {
        animation: noise .5s steps(6) infinite;
        mix-blend-mode: overlay;
        background-size: 55vw;
        background: url('data:image/svg+xml;base64,PHN2ZwogIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycKICB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycKICB3aWR0aD0nMzAwJyBoZWlnaHQ9JzMwMCc+CgoJPGZpbHRlciBpZD0nbicgeD0nMCcgeT0nMCc+CgkJPGZlVHVyYnVsZW5jZQoJCSAgdHlwZT0nZnJhY3RhbE5vaXNlJwoJCSAgYmFzZUZyZXF1ZW5jeT0nMC44NScKCQkgIHN0aXRjaFRpbGVzPSdzdGl0Y2gnLz4KCTwvZmlsdGVyPgoKCTxyZWN0IHdpZHRoPSczMDAnIGhlaWdodD0nMzAwJyBmaWxsPScjMDAwJy8+Cgk8cmVjdCB3aWR0aD0nMzAwJyBoZWlnaHQ9JzMwMCcgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PScwLjcnLz4KPC9zdmc+Cg==');

    }

    .vignette {
        @include radial-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2), $color-stop);
    }

    .scanlines {
        mix-blend-mode: overlay;

        &:before,
        &:after {
            display: block;
            content: '';
            position: absolute;
        }

        &:before {
            width: 100%;
            height: $scanlines-height  * 1;
            z-index: $scanlines-z-index + 1;
            background: $scanlines-color;
            animation: scanline 6s linear infinite;
            mix-blend-mode: unset;
        }

        &:after {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: $scanlines-z-index;
            background: linear-gradient(
                            to bottom,
                            transparent 50%,
                            $scanlines-color 51%
            );
            background-size: 100% ($scanlines-height * 2);
            animation: scanlines #{1/$scanlines-frame-rate}s steps(2) infinite;
        }
    }

    .x, .y {
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate;

        display:flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .x {
        animation-name: slideX;
        animation-delay: var(--animation-delay-x);
        animation-duration: 15.5s;
    }

    .y {
        animation-name: slideY;
        animation-delay: var(--animation-delay-y);
        animation-duration: 10.6s;

    }


    @keyframes slideX {
        100% {
            transform: translate3d(calc(100% - #{$logo-width}), 0, 0);
        }
    }

    @keyframes slideY {
        100% {
            transform: translate3d(0, calc(100% - #{$logo-height}), 0);
        }
    }

    @keyframes scanlines {
        0% {
            background-position: 0 50%;
        }
    }

    @keyframes scanline {
        0% {
            transform: translate3d(0, 200000%, 0);
        }
    }

    @keyframes noise {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 100%;
        }
    }

    @keyframes turn-on {
        0% {
            transform: scale(1, 0.8) translateZ(0);
            -webkit-filter: brightness(30);
            filter: brightness(30);
            opacity: 1;
        }

        3.5% {
            transform: scale(1, 0.8) translate3d(0, 100%, 0);
        }

        3.6% {
            transform: scale(1, 0.8) translate3d(0, -100%, 0);
            opacity: 1;
        }

        9% {
            transform: scale(1.3, 0.6) translate3d(0, 100%, 0);
            -webkit-filter: brightness(30);
            filter: brightness(30);
            opacity: 0;
        }

        11% {
            transform: scale(1, 1) translateZ(0);
            -webkit-filter: contrast(0) brightness(0);
            filter: contrast(0) brightness(0);
            opacity: .7;
        }

        90% {
            transform: scale(1, 1) translateZ(0);
            -webkit-filter: contrast(1) brightness(1.2) saturate(1.3);
            filter: contrast(1) brightness(1.2) saturate(1.3);
            opacity: 1;
        }
    }
</style>
