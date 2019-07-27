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
                    v-swipe="touchHandler"
        />
        <img :srcset="currentImageData.nextSrcSet" style="display: none;"/>

    </div>
</template>

<script>
    import { TimelineLite } from 'gsap/TimelineLite';
    import LazyImage from './LazyImage';
    import ScrollLock from '../assets/js/scroll-lock';

    const Direction = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    };

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
                currentOffset: 0,
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
            ScrollLock.enableScroll(document.documentElement);
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
                if (this.isTransitioning) return;

                const image =  this.$refs.image.$el;
                let x, y;

                switch (direction) {
                    case Direction.UP:
                        x = '';
                        y = -60;
                        break;
                    case Direction.RIGHT:
                        x = 60;
                        y = '';
                        break;
                    case Direction.DOWN:
                        x = '';
                        y = 60;
                        break;
                    case Direction.LEFT:
                        x = -60;
                        y = '';
                }

                this.isTransitioning = true;

                this.timeline.clear();
                this.timeline.to(image, 0.1, {
                    x: `${x}%`,
                    y: `${y}%`,
                    opacity: 0.5,
                    ease: Power1.easeIn,
                    onComplete: () => {
                        this.isTransitioning = false;
                        this.setCurrentImage(index);
                        this.$emit('change', this.currentImage);
                        this.timeline.fromTo(image, 0.1, {
                            x: `${-x}%`,
                            y: `${-y}%`,
                            opacity: 0.5,
                        }, {
                            x: '0%',
                            y: '0%',
                            opacity: 1,
                            ease: Power1.easeOut
                        });
                    }
                })
            },
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
                ScrollLock.disableScroll(document.documentElement);
            },
            close() {
                const { image } = this.$refs.image.$refs;
                image.style = '';

                this.timeline.fromTo(image, 0.3, {
                    margin: 0,
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
                ScrollLock.enableScroll(document.documentElement);
            },
            setTargetStyle(target) {
                console.log(target);
                this.targetStyle = this.getTargetBoundingRect(target);
            },
            getTargetBoundingRect(target) {
                const boundingRect = target.getBoundingClientRect();

                if (boundingRect) {
                    return {
                        top: `${Math.round(boundingRect.top)}px`,
                        bottom: `${Math.round(boundingRect.bottom)}px`,
                        right: `${Math.round(boundingRect.right)}px`,
                        left: `${Math.round(boundingRect.left)}px`,
                        height: `${Math.round(boundingRect.height)}px`,
                        width: `${Math.round(boundingRect.width)}px`
                    }
                }
            },
            hotkeyHandler(event) {
                if (!this.isActive) return;

                if (event.type === 'keyup') {
                    switch (event.key) {
                        case 'ArrowRight':
                            this.nextImage(Direction.LEFT);
                            break;
                        case 'ArrowLeft':
                            this.previousImage(Direction.RIGHT);
                            break;
                        case 'ArrowDown':
                            this.nextImage(Direction.UP);
                            break;
                        case 'ArrowUp':
                            this.previousImage(Direction.DOWN);
                            break;
                    }
                } else if (event.type === 'wheel') {
                    if (event.deltaY < 0) this.previousImage(Direction.UP);
                    if (event.deltaY > 0) this.nextImage(Direction.DOWN);
                }
            },
            touchHandler(event) {
                const { image } = this.$refs;

                switch (event.direction) {
                    case Hammer.DIRECTION_RIGHT:
                        this.previousImage(Direction.RIGHT);
                        break;
                    case Hammer.DIRECTION_DOWN:
                        this.previousImage(Direction.DOWN);
                        break;
                    case Hammer.DIRECTION_LEFT:
                        this.nextImage(Direction.LEFT);
                        break;
                    case Hammer.DIRECTION_UP:
                        this.nextImage(Direction.UP);
                        break;
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
            position: absolute;
            padding: .5rem;
        }

        >>> img {
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
