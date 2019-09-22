<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column blog">
                <transition-group v-if="!error"
                                  appear
                                  name="slide-fade"
                                  tag="div"
                                  class="blog-post-list"
                                  v-bind:css="false"
                                  @before-enter="beforeEnter"
                                  @enter="enter">
                    <blog-post v-if="post"
                               v-bind="post"
                               key="blog-post"
                    />
                </transition-group>
                <message v-else :message="error" type="error"/>

                <loading-spinner styleClass="black" v-if="!post"/>

                <scroll-to-top/>
            </div>
        </div>
    </section>
</template>

<script>
    import { createClient } from '~/plugins/contentful';
    import { TweenLite } from 'gsap';
    import LoadingSpinner from '~/components/LoadingSpinner';
    import BlogPost from '~/components/BlogPost';
    import ScrollToTop from '~/components/ScrollToTop';
    import Prism from 'prismjs';
    import Message from '~/components/Message';

    const client = createClient();

    export default {
        name: 'blog-slug',
        components: {
            Message,
            ScrollToTop,
            BlogPost,
            LoadingSpinner,
        },

        data() {
            return {
                error: false,
                post: null
            }
        },

        mounted() {
            this.slug = this.$route.params.id;
            this.retrievePost();
        },

        updated() {
            Prism.highlightAll();
        },

        methods: {
            async retrievePost() {
                let post;

                try {
                    post = await client.getEntries({
                        'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
                        'fields.slug[in]': this.slug
                    });
                } catch(e) {
                    this.error = 'A network error has occurred. Maybe the servers aren\'t working or your internet is down.';
                    return false;
                }

                if (post) {
                    this.post = post.items[0].fields;
                }
            },

            beforeEnter(el) {
                el.style.opacity = 0;
                el.style.top = '100px';
            },

            enter(el, done) {
                setTimeout(() => {
                    TweenLite.to(el, 0.4, {
                        opacity: 1,
                        top: 0
                    })
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
</style>
