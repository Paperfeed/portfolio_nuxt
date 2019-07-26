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
                        title: 'Home',
                        icon: 'home',
                        to: { name: 'index' }
                    },
                    {
                        title: 'Blog',
                        icon: 'lightbulb',
                        to: { name: 'blog' }
                    },
                    {
                        title: 'Gallery',
                        icon: 'lightbulb',
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

<!--Bulma Customization-->
<style lang="scss">
    // Import Bulma's core
    @import "~bulma/sass/utilities/_all";

    // Set your colors
    $primary: #396c99;
    $primary-invert: findColorInvert($primary);
    $twitter: #4099FF;
    $twitter-invert: findColorInvert($twitter);

    // Setup $colors to use as bulma classes (e.g. 'is-twitter')
    $colors: (
        "white": ($white, $black),
        "black": ($black, $white),
        "light": ($light, $light-invert),
        "dark": ($dark, $dark-invert),
        "primary": ($primary, $primary-invert),
        "info": ($info, $info-invert),
        "success": ($success, $success-invert),
        "warning": ($warning, $warning-invert),
        "danger": ($danger, $danger-invert),
        "twitter": ($twitter, $twitter-invert)
    );

    // Links
    $link: $primary;
    $link-invert: $primary-invert;
    $link-focus-border: $primary;

    //Navbar
    $navbar-breakpoint: 400px + (2 * $gap);

    // Import Bulma and Buefy styles
    @import "~bulma";
    @import "~buefy/src/scss/buefy";

    .tag:not(body) {
        background-color: unset;
    }

    .navbar-item {
        transition: background-color 0.3s ease-in-out;
    }
</style>
