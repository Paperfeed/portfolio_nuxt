<template>
    <div>
        <nav :class="layoutOptions.navbarClass"
             class="navbar header has-shadow is-primary"
             role="navigation"
             aria-label="main navigation"
        >
            <div class="navbar-brand">
                <nuxt-link class="navbar-item" to="/" @click.native="closeNav">
                    <Logo/>
                </nuxt-link>
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
        components: {
            Logo
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
                            return true;
                    }
                }
            },

            layoutOptions() {
                const defaultOptions = {
                    navbarClass: ''
                };

                return this.$route.matched.map(r => {
                    return (r.components.default.options.layoutOptions ? r.components.default.options.layoutOptions : defaultOptions);
                })[0];
            }
        },
        data() {
            return {
                items: [
                  {
                    title: 'Portfolio',
                    to: { name: 'portfolio' }
                  },
                  {
                    title: 'Gallery',
                    to: { name: 'gallery' }
                  },
                  {
                    title: 'Blog',
                    to: { name: 'blog' }
                  },
                ],
                navHidden: true
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
        mounted() {
            if (this.isUsingInternetExplorer) {
                alert('Your browser is not supported and should really be updated or replaced, ' +
                    'for a safer and better web');
            }
        },
        watch: {
            '$route'(to, from) {
                if (to.path !== from.path) {
                    this.$store.commit('setLastVisitedRoute', { name: from.name, path: from.path })
                }
            }
        },
    }
</script>

<style lang="scss">
    @import '../assets/css/bulma.scss';
</style>

<style scoped lang="scss">
    .navbar {
        &.transparent {
            text-shadow: 0 0 4px white;
            background: transparent;

            .navbar-brand, .navbar-item {
                &:focus {
                    background: transparent !important;
                }
            }

            /deep/ .logo {
                filter: drop-shadow( 0 0 4px white);
            }
        }

        /deep/ .logo {
            width: 25px;
        }
    }
</style>
