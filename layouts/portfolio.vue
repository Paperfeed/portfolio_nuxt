<template>
    <div>
        <go-back-in-app class="go-back" :fallback="{name: 'portfolio'}" :class="options.class" :style="options.style">
            <i class="fas fa-arrow-left"></i>
            <logo/>
        </go-back-in-app>
        <show-source-code :source="options.source"/>
        <nuxt/>
    </div>
</template>

<script>
    import Logo from '../components/Logo.vue';
    import ShowSourceCode from '../components/ShowSourceCode';
    import GoBackInApp from '../components/GoBackInApp';

    export default {
        methods: {
        },
        computed: {
            options() {
                const rawGithubSource = 'https://raw.githubusercontent.com/Paperfeed/portfolio_nuxt/master/';

                return this.$route.matched.map((r) => {
                    if (r.components.default.options) {
                        return {
                            class: r.components.default.options.logoClass,
                            style: r.components.default.options.logoStyle,
                            source: r.components.default.options.source ?
                                r.components.default.options.source :
                                `${rawGithubSource}pages/portfolio/${r.components.default.options.name}.vue`,
                        }
                    }
                })[0]
            },
        },
        components: {
            GoBackInApp,
            ShowSourceCode,
            Logo
        }
    }
</script>

<style lang="scss">
    @import '../assets/css/bulma.scss';

    $arrow-size: 1rem;

    .go-back {
        display: flex;
        align-items: center;
        z-index: 2147483647;
        position: fixed;
        left: 1rem;
        top: 1rem;
        cursor: pointer;

        &:hover {
            i {
                clip-path: inset(0 0 0 0);
            }

            .logo {
                transform: translateX($arrow-size);
            }
        }

        i {
            position: absolute;
            font-size: $arrow-size;
            color: white;
            clip-path: inset(0 $arrow-size 0 0);
            transition: all .5s ease-in-out;
        }

        &::before {
            content: 'click here to go back';
            font-size: .5rem;
            font-family: sans-serif;
            font-weight: lighter;
            color: white;
            position: absolute;
            top: 100%;
            left: 0;
            white-space: nowrap;
            clip-path: inset(0 0 0 100%);
            animation: glow .5s ease-in-out infinite alternate, clipInScan .2s linear 1s 1, clipIn .2s ease-in 1.4s forwards, clipIn .2s ease-in 4.5s reverse forwards, clipInScan .2s linear 4.7s 1 reverse forwards;
        }

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 50%;
            background-image: radial-gradient(white 0%, transparent 100%);
            opacity: 0;
            animation: attention 1s ease-out .5s 3;
        }

        &.black {
            i {
                color: black;
            }

            .logo polygon, .logo path {
                color: black;
                fill: black;
            }

            &::after {
                background-image: radial-gradient(black 0%, transparent 100%);
            }

            &::before {
                color: black;
            }
        }

        &.down {
            top: unset;
            bottom: 1rem;

            &::before {
                top: unset;
                bottom: 100%;
            }
        }
    }

    .logo {
        max-height: 36px;
        transition: all .5s ease-in-out;
    }

    //
    // Animations
    //
    @keyframes glow {
        0% {
            opacity: 1
        }
        100% {
            opacity: .8
        }
    }

    @keyframes attention {
        0% {
            opacity: 0;
            transform: scale(0.4);
        }
        10% {
            opacity: .4;
            transform: scale(0.4);
        }
        100% {
            opacity: .1;
            transform: scale(2);
        }
    }

    @keyframes clipInScan {
        0% {
            clip-path: inset(0 0 0 100%);
        }
        20% {
            clip-path: inset(0 0 0 75%);
        }
        40% {
            clip-path: inset(0 25% 0 50%);
        }
        60% {
            clip-path: inset(0 50% 0 25%);
        }
        80% {
            clip-path: inset(0 75% 0 0);
        }
        100% {
            clip-path: inset(0 100% 0 0);
        }
    }

    @keyframes clipIn {
        0% {
            clip-path: inset(0 0 0 100%);
        }
        100% {
            clip-path: inset(0 0 0 0);
        }
    }
</style>
