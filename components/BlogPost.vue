<template>
    <div class="blog-post">
        <h2 class="title is-3">
            <nuxt-link v-if="!disableLink" :to="'/blog/' + slug">{{title}}</nuxt-link>
            <div v-else>{{title}}</div>
        </h2>
        <h3 class="subtitle is-6">Posted on {{ date }}</h3>

        <hr>
        <div v-if="header" class="blog-post-media" >
            <img :src="header.url" :alt="header.title" />
        </div>

        <div class="blog-post-content content" :class="shorten ? 'shortened' : ''">
            <vue-markdown>{{shorten ? post.slice(0, post.indexOf(' ', shorten)) + ' ...' : post}}</vue-markdown>
        </div>

        <div class="buttons is-centered" v-if="shorten">
            <nuxt-link :to="'/blog/' + slug"
                       class="button is-text">
                read more...
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';

    export default {
        name: 'blog-post',
        components: {
            VueMarkdown
        },
        props: {
            title: String,
            slug: String,
            author: Object,
            date: String,
            'header-image': {
                type: Object,
                default() {
                    return {}
                }
            },
            post: String,
            images: Object,
            shorten: String,
            disableLink: Boolean
        },
        computed: {
            dateAsString() {
                const date = new Date(this.date);
                return date.toLocaleString();
            },
            header() {
                if (this.headerImage.hasOwnProperty('fields')) {
                    const {url, title} = this.headerImage.fields.file;

                    return {
                        url: url,
                        title: title
                    }
                } else {
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/css/variables.scss';

    .blog-post {
        position: relative;
        padding: 2rem;
        margin-bottom: 2rem;

        border-radius: 4px;
        box-shadow: 0 6px 25px 0 rgba(0,0,0, 0.3), 0 6px 6px 0 rgba(0,0,0, 0.1);
        overflow: auto;

        background: white;
        color: black;

        @include mobile {
            margin-left: -3rem;
            margin-right: -3rem;
            margin-bottom: 0;

            border-radius: 0;
            box-shadow: none;
            border-top: 1px solid #d8d8d8;
        }
    }

    .blog-post-content {
        position: relative;
        min-width: 0;

        p {
            margin: 0.75rem 0;
        }

        ol {
            margin: 1rem 0 1rem 0.9rem;
            font-weight: bold;
        }

        img {
            margin: 0.5rem 0;

            ~ em {
                margin-left: 1rem;
            }
        }

        pre {
            max-width: 100%;
            overflow: auto;

            code {
                font-family: 'Consolas', monospace;
                font-size: 12px;
            }
        }

        h4 {
            font-size: 1.3em;
            font-weight: 200;
        }

        ul {
            li {
                margin: .5rem 0;
            }
        }

        &.shortened {
            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 3.5rem;

                opacity: 0.8;
                background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
            }
        }
    }

    .blog-post-media {
        float: left;
        margin: .5rem 1rem .5rem 0;
    }
</style>
