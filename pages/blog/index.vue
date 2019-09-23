<template>
    <section class="section" ref="intersectionRoot">
        <div class="columns is-centered">
            <div class="column blog">
                <h1 class="title">Ramblings of a madman</h1>
                <h2 class="subtitle">or just a boring blog, whatever</h2>
                <transition-group v-if="!error"
                                  appear
                                  name="slide-fade"
                                  tag="div"
                                  class="blog-post-list"
                                  v-bind:css="false"
                                  @beforeEnter="beforeEnter"
                                  @enter="enter">
                    <blog-post v-for="(post, index) in posts"
                               v-bind="post.fields"
                               :data-index="index"
                               :key="`post-${index}`"
                               :ref="`post-${index}`"
                               shorten="1000"
                    />
                </transition-group>
                <message v-else :message="error" type="error"/>

                <intersection-observer :is-active="!isLoading && hasMoreContent"
                                       @onTriggered="getMorePosts"
                />

                <loading-spinner styleClass="black" v-if="isLoading"/>

                <scroll-to-top/>
            </div>
        </div>
    </section>
</template>

<script>

    import { TweenLite } from 'gsap';
    import LoadingSpinner from '~/components/LoadingSpinner';
    import BlogPost from '~/components/BlogPost';
    import IntersectionObserver from '~/components/IntersectionObserver';
    import ScrollToTop from '~/components/ScrollToTop';
    import Prism from 'prismjs';
    import Message from '~/components/Message';
    import { mapState } from 'vuex';


    export default {
        name: 'Blog',
        components: {
            Message,
            ScrollToTop,
            IntersectionObserver,
            BlogPost,
            LoadingSpinner,
        },

        data() {
            return {
                error: false,
            }
        },

        computed: mapState('blogPosts', ['posts', 'hasMoreContent', 'isLoading']),

        async fetch({ store }) {
            await store.dispatch('blogPosts/getMorePosts');
        },

        updated() {
            Prism.highlightAll();
        },

        methods: {
            getMorePosts() {
                this.$store.dispatch('blogPosts/getMorePosts');
            },

            beforeEnter(el) {
                el.style.opacity = 0;
            },

            enter(el) {
                const delay = (el.dataset.index - this.posts.length * 100) + 300; // + 300 is page transition delay
                setTimeout(() => {
                    TweenLite.fromTo(el, 0.4, {
                        y: '20%',
                        opacity: 0,
                    }, {
                        y: '0%',
                        opacity: 1,
                        clearProps: 'all'
                    })
                }, delay)
            },
        }
    }
</script>


<style scoped lang="scss">
    @import '~/assets/css/prism-darcula.css';

    .blog {
        margin-bottom: 3rem;
        min-width: 0;
        max-width: 768px;
    }

    .blog-post-list {
        margin: 3rem auto 0;
    }
</style>


