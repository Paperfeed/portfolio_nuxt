<template>
    <div class="blog-post">
        <h2><a :href="slug">{{title}}</a></h2>

        <div v-if="header.url" class="blog-post-media" >
            <img :src="header.url" :alt="header.title" />
        </div>

        <p>
            {{ date }}
            <vue-markdown>{{post}}</vue-markdown>
        </p>
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
            'header-image': Object,
            post: String,
            images: Object
        },
        computed: {
            header() {
                const {url, title} = this.headerImage.fields.file;
                return {url, title};
            },
            dateAsString() {
                const date = new Date(this.date);
                return date.toLocaleString();
            }
        },
    }
</script>

<style scoped lang="scss">
    .blog-post {
        position: relative;
        margin-bottom: 30px;
        padding: 15px;
        border-radius: 4px;
        overflow: auto;
        background: black;
        color: white;
        box-shadow: 0 6px 25px 0 rgba(0,0,0, 0.3), 0 6px 6px 0 rgba(0,0,0, 0.1);

        h2 a {
            color: white;
        }
    }

    .blog-post-media {
        float: left;
        margin: .5em .5em .5em 0;
    }
</style>
