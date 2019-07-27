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
                loading: true
            }
        },
        updated() {
            const {image} = this.$refs;
            if (!image.complete) this.loading = true;
        },
        methods: {
            onLoaded() {
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
        filter: blur(3px);
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
