<template>
    <div>
        <div class="go-back" @click="goBack" :class="logoStyle">
            <i class="fas fa-arrow-left"></i>
            <logo/>
        </div>
        <nuxt/>
    </div>
</template>

<script>
    import Logo from '../components/Logo.vue';

    export default {
        methods: {
            goBack() {
                window.history.back();
            }
        },
        computed: {
            logoStyle() {
                return this.$route.matched.map((r) => {
                    return (r.components.default.options ? r.components.default.options.logoStyle : r.components.default.logoStyle)
                })[0]
            },
        },
        components: {
            Logo
        }
    }
</script>

<style scoped lang="scss">
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

        &::after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 50%;
            background-color: white;
            opacity: 0;
            animation: flash .5s cubic-bezier(0.51, 0.21, 0.84, 1.63) .5s 2;
        }

        &.black {
            i {
                color: black;
            }

            svg polygon, svg path {
                color: black;
                fill: black;
            }
        }

        &.down {
            top: unset;
            bottom: 1rem;
        }
    }

    @keyframes flash {
        0% {
            opacity: .6;
            transform: scale(0.1);
        }
        80% {
            opacity: .1;
            transform: scale(3);
        }
        81% {
            opacity: 0;
        }
    }

    .logo {
        max-height: 36px;
        transition: all .5s ease-in-out;
    }
</style>
