<template>
    <div class="lazyImage">
        <loading-spinner v-if="loading" />

        <img v-show="!loading"
             ref="lazyImage"
             :srcset="srcset"
             @load="onLoaded"
        />
    </div>

</template>

<script>
    import LoadingSpinner from './LoadingSpinner';
    export default {
        name: 'LazyImage',
        components: { LoadingSpinner },
        props: {
            srcset: String,
            style: Object,
        },
        data() {
            return {
                loading: true
            }
        },
        mounted() {
            if (this.$refs.lazyImage.complete) {
                this.loading = false;
            }
        },
        methods: {
            onLoaded() {
                // setTimeout((component) => { component.loading = false;}, 2000, this);
                this.loading = false;
            },
        }
    }
</script>

<style scoped>

</style>
