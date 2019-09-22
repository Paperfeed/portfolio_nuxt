<template>
    <svg width="100" height="100">
        <defs>
            <pattern :id="id"
                     x="10" y="10" width="20" height="20" patternUnits="userSpaceOnUse" >
                <component :is="computedType"
                           :width="randomIntInRange(computedSize/2, computedSize * 2)"
                           :height="randomIntInRange(computedSize/2, computedSize * 2)"
                           cx="10" cy="10" :r="computedSize"
                           :points="`0,0 ${computedSize},0 ${computedSize},${computedSize}`"
                           :style="`stroke: none; fill: ${computedColor};`"/>
            </pattern>
        </defs>

        <rect width="100%" height="100%" :style="`fill: ${computedBackground};`" />
        <rect width="200%" height="200%" x="-50%" y="-50%" :style="`fill: url(#${id}); ${randomRotation()};`" />
    </svg>
</template>

<script>
    export default {
        name: 'SvgPattern',

        props: {
            type: String,
            size: String,
            color: String,
            background: String
        },

        created() {
            // Generate random pattern id to prevent styling overrides
            this.id = 'pattern-' + Math.random().toString(36).substring(2);
        },

        computed: {
            computedType() {
                const types = ['circle', 'polygon'];
                return this.type || types[Math.floor(Math.random() * types.length)];
            },
            computedSize() {
                return this.size || this.randomIntInRange(3, 12);
            },
            computedColor() {
                return this.color || this.randomColor();
            },
            computedBackground() {
                return this.background || this.randomColor();
            }
        },

        methods: {

            randomIntInRange(min, max) {
                return Math.round(Math.random() * (max - min) + min);
            },

            randomColor() {
                const r = () => Math.round(Math.random() * 255);
                return this.color || `rgb(${r()}, ${r()}, ${r()})`
            },

            randomRotation() {
                return `transform: rotate(${Math.random()*360}deg); transform-origin: center;`
            }
        }
    }
</script>

<style scoped>
    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
