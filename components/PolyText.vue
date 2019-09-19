<template>
    <div ref="stageElement">

    </div>
</template>

<script>
    class Sprite extends PIXI.Sprite {
        constructor(texture, x, y) {
            super(texture);
            this.jitter = 1;
        }

        update() {
            this.position.x;
            this.position.y;
        }
    }


    export default {
        name: 'PolyText',

        mounted() {
            const pixi = new PIXI.Application({ backgroundColor: 0x2b2b2b });
            const { stageElement } = this.$refs;

            const sprites = [];

            const amountOfSprites = stageElement.clientWidth * stageElement.clientHeight / 50;

            for (let i = 0; i < amountOfSprites; i++) {
                sprites.push(new Sprite())
            }

            stageElement.appendChild(pixi.view);

            pixi.ticker.add((delta) => {
            });

            this.pixi = pixi;
            this.sprites = sprites;
        }
    }
</script>

<style scoped lang="scss">

</style>
