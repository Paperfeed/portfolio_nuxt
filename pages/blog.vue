<template>
    <div class="blog">
        <h1>Blog</h1>
        <loading-spinner class="black" v-if="loading"/>

        <transition-group appear
                          name="slide-fade"
                          tag="div"
                          class="blog-post-list"
                          v-bind:css="false"
                          @before-enter="beforeEnter"
                          @enter="enter">
            <blog-post v-for="(post, index) in posts" :data-index="index" :key="`post-${index}`" v-bind="post.fields"></blog-post>
        </transition-group>
    </div>
</template>

<script>
    import { createClient } from '~/plugins/contentful';
    import { TweenLite } from "gsap";
    import BlogPost from '~/components/BlogPost';
    import LoadingSpinner from '../components/LoadingSpinner';

    const client = createClient();

    export default {
        name: 'Blog',

        components: {
            LoadingSpinner,
            BlogPost,
        },

        data() {
            return {
                loading: true
            }
        },
        async asyncData({ env }) {
            const posts = await client.getEntries({
                'content_type': env.CTF_BLOG_POST_TYPE_ID,
                order: '-sys.createdAt'
            });

            return { posts: posts.items, loading: false };
        },

        methods: {
            beforeEnter(el) {
                el.style.opacity = 0;
                el.style.top = "100px";
            },
            enter(el, done) {
                const delay = (el.dataset.index * 100) + 300; // + 300 is page transition delay
                setTimeout(() => {
                    TweenLite.to(el, 0.2, {
                        opacity: 1,
                        top: 0
                    })
                }, delay)
            },
        }
    }
</script>

<style scoped>
    h1 {
        text-align: center;
    }
    .blog-post-list {
        margin: 0 auto;
        max-width: 600px;
    }
</style>
