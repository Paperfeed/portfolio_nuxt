<template>
    <div class="stage" ref="stageElement"></div>
</template>

<script>
    import * as PIXI from 'pixi.js';
    import Logo from 'assets/Logo.svg';
    import { CRTFilter, TiltShiftFilter } from 'pixi-filters';
    import { GeneratePoints } from '../assets/js/poisson-disc-sampler';
    import throttle from 'lodash-es/throttle';

    export default {
        name: 'AnimatedSpriteBackground',

        mounted() {
            this.pixi = new PIXI.Application({
                backgroundColor: 0x2B2B2B,
                resizeTo: this.$refs.stageElement
            });

            window.addEventListener('resize', throttle(this.createAnimatedBackground, 500));
            document.addEventListener('visibilitychange', this.visibilityChanged);
            this.createAnimatedBackground();
        },

        beforeDestroy() {
            this.pixi.destroy();
            window.removeEventListener('resize', this.createAnimatedBackground);
            document.removeEventListener('visibilitychange', this.visibilityChanged);
        },

        methods: {
            visibilityChanged({target}) {
                if (!this.ticker) return;

                if (target.hidden) {
                    this.ticker.stop();
                } else {
                    this.ticker.start();
                }
            },

            createAnimatedBackground() {
                const { stageElement } = this.$refs;
                const pixi = this.pixi;
                const sprites = [];
                const stageWidth = stageElement.clientWidth;
                const stageHeight = stageElement.clientHeight;
                const points = GeneratePoints(20, { width: stageWidth, height: stageHeight });
                const baseSize = 25;
                const maxZLevel = 100;
                const zLayers = 3;
                const layers = new Array(zLayers);

                pixi.stage.removeChildren();
                pixi.ticker.remove(this.ticker);

                const gradientTexture = this.createGradientTexture(['#344d74', '#1c2438'], 45);
                const gradientBackground = new PIXI.Sprite.from(gradientTexture);
                gradientBackground.width = stageWidth;
                gradientBackground.height = stageHeight;
                pixi.stage.addChild(gradientBackground);


                for (let i = 0; i < zLayers; i++) {
                    const filter = new PIXI.filters.ColorMatrixFilter();
                    const scale = i / zLayers;
                    filter.saturate(scale, true);
                    layers[i] = new PIXI.Container();
                    layers[i].filters = [filter];
                }

                points.map(point => {
                    const sprite = new PIXI.Sprite.from(Logo);
                    sprite.anchor.x = 0.5;
                    sprite.anchor.y = 0.5;
                    sprite.z = Math.random() * maxZLevel;
                    sprite.x = point[0];
                    sprite.y = point[1];

                    const size = baseSize - ((sprite.z / maxZLevel) * 20);
                    sprite.width = size;
                    sprite.height = size;
                    sprite.count = Math.random() * 360;
                    sprite.speed = Math.random() * 0.5 + 1;
                    sprite.rotation = Math.random() * 360;
                    sprite.origin = point;
                    sprite.color = 0xFF0000;

                    sprites.push(sprite);
                    layers[Math.floor(sprite.z / (maxZLevel / zLayers))].addChild(sprite);
                });

                layers.map(layer => pixi.stage.addChild(layer));
                stageElement.appendChild(pixi.view);

                let count = 0;
                this.ticker = pixi.ticker.add((delta) => {
                    count += 0.01;
                    sprites.map(sprite => {
                        sprite.count += 0.04;
                        sprite.rotation = sprite.rotation + (0.01 * delta) % 360;
                        sprite.x = (sprite.origin[0] + Math.sin(sprite.count * sprite.speed) * (sprite.width / baseSize) * 20);
                        sprite.y = (sprite.y + ((sprite.width / baseSize) * sprite.speed * delta)) % stageHeight;
                        sprite.tint = sprite.color + (0x000010 * sprite.y / 85);
                    });
                });

                pixi.stage.filters = [
                    new CRTFilter({
                        lineContrast: 0.5,
                        noise: 0.5,
                        vignettingAlpha: 0.3
                    }),
                    new TiltShiftFilter(10, 500, new PIXI.Point(0, stageHeight / 2 + 25), new PIXI.Point(stageWidth, stageHeight / 2 + 25))
                ];
            },

            createGradientTexture(colorArray, directionInDegrees = 0, quality = 256) {
                const canvas = document.createElement('canvas');
                canvas.width = quality;
                canvas.height = quality;

                const context = canvas.getContext('2d');
                const angleInRadians = directionInDegrees / 180 * Math.PI;
                const x1 = quality / 2 + Math.cos(angleInRadians) * quality;
                const y1 = quality / 2 + Math.sin(angleInRadians) * quality;
                const x2 = quality / 2 - Math.cos(angleInRadians) * quality;
                const y2 = quality / 2 - Math.sin(angleInRadians) * quality;
                const gradient = context.createLinearGradient(x1, y1, x2, y2);

                const stops = colorArray.length;
                colorArray.map((color, index) => gradient.addColorStop(index / (stops - 1), color));
                context.fillStyle = gradient;
                context.fillRect(0, 0, quality, quality);

                return new PIXI.Texture.from(canvas);
            }
        }
    }
</script>

<style scoped lang="scss">
    .stage {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

</style>
