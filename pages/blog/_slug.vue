<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column blog">
                <div class="blog-back-button">
                    <go-back-in-app :fallback="{name: 'blog'}">
                        <i class="fa fa-arrow-left"></i> Back to blog
                    </go-back-in-app>
                </div>

                <transition-group v-if="!error"
                                  appear
                                  name="slide-fade"
                                  tag="div"
                                  class="blog-post-list"
                                  v-bind:css="false"
                                  @enter="enter">
                    <blog-post v-if="post"
                               v-bind="post.fields"
                               key="blog-post"
                               :disableLink="true"
                    />
                </transition-group>
                <message v-else :message="error" type="error"/>

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
    import ScrollToTop from '~/components/ScrollToTop';
    import Prism from 'prismjs';
    import Message from '~/components/Message';
    import { mapState } from 'vuex';
    import GoBackInApp from '../../components/GoBackInApp';


    export default {
        name: 'blog-slug',
        components: {
            GoBackInApp,
            Message,
            ScrollToTop,
            BlogPost,
            LoadingSpinner,
        },

        computed: mapState('blogPost', ['post', 'isLoading', 'error']),

        async fetch({ store, params, payload }) {
            if (payload) {
                await store.commit('blogPost/setPost', payload);
            }
            await store.dispatch('blogPost/getPost', params.slug);
        },

        updated() {
            Prism.highlightAll();
        },

        methods: {
            enter(el) {
                TweenLite.fromTo(el, 0.4, {
                    x: '-50%',
                    opacity: 0,
                }, {
                    x: '0%',
                    opacity: 1,
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    @import '../../assets/css/prism-darcula.css';

    .blog {
        margin-bottom: 3rem;
        min-width: 0;
        max-width: 768px;
    }

    .blog-post-list {
        margin: 3rem auto 0;
    }

    .blog-back-button {
        font-size: 1.5em;
    }
</style>
