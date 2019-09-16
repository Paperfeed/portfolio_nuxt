<template>
    <div class="container">
        <section class="section">
            <h2 class="title is-4">Customers</h2>
            <h3 class="subtitle">Clients that I've done work for</h3>
            <div class="customers">
                <div class="customer__logo" v-for="customer in customerLogos">
                    <img :src="customer" />
                </div>
            </div>
        </section>


        <section class="section">
            <h2 class="title is-4">Open Source Projects</h2>
            <h3 class="subtitle">Open sourced projects that are/were in use by thousands of people</h3>
            <div class="columns">
                <div class="column is-half-tablet" v-for="project in openSourceProjects">
                    <div class="card">
                        <a :href="project.url">
                            <div class="card-image">
                                <figure class="image is-16by9">
                                    <img v-if="project.thumbnail" :srcSet="project.thumbnail.srcSet"
                                         :alt="project.name">
                                </figure>
                            </div>
                            <div class="card-content">
                                <p class="title is-5">{{project.name}}</p>
                                <p class="content">
                                    <vue-markdown :source="project.description"/>
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <h2 class="title is-4">Here be code</h2>
            <h3 class="subtitle">A bunch of my homegrown projects, mostly written for fun</h3>
            <div class="columns">
                <div class="column is-half-tablet" v-for="project in projects">
                    <div class="card">
                        <component :is="chooseLinkElement(project.url)" :to="project.url" :href="project.url">
                            <div class="card-image">
                                <figure class="image is-16by9">
                                    <img v-if="project.thumbnail" :srcSet="project.thumbnail.srcSet"
                                         :alt="project.name">
                                </figure>
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
        </section>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import { startsWith } from 'lodash-es';

    const importAll = (context) => context.keys().map(context);
    const customerLogos = importAll(require.context('~/assets/portfolio/customers/', false, /\.(png|svg)$/));
    customerLogos.sort((a, b) => a.length - Math.round(Math.random() * 2 + a.length));

    // Read portfolio projects in directory, and filter out the ones without any info
    // Info is set on the component itself providing a display name and thumbnail
    const projectsModules = require.context('.', true, /\.vue$/);
    let projects = projectsModules.keys().reduce((result, key) => {
        if (projectsModules(key).hasOwnProperty('default')) {
            result.push({ ...projectsModules(key).default.info, url: projectsModules(key).default.name });
        }
        return result;
    }, []);

    const openSourceProjects = [
        {
            name: 'LiuChan Chinese Popup Dictionary',
            description: 'LiuChan (liú chàng) is an extension for chrome that allows you to mouse-over Chinese to ' +
                'instantly look it up in the dictionary.\n\n' +
                'It currently has over 1600 users and rising.',
            thumbnail: 'liuchan.png',
            url: 'https://paperfeed.github.io/LiuChan/'
        },
        {
            name: 'NextGen NivoSlider',
            description: 'A wordpress plugin that allows you to integrate a nivoslider with Nextgen Gallery.',
            thumbnail: 'nextgennivoslider.png',
            url: 'https://wordpress.org/plugins/nextgen-nivoslider/',
        }
    ];

    const externalProjects = [
        {
            order: 86,
            name: 'Prism Documentation',
            description: 'Documentation with smooth scrolling and automatic code formatting by using Prism.',
            thumbnail: 'prismdocumentation.png',
            url: 'https://codepen.io/paperfeed/pen/yqJzdK',
        },
        {
            order: 96,
            name: 'Weather Widget',
            description: 'A javascript class that creates a widget to display the local weather and air quality ' +
                '(using OpenWeatherMap and WAQI). It can display information based on user\'s location or set to a city. ' +
                'Other options are to display Imperial or Metric units.\n\n' +
                'This was mostly an  exercise in creating and animating SVGs for the weather icons. \n\n' +
                '_Note: Not all weather icons have been added/animated yet._',
            thumbnail: 'weatherwidget.png',
            url: 'https://codepen.io/paperfeed/pen/WdbORo',
        },
        {
            order: 85,
            name: 'Snake',
            description: 'The classic game of snake built purely with Javascript, HTML and CSS.',
            thumbnail: 'snake.png',
            url: 'https://codepen.io/paperfeed/pen/qVMbVV',
        },

        {
            order: 86,
            name: 'React Search',
            description: 'First React app I made. Searches wikipedia.',
            thumbnail: 'searchreact.png',
            url: 'https://codepen.io/paperfeed/pen/eMKRpN',
        },
        {
            order: 94,
            name: 'Markdown Editor',
            description: 'A markdown editor with instant preview built with React.\n\n' +
                'Powered by `marked.js` and `ACE`.',
            thumbnail: 'markdowneditor.png',
            url: 'https://codepen.io/paperfeed/pen/yqjrPE',
        },
        {
            order: 90,
            name: 'About:Blank PoC',
            description: 'A proof of concept I coded up in a day to show the benefit of `GraphQL` in combination with ' +
                'a mocking framework to my team.\n\n ' +
                'Backend hosted on _glitch.me_ - might take a moment to boot up.',
            thumbnail: 'aboutblank.png',
            url: 'https://aboutblank.aldertvaandering.com',
        },

    ];

    projects = [...projects, ...externalProjects];

    const importThumbnail = project => project.thumbnail ? project.thumbnail = require(`assets/portfolio/thumbnails/${project.thumbnail}`) : '';

    projects.sort((a, b) => b.order - a.order);
    projects.forEach(importThumbnail);
    openSourceProjects.forEach(importThumbnail);

    export default {
        data() {
            return {
                projects,
                openSourceProjects,
                customerLogos
            }
        },
        methods: {
            chooseLinkElement(url) {
                return startsWith(url, 'http') ? 'a' : 'nuxt-link';
            },
        },

        components: {
            'vue-markdown': VueMarkdown
        }
    }
</script>

<style scoped lang="scss">
    .columns {
        flex-wrap: wrap;
    }

    .card {
        height: 100%;

        &:hover {
            .card-image figure::after {
                background: rgba(57, 108, 153, 0);
            }
        }

        a {
            color: unset;
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

    .customers {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        background-color: #d5dbea;
        box-shadow: 0 0 20px 6px #00000012 inset;
    }

    .customer__logo {
        position: relative;
        flex-basis: calc(33.3% - 2rem);
        height: 4rem;
        margin: 1rem;
        padding: 1rem;

        mix-blend-mode: luminosity;
        transition: all .4s;

        &:hover {
            mix-blend-mode: normal;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
</style>
