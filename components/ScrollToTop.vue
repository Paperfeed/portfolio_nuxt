<template>
    <div class="scrollToTop block"
         ref="circle"
         @click="scrollToTop"
    >
        <span class="icon is-large"
              ref="icon"
        >
            <i class="fas fa-arrow-up"></i>
        </span>
    </div>
</template>

<script>
    import BIcon from 'buefy/src/components/icon/Icon';
    import throttle from 'lodash-es/throttle';
    import {TimelineLite} from 'gsap';

    export default {

        name: 'ScrollToTop',
        components: { BIcon },
        mounted() {
            const { circle, icon } = this.$refs;

            this.timeline = new TimelineLite();
            this.timeline.pause();
            this.timeline.from(circle, 1, {
                opacity: 0,
                scale: 2,
                ease: Elastic.easeIn.config(1, 0.8)
            }).from( icon, .6, {
                opacity: 0,
                y: '60%',
                ease: Bounce.easeOut
            });

            this.listener = window.addEventListener('scroll', throttle(this.checkPosition, 250));
        },
        destroyed() {
            window.removeEventListener('scroll', this.listener);
        },
        methods: {
            scrollToTop() {
                window.scroll({
                    top: 0,
                    behavior: 'smooth'
                });
            },
            checkPosition(event) {

                if (event.target.scrollingElement.scrollTop > 1000) {
                    this.timeline.play();
                } else {
                    this.timeline.reverse();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/variables";

    .scrollToTop {
        position: fixed;
        bottom: 3rem;
        right: 1.5rem;
        width: 3rem;
        height: 3rem;

        border-radius: 50%;
        background: $primary;
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3), 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    }

    .icon {
        color: white;
    }
</style>
