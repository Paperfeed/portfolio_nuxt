<template>
    <section class="gallery">
        <div class="gallery__tab">
            <div class='gallery__tab-item' v-for="n in pagination">
                <div class="image__container" >
                    <img v-if="images[(currentTab - 1) * pagination + n-1] !== undefined"
                         alt=""
                         :srcset="images[(currentTab - 1) * pagination + n-1].srcSet"
                         @click="openInLightbox"
                         :data-index="n"
                         :ref="`item${n}`"
                    />
                    <div class="image__placeholder" v-else></div>
                </div>
            </div>
        </div>

        <lightbox ref="lightbox"
                  :images="images"
                  v-on:change="onLightboxChange"
        />

        <b-pagination :current.sync="currentTab"
                      :total="images.length"
                      :per-page="pagination"
                      order="is-centered">
        </b-pagination>
    </section>
</template>

<script>
    import BPagination from 'buefy/src/components/pagination/Pagination';
    import Lightbox from './Lightbox';

    export default {
        name: 'photo-gallery',
        components: { Lightbox, BPagination },
        props: {
            images: Array,
            pagination: Number,
        },
        data() {
            return {
                currentTab: 1
            }
        },
        methods: {
            toggleLightbox() {
                this.$refs.lightbox.toggle();
            },
            openInLightbox(event) {
                const {lightbox} = this.$refs;
                const index = ((this.currentTab - 1) * this.pagination) + parseInt(event.target.dataset.index);

                lightbox.open(index, event.target);
            },
            onLightboxChange(newIndex) {
                const {lightbox} = this.$refs;
                const newTab = Math.ceil(newIndex / this.pagination);

                if (newTab !== this.currentTab) this.currentTab = newTab;

                lightbox.setTargetStyle(this.$refs[`item${(newIndex - 1) % this.pagination + 1}`][0]);
            }
        },
    }
</script>

<style scoped lang="scss">
    $gallery-gap: 0.5rem;

    .gallery__tab {
        display: flex;
        flex-wrap: wrap;
        padding: $gallery-gap / 2;
    }

    .gallery__tab-item {
        flex-basis: calc(33% - #{$gallery-gap});
        margin: $gallery-gap / 2;
    }

    .image__container {
        width: 100%;
        padding-top: 100%;
        position: relative;
        overflow: hidden;

        img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;

            width: 100%;
            height: 100%;
            object-fit: cover;

            filter: brightness(0.9);
            transition: all 0.2s ease-in-out;

            &:hover {
                filter: brightness(1);
                transform: scale(1.05);
            }
        }
    }

    .image__placeholder {

    }
</style>
