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
                      <span>Software</span> <span>Consultancy</span>
                    </div>
                </h2>
            </div>
        </div>

        <footer>
          <div>Arusan<br/> KvK 84379057<br/>Van Walbeeckstraat 102-1, Amsterdam</div>
          <div style="align-self: flex-end;">
            <div @mouseover="hoverPhone = true" @mouseleave="hoverPhone = false">
              <span v-if="!hoverPhone" class="reverse"><span v-for="character in getPhone()">{{character}}</span></span>
              <span v-if="hoverPhone" style="display: flex;"><a style="margin-left: auto;" :href="`tel:${getPhone().split(' ').reverse().join('')}`">{{ getPhone().split(' ').reverse().join('') }}</a></span>
            </div>
            <div @mouseover="hoverEmail = true" @mouseleave="hoverEmail = false">
              <span v-if="!hoverEmail" class="reverse"><span v-for="character in getEmail()">{{character}}</span></span>
              <span v-if="hoverEmail"><a :href="`mailto:${getEmail().split(' ').reverse().join('')}`">{{ getEmail().split(' ').reverse().join('') }}</a></span>
            </div>
          </div>
        </footer>
    </section>
</template>

<script>

    import AnimatedSpriteBackground from '../components/AnimatedSpriteBackground';

    export default {
        components: { AnimatedSpriteBackground },
        data() {
            return {
                finishedTyping: false,
                hoverEmail: false,
                hoverPhone: true,
                title: '',
            }
        },
        layoutOptions: {
            navbarClass: 'transparent'
        },

        methods: {
            getEmail() {
                return 'g n i r e d n a a v t r e d l a @ e m'
            },
            getPhone() {
              return '9 9 5 5 7 7 3 8 6 1 3 +'
            },
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
        },

        name: 'HomePage',

        props: {
            string: {
                default: 'Aldert Vaandering',
                type: String
            },
            typeDelay: {
                default: 70,
                type: Number
            }
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

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;

      display: flex;
      justify-content: space-between;
      padding: 1rem;
      font-size: 10px;
      opacity: 0.6;
    }

    .reverse {
      display: flex;
      flex-direction: row-reverse;
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
