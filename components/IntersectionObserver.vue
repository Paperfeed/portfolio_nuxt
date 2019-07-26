<template>
    <div ref="trigger"></div>
</template>

<script>
    export default {
        name: 'intersection-observer',
        props: {
            options: {
                type: Object,
                default: () => {return {
                    root: null,
                    threshold: 1,
                }}
            },
            isActive: Boolean,
        },
        data() {
            return {
                observer: null
            }
        },
        watch: {
            isActive() {
                if (this.isActive) {
                    this.observer.observe(this.$refs.trigger);
                } else {
                    this.observer.unobserve(this.$refs.trigger);
                }
            }
        },
        mounted() {
            this.observer = new IntersectionObserver(entries => {
                this.checkIfIntersecting(entries[0])
            }, this.options)
        },
        destroyed() {
            this.observer.disconnect();
        },
        methods: {
            checkIfIntersecting(entry) {
                if (entry.isIntersecting) this.$emit('triggered');
            }
        }
    }
</script>
