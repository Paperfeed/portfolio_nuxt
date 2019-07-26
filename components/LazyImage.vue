<template>
    <div class="lazyImage" @click="$emit('click', $event)">

        <loading-spinner v-if="loading && !placeholder" />

        <img v-show="!loading"
             ref="image"
             class="image"
             :src="src"
             :srcset="srcset"
             @load="onLoaded"
        />

        <img v-if="placeholder"
             :src="placeholder"
             class="placeholder"
             :class="[loading ? '' : 'animateOut']"
        />

    </div>

</template>

<script>
    import LoadingSpinner from './LoadingSpinner';

    export default {
        name: 'LazyImage',
        components: { LoadingSpinner },
        props: {
            src: String,
            srcset: String,
            placeholder: String
        },
        data() {
            return {
                loading: true,
                ref: this.$refs.image
            }
        },
        watch: {
            src: function(newVal, oldVal) {this.checkIfCached(newVal, oldVal)},
            srcset: function(newVal, oldVal) {this.checkIfCached(newVal, oldVal)}
        },
        methods: {
            checkIfCached(newVal, oldVal) {
                const {image} = this.$refs;

                if (newVal !== oldVal && !image.complete) {
                    console.log('image not cached');
                    this.loading = true;
                }
            },
            onLoaded() {
                console.log('image loaded');
                // setTimeout((component) => { console.log('loaded', component); component.loading = false;}, Math.random() * 2000, this);
                this.loading = false;
            },
        }
    }
</script>

<style scoped lang="scss">
    .lazyImage {
        position: relative;
        min-height: 64px;
        min-width: 64px;
    }

    .placeholder {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        filter: blur(6px);
        transform: scale(1.05);
        pointer-events: none;

        &.animateOut {
            animation: animateOut .4s ease-in-out forwards;
        }
    }

    @keyframes animateOut {
        0% {
            opacity: 1;
        }
        50% {
            filter: brightness(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 0;
       }
    }
</style>
