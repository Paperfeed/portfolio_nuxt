<template>
    <div class="columns">
        <div class="column is-half-tablet" v-for="project in projects">
            <div class="card">
                <component v-if="project.url" :is="chooseLinkElement(project.url)" :to="project.url" :href="project.url">
                    <i v-if="isExternalLink(project.url)" class="fas fa-external-link-alt"></i>
                    <div class="card-image">
                        <figure class="image is-16by9" :class="project.thumbnail ? '' : 'placeholder'">
                            <img v-if="project.thumbnail" :srcSet="project.thumbnail.srcSet"
                                 :alt="project.name">
                            <svg-pattern v-else/>
                        </figure>
                        <div v-if="project.tags" class="card-tags tags">
                            <div v-for="tag in project.tags" class="tag is-dark">
                                {{tag}}
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="title is-5">{{project.name}}</p>
                        <p class="content">
                            <vue-markdown :source="project.description"/>
                        </p>
                    </div>
                </component>
            </div>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import { startsWith } from 'lodash-es';
    import SvgPattern from './SvgPattern';

    export default {
        name: 'ProjectCardList',
        props: {
            projects: Array
        },

        methods: {
            chooseLinkElement(url) {
                return this.isExternalLink(url) ? 'a' : 'nuxt-link';
            },
            isExternalLink(url) {
                return startsWith(url, 'http')
            },

        },

        components: {
            SvgPattern,
            'vue-markdown': VueMarkdown
        }
    }
</script>

<style scoped lang="scss">
    .card {
        height: 100%;

        &:hover, &:active {
            .card-image figure::after {
                background: rgba(57, 108, 153, 0);
            }
        }

        a {
            color: unset;
        }

        i.fa-external-link-alt {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 1;
            color: white;
            text-shadow: 0 1px 4px #5c6c7a;
        }
    }

    .card-image figure {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            mix-blend-mode: color;
            background: rgb(57, 108, 153);
            transition: all .45s linear;
        }
    }

    .card-tags {
        position: absolute;
        bottom: 0;
        margin: .5rem 1.5rem;

        .tag {
            mix-blend-mode: hard-light;
        }
    }
</style>
