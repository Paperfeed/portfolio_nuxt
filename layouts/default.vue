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
                               @click.native="closeNav"
                               exact-active-class="is-active"
                    >
                        {{ item.title }}
                    </nuxt-link>
                    <a class="navbar-item" href="https://resume.aldertvaandering.com">Resume</a>
                </div>
            </div>
        </nav>

        <nuxt/>
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
                        title: 'Blog',
                        to: { name: 'blog' }
                    },
                    {
                        title: 'Gallery',
                        to: { name: 'gallery' }
                    },
                    {
                        title: 'Portfolio',
                        to: { name: 'portfolio' }
                    },
                ]
            }
        },

        methods: {
            closeNav() {
                this.navHidden = true;
            },
            toggleNav() {
                this.navHidden = !this.navHidden;
            }
        },

        computed: {
            isUsingInternetExplorer() {
                const userAgent = window.navigator.userAgent;
                const testForIE = /(MSIE|Trident|Edge).+?([\d.]+)\b/.exec(userAgent);

                // If user is using IE it will return an array
                // [1] is the browser
                // [2] is version number

                // MSIE = Internet Explorer 10 <=
                // Trident = Internet Explorer 11
                // Edge = Edge

                if (testForIE) {
                    switch (testForIE[1]) {
                        case 'MSIE':
                        case 'Trident':
                            alert('Your browser is not supported and should really be updated, ' +
                                'for a safer and better web')
                    }
                }
            }
        },

        mounted() {
            if (this.isUsingInternetExplorer) {
                console.log('blep')
            }
        },

        components: {
            Logo
        },
    }
</script>

<style lang="scss">
    @import '../assets/css/bulma.scss';
</style>

<style scoped>
    .logo {
        max-height: 36px;
    }
</style>
