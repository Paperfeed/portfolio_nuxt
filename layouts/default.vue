<template>
    <div>
        <nav
            class="navbar header has-shadow is-primary"
            role="navigation"
            aria-label="main navigation"
        >
            <div class="navbar-brand">
                <a
                    class="navbar-item"
                    href="/"
                >
                    <Logo/>
                </a>
                <div class="navbar-burger" @click="toggleNav">
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>

            <div class="navbar-menu" :class="{'is-active': !navHidden}">
                <div class="navbar-end">

                    <nuxt-link class="navbar-item"
                               v-for="(item, key) of items"
                               :key="`nav-item-${key}`"
                               :to="item.to"
                               exact-active-class="is-active"
                    >
                        {{ item.title }}
                    </nuxt-link>
                </div>
            </div>

        </nav>

        <section class="main-content columns">
            <div class="container column">
                <nuxt/>
            </div>
        </section>
    </div>
</template>

<script>
    import Logo from '../components/Logo.vue';

    export default {
        data() {
            return {
                navHidden: true,
                items: [
                    {
                        title: 'About',
                        to: { name: 'index' }
                    },
                    {
                        title: 'Blog',
                        to: { name: 'blog' }
                    },
                    {
                        title: 'Gallery',
                        to: { name: 'gallery' }
                    },
                ]
            }
        },
        methods: {
            toggleNav: function () {
                this.navHidden = !this.navHidden;
            }
        },
        components: {
            Logo
        }
    }
</script>

<style lang="scss">
    @import '../assets/css/bulma.scss';
</style>
