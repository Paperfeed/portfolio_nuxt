<template>
    <div class="source-container" :class="collapsed ? 'collapsed' : ''">
        <div class="showsource" @click="toggleShowSource">
            <i class="cog fas fa-cog"></i>
            <i class="arrow fas" :class="collapsed ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
            <div class="rotated-text">{{collapsed ? 'Show source' : 'Hide source'}}</div>
        </div>

        <loading-spinner styleClass="black" v-if="!sourceCode"/>
        <div v-else class="prism">
            <pre class="language-javascript" v-html="sourceCode">
            </pre>
        </div>
    </div>
</template>

<script>
    import Prism from 'prismjs';
    import LoadingSpinner from './LoadingSpinner';

    export default {
        name: 'show-source-code',
        components: { LoadingSpinner },
        data() {
            return {
                collapsed: true,
                sourceCode: false,
            }
        },

        props: {
            source: String
        },

        methods: {
            toggleShowSource() {
                this.collapsed = !this.collapsed;

                if (!this.collapsed && !this.sourceCode) {
                    this.fetchSourceCode();
                }
            },

            async fetchSourceCode() {
                const result = await fetch(this.source);
                const data = await result.text();

                const testVue = /(<template[^]+<\/template>)[^]+(<script[^]+<\/script>)[^]+(<style[^]+<\/style>)/gm;
                const vue = testVue.exec(data);

                let html;

                if (vue) {
                    html = `<code class="language-markup">${Prism.highlight(vue[1], Prism.languages.xml, 'markup')}</code></br></br>`;
                    html += `<code class="language-javascript">${Prism.highlight(vue[2], Prism.languages.javascript, 'javascript')}</code></br></br>`;
                    html += `<code class="language-css">${Prism.highlight(vue[3], Prism.languages.css, 'css')}</code>`;
                } else {
                    html = Prism.highlight(data, Prism.languages.javascript, 'javascript');
                }

                this.sourceCode = html;
            }
        }
    }
</script>

<style>
    @import '../assets/css/prism-darcula.css';

    .token.number, .token.tag {
        background-color: unset;
        border-radius: 0;
        display: inline-block;
        font-size: inherit;
        height: unset;
        margin-right: unset;
        min-width: unset;
        padding: unset;
        text-align: left;
        vertical-align: top;
    }
</style>

<style scoped lang="scss">
    /*@import "../assets/css/variables";*/

    .source-container {
        z-index: 2147483647;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;

        min-width: 50vw;
        max-width: calc(100vw - 3rem);
        background-color: white;
        transition: all .4s ease-in-out;

        &:not(.collapsed) {
            box-shadow: 0 7px 20px 10px rgba(42, 42, 42, 0.78);
        }

        &.collapsed {
            transform: translateX(100%);
        }

        &:not(.collapsed) {
            .cog {
                visibility: hidden;
            }

            .arrow{
                transform: rotate3d(0, 1, 0, 0deg);
            }

            .rotated-text {
                margin-top: .3125em;
                max-height: 400%;
            }

            .showsource {
                border-radius: 0;
            }
        }
    }

    .showsource {
        position: absolute;
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px 4px;

        background: white;
        box-shadow: -7px 2px 5px 0px #2a2a2a21;
        border-radius: 50% 0 0 50%;

        white-space: nowrap;
        cursor: pointer;

        font-family: 'Consolas', monospace;

        i {
            padding-bottom: .3125em;
            transition: all .2s ease-in;
        }

        .cog {
            transition-delay: .2s;
        }

        .arrow {
            position: absolute;
            transform: rotate3d(0, 1, 0, 90deg);
        }


        &:hover {
            border-radius: 0;

            .cog {
                transition-delay: 0s;
                transform: rotate3d(0, 1, 0, 90deg);
            }

            .arrow {
                transition-delay: .2s;
                transform: rotate3d(0, 1, 0, 0deg);
            }

            .rotated-text {
                max-height: 400%;
                margin-top: .3125rem;
            }
        }
    }

    .rotated-text {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        line-height: 1.5;
        margin-top: -.3125em;
        max-height: 0;

        overflow: hidden;
        transition: all .2s ease-in;
    }

    .prism, .prism pre {
        height: 100%;
    }

    pre[class*="language-"] {
        margin: 0;
    }
</style>
