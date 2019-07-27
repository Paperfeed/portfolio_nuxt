<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column gallery__container">
                <h1 class="title is-spaced">Gallery</h1>
                <h2 class="subtitle">
                    <a alt="Check out my instagram" href="https://www.instagram.com/aldert.laowai/">
                        <span class="icon">
                            <i class="fab fa-instagram"></i>
                        </span>
                        aldert.laowai
                    </a>
                </h2>
                <photo-gallery :images="images"
                               :pagination="12"
                               :itemsPerRow="3"
                />
            </div>
        </div>
    </section>
</template>

<script>
    import PhotoGallery from '../components/PhotoGallery';

    const importAll = (context) => {
        return context.keys().map(context);
    };
    const images = importAll(require.context('~/assets/gallery/', false, /\.(png|jpe?g)$/));

    export default {
        components: { PhotoGallery },
        computed: {
            images() {
                return images;
            }
        }
    }
</script>

<style scoped lang="scss">
    .gallery {
        margin: 0 auto;
    }

    .gallery__container {
        max-width: 768px;
    }
</style>
