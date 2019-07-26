<template>
    <div class="blog-post">
        <h2 class="title is-3"><a :href="slug">{{title}}</a></h2>
        <h3 class="subtitle is-6">Posted on {{ date }}</h3>

        <hr>
        <div v-if="header" class="blog-post-media" >
            <img :src="header.url" :alt="header.title" />
        </div>

        <div class="blog-post-content">
            <vue-markdown>{{post}}</vue-markdown>
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
            images: Object
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

<style scoped lang="scss">
    .blog-post {
        position: relative;
        padding: 2rem;
        margin-bottom: 2rem;

        border-radius: 4px;
        box-shadow: 0 6px 25px 0 rgba(0,0,0, 0.3), 0 6px 6px 0 rgba(0,0,0, 0.1);
        overflow: auto;

        background: white;
        color: black;
    }

    .blog-post-content {
        min-width: 0;

        /deep/ p {
            margin: 0.75rem 0;
        }

        /deep/ ol {
            margin: 1rem 0 1rem 0.9rem;
            font-weight: bold;
        }

        /deep/ img {
            margin: 0.5rem 0;

            ~ em {
                margin-left: 1rem;
            }
        }

        /deep/ pre {
            max-width: 100%;
            overflow: auto;

            code {
                font-family: 'Consolas', monospace;
                font-size: 12px;
            }
        }

        /deep/ h4 {
            font-size: 1.3em;
            font-weight: 200;
        }

        /deep/ ul {
            li {
                margin: .5rem 0;
            }
        }
    }

    .blog-post-media {
        float: left;
        margin: .5em .5em .5em 0;
    }
</style>
