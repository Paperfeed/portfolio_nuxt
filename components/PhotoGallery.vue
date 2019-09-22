<template>
    <section class="gallery">
        <div class="gallery__tab"
             :style="{ '--itemsPerRow': itemsPerRow}"
        >
            <div class='gallery__tab-item' v-for="n in pagination">
                <div class="image__container"
                     ref="imageContainer"
                >
                    <lazy-image v-if="images[(currentTab - 1) * pagination + n-1] !== undefined"
                                alt=""
                                :src="images[(currentTab - 1) * pagination + n-1].src"
                                :placeholder="images[(currentTab - 1) * pagination + n-1].placeholder"
                                @click="openInLightbox"
                                :data-index="n"
                    />
                    <div v-else
                         class="image__placeholder"
                         :data-index="n"
                    ></div>
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
    import LazyImage from './LazyImage';

    export default {
        name: 'photo-gallery',
        components: { LazyImage, Lightbox, BPagination },
        props: {
            images: Array,
            pagination: Number,
            itemsPerRow: Number
        },
        data() {
            return {
                currentTab: 1
            }
        },
        methods: {
            openInLightbox(event) {
                const { lightbox } = this.$refs;
                const dataIndex = parseInt(event.currentTarget.dataset.index);
                const index = ((this.currentTab - 1) * this.pagination) + dataIndex;

                lightbox.open(index, event.target);
            },
            onLightboxChange(newIndex) {
                const { lightbox, imageContainer } = this.$refs;
                const newTab = Math.ceil(newIndex / this.pagination);
                const target = imageContainer[(newIndex - 1) % this.pagination];

                if (newTab !== this.currentTab) {
                    this.currentTab = newTab;
                }

                lightbox.setTargetStyle(target);
            }
        },
    }
</script>

<style scoped lang="scss">
    $gallery-gap: 1%;

    .gallery__tab {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .gallery__tab-item {
        width: calc(100% / var(--itemsPerRow) - #{$gallery-gap});
        margin-bottom: $gallery-gap * 1.4;
    }

    .image__container {
        width: 100%;
        padding-top: 100%;
        position: relative;
        overflow: hidden;

        .lazyImage {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;

            width: 100%;
            height: 100%;

            filter: brightness(0.9);
            transition: all 0.2s ease-in-out;

            &:hover {
                filter: brightness(1);
                transform: scale(1.05);
            }
        }

        /deep/ img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
</style>
