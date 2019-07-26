<template>
    <div class="lightbox"
         ref="lightbox"
         v-bind:class="[isActive ? 'open' : 'closed']"
         @click="close"
    >

        <lazy-image ref="image"
                    :style="style"
                    :srcset="currentImageData.srcSet"
                    v-show="isActive || isTransitioning"
        />
        <img :srcset="currentImageData.nextSrcSet" style="display: none;"/>

    </div>
</template>

<script>
    import { TimelineLite } from 'gsap/TimelineLite';
    import LazyImage from './LazyImage';
    import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

    export default {
        name: 'lightbox',
        components: { LazyImage },
        props: {
            images: Array,
        },
        data() {
            return {
                isActive: false,
                style: '',
                currentImage: 1,
                isTransitioning: false,
                animationQueue: [],
                targetStyle: {},
            }
        },
        mounted() {
            this.listeners = [];
            this.listeners.push(window.addEventListener('keyup', this.hotkeyHandler));
            this.listeners.push(window.addEventListener('wheel', this.hotkeyHandler));
            this.timeline = new TimelineLite();
        },
        beforeDestroy() {
            this.listeners.forEach(listener => window.removeEventListener(listener, this.hotkeyHandler));
            clearAllBodyScrollLocks();
        },
        computed: {
            totalImages() {
                return this.images.length + 1;
            },
            currentImageData() {
                const currentImage = this.images[this.currentImage - 1];
                let nextImage = { src: undefined, srcset: undefined };

                if (this.hasNextImage()) {
                    nextImage = this.images[this.currentImage];
                }

                return {
                    src: currentImage.src,
                    srcSet: currentImage.srcSet,
                    nextSrc: nextImage.src,
                    nextSrcSet: nextImage.srcSet,
                }
            }
        },
        methods: {
            setCurrentImage(index) {
                this.currentImage = index;
            },
            setTargetStyle(target) {
                this.targetStyle = this.getTargetBoundingRect(target);
            },
            hasNextImage() {
                return this.currentImage + 1 < this.totalImages;
            },
            hasPreviousImage() {
                return this.currentImage - 1 > 0;
            },
            nextImage(direction) {
                if (this.hasNextImage()) {
                    this.changeImage(this.currentImage + 1, direction);
                }
            },
            previousImage(direction) {
                if (this.hasPreviousImage()) {
                    this.changeImage(this.currentImage - 1, direction);
                }
            },
            changeImage(index, direction) {
                this.setCurrentImage(index);
                this.$emit('change', this.currentImage);

                /*if (this.transitioning) {
                    this.animationQueue.push([this.currentImage + 1, direction]);
                    return;
                }

                const {image} = this.$refs;
                const clone = image.cloneNode(true);
                let x, y;

                image.parentNode.appendChild(clone);

                this.setCurrentImage(index);
                this.$emit('change', this.currentImage);

                switch (direction) {
                    case 1:  // Up
                        x = '';
                        y = '-60%';
                        break;
                    case 2:  // Right
                        x = '60%';
                        y = '';
                        break;
                    case 3: // Down
                        x = '';
                        y = '60%';
                        break;
                    default: // Left
                        x = '-60%';
                        y = '';
                }

                this.transitioning = true;

                this.timeline.clear();
                this.timeline.to(clone, 0.2, {
                    position: 'absolute',
                    x: x,
                    y: y,
                    opacity: 0,
                    ease: Power1.easeIn,
                    onComplete: () => {
                        clone.remove();
                        this.transitioning = false;

                        if (this.animationQueue.length) {
                            console.log('found animation');
                            const args = this.animationQueue.shift();
                            this.changeImage(args[0], args[1])
                        }
                    }
                }).fromTo(image, 0.2, {
                    // position: 'absolute',
                    x: -x,
                    y: -y,
                    opacity: 0,
                    ease: Power1.easeOut,
                }, {
                    // position: 'relative',
                    x: '0%',
                    y: '0%',
                    opacity: 1,
                    ease: Power1.easeOut,
                });*/
            },
            // Doesn't seem to work with srcSet
            /*preloadImage() {
                if (this.hasNextImage()) {
                    const nextImage = this.images[this.currentImage + 1];
                    this.preload = new Image();
                    this.preload.srcSet = nextImage.srcSet;
                }
            },*/
            open(index, target) {
                const { image } = this.$refs.image.$refs;

                if (this.timeline.active) {
                    this.timeline.eventCallback('onComplete', null);
                    this.timeline.clear();
                }

                image.style = '';

                if (index !== this.currentImage) this.setCurrentImage(index);
                if (target) this.setTargetStyle(target);

                this.isActive = true;
                disableBodyScroll(this.$refs.lightbox, { reserveScrollBarGap: false });
            },
            close() {
                const { image } = this.$refs.image.$refs;

                this.timeline.fromTo(image, 0.3, {
                    ...this.getTargetBoundingRect(image)
                }, {
                    ...this.targetStyle,
                    ease: Power1.easeOut,
                    onComplete: () => {
                        image.style = 'opacity: 0';
                        this.isTransitioning = false;
                    }
                });

                this.isActive = false;
                this.isTransitioning = true;
                enableBodyScroll(this.$refs.lightbox);
            },
            getTargetBoundingRect(target) {
                const boundingRect = target.getBoundingClientRect();

                if (boundingRect) {
                    return {
                        top: `${boundingRect.top}px`,
                        bottom: `${boundingRect.bottom}px`,
                        right: `${boundingRect.right}px`,
                        left: `${boundingRect.left}px`,
                        height: `${boundingRect.height}px`,
                        width: `${boundingRect.width}px`
                    }
                }
            },
            hotkeyHandler(event) {
                if (!this.isActive) return;

                if (event.type === 'keyup') {
                    switch (event.key) {
                        case 'ArrowLeft':
                            this.previousImage(4);
                            break;
                        case 'ArrowRight':
                            this.nextImage(2);
                            break;
                    }
                } else if (event.type === 'wheel') {
                    if (event.deltaY < 0) this.previousImage(1);
                    if (event.deltaY > 0) this.nextImage(3);
                }
            }
        }
    }
</script>

<style lang="scss">
    .lightbox {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        pointer-events: none;
        transition: opacity 0.2s ease-in;

        .lazyImage {
            padding: .5rem;
        }

        /deep/ img {
            max-height: 100%;
            max-width: 100%;
            user-select: none;
            margin: 0 auto;
        }

        &.open {
            pointer-events: all;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            transition: background-color 0.4s ease-out;
        }

        &.closed {
            padding: .5rem;

            img {
                position: fixed;
                object-fit: cover;
            }
        }
    }
</style>
