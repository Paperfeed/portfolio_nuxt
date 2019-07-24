<template>
  <section class="section">
      <photo-gallery :images="images"
                     :pagination="12"
      />
  </section>
</template>

<script>
    import PhotoGallery from '../components/PhotoGallery';

    const importAll = (context) => { return context.keys().map(context); };
    const images = importAll(require.context('~/assets/gallery/', false, /\.(png|jpe?g)$/));

    export default {
        components: { PhotoGallery },
        computed: {
            images() { return images; }
        }
    }
</script>
