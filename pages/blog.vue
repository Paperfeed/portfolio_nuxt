<template>
    <section class="section">
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
                                  @before-enter="beforeEnter"
                                  @enter="enter">
                    <blog-post v-for="(post, index) in posts"
                               v-bind="post.fields"
                               :data-index="index"
                               :key="`post-${index}`"
                               :ref="`post-${index}`"
                    />
                </transition-group>
                <message v-else :message="error" type="error"/>

                <intersection-observer :is-active="!loading && hasMoreContent"
                                       @triggered="retrievePosts"
                />

                <loading-spinner class="black" v-if="loading"/>

                <scroll-to-top/>
            </div>
        </div>
    </section>
</template>

<script>
    import { createClient } from '../plugins/contentful';
    import { TweenLite } from 'gsap';
    import LoadingSpinner from '../components/LoadingSpinner';
    import BlogPost from '../components/BlogPost';
    import IntersectionObserver from '../components/IntersectionObserver';
    import ScrollToTop from '../components/ScrollToTop';
    import Prism from 'prismjs';
    import Message from '../components/Message';

    const client = createClient();

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
                loading: true,
                posts: []
            }
        },
        created() {
            this.skip = 0;
            this.hasMoreContent = false;
        },
        mounted() {
            this.retrievePosts();
        },
        updated() {
            Prism.highlightAll();
        },
        methods: {
            async retrievePosts() {
                this.loading = true;
                let posts;

                try {
                    posts = await client.getEntries({
                        'content_type': process.env.CTF_BLOG_POST_TYPE_ID,
                        skip: this.skip,
                        limit: 2,
                        order: '-sys.createdAt'
                    });
                } catch(e) {
                    this.error = 'A network error has occurred. Maybe the servers aren\'t working or your internet is down.';
                    this.loading = false;
                    return false;
                }

                if (posts) {
                    posts.items.forEach(item => this.posts.push(item));

                    this.skip += 2;
                    this.hasMoreContent = this.skip < posts.total;
                    this.loading = false;
                }
            },
            beforeEnter(el) {
                el.style.opacity = 0;
                el.style.top = '100px';
            },
            enter(el, done) {
                const delay = (el.dataset.index - this.skip * 100) + 300; // + 300 is page transition delay
                setTimeout(() => {
                    TweenLite.to(el, 0.4, {
                        opacity: 1,
                        top: 0
                    })
                }, delay)
            },
        }
    }
</script>


<style scoped lang="scss">
    @import '../assets/css/prism-darcula.css';

    .blog {
        margin-bottom: 3rem;
        min-width: 0;
        max-width: 768px;
    }

    .blog-post-list {
        margin: 3rem auto 0;
    }
</style>


