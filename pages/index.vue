<template>
    <section class="hero is-primary is-fullheight-with-navbar">
        <animated-sprite-background/>
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                    <div class="inline">
                        <span>{{title}}</span><span class="caret">|</span>
                    </div>
                </h1>
                <h2 class="subtitle">
                    <div class="inline sub-text" :class="finishedTyping ? 'animateIn' : 'hidden'">
                        <span>Web</span> <span>Developer</span>
                    </div>
                </h2>
            </div>
        </div>
    </section>
</template>

<script>

    import AnimatedSpriteBackground from '../components/AnimatedSpriteBackground';

    export default {
        name: 'HomePage',
        components: { AnimatedSpriteBackground },
        layoutOptions: {
            navbarClass: 'transparent'
        },

        props: {
            string: {
                type: String,
                default: 'Aldert Vaandering'
            },
            typeDelay: {
                type: Number,
                default: 70
            }
        },

        data() {
            return {
                title: '',
                finishedTyping: false
            }
        },

        methods: {
            simulateTypingName() {
                if (this.title.length < this.string.length) {
                    this.title = this.string.substring(0, this.title.length + 1);

                    setTimeout(this.simulateTypingName, (Math.random() * 30) + this.typeDelay)
                } else {
                    // Delay before adding the subtitle
                    setTimeout(() => {
                        this.finishedTyping = true
                    }, 500);
                }
            }
        },

        mounted() {
            setTimeout(this.simulateTypingName, 650);
        }
    }

    console.log(`%cHi there!👋

I see you're taking a look backstage, hope you don't break anything!

I'm for hire, by the way😉`,
        'font-family: monospace; font-weight: bold; font-size: 2em; color: #5631c5');
</script>

<style scoped lang="scss">
    .inline {
        display: inline-block;
        position: relative;
    }

    .caret {
        animation: caret 1.06s linear infinite;
    }

    .sub-text {
        transition: all .4s ease-in-out;
        clip-path: inset(0 100% 0 0);
    }

    .hidden {
        opacity: 0;
    }

    .animateIn {
        clip-path: inset(0 0 0 0);
    }

    @keyframes caret {
        0% {
            opacity: 0;
        }
        49% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
</style>
