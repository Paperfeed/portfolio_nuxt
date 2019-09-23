<template>
    <component :is="chooseElement()" :to="lastVisitedRoute ? '' : this.fallback" @click="goBack">
        <slot></slot>
    </component>
</template>

<script>
    export default {
        name: 'GoBackInApp',
        props: {
            fallback: Object,
        },

        computed: {
            lastVisitedRoute() { return this.$store.state.lastVisitedRoute}
        },

        methods: {
            chooseElement() {
                return this.lastVisitedRoute ? 'a' : 'nuxt-link'
            },

            goBack() {
                this.$router.back();
            }
        }
    }
</script>
